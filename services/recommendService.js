const { getEnv, getQueryingCommandLineArguments, validateEnvironmentVariables } = require('../utils/utils');
const { createEmbedder } = require('../utils/embedding');  // Embedder yerine createEmbedder kullanıldı
const { Pinecone } = require('@pinecone-database/pinecone');
const fs = require('fs').promises;
const axios = require('axios');
require('dotenv').config(); // dotenv'i yükle
const { OpenAI } = require('openai');
const personService = require('./personService');
const titleService = require('./titleService');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

async function readIdsFromFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return data.split('\n').map(id => id.trim()).filter(id => id);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
}

async function writeIdsToFile(filePath, ids) {
    try {
        const existingIds = await readIdsFromFile(filePath);
        const newIds = ids.filter(id => !existingIds.includes(id));

        if (newIds.length > 0) {
            const data = newIds.join('\n') + '\n';
            await fs.appendFile(filePath, data, 'utf-8');
            console.log('New IDs have been written to', filePath);
        } else {
            console.log('No new IDs to write.');
        }
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

validateEnvironmentVariables();

const indexName = getEnv("PINECONE_INDEX");
const pinecone = new Pinecone();

async function getRecommend(queryParam) {
    try {
        let getPerson
        let person;
        let title
        
        if(queryParam.titleId){
            getPerson = await titleService.getTitleByIdService(queryParam.titleId)
            title = await titleService.getTitleByIdService(queryParam.titleId)
        }
        if(queryParam.personId){
            getPerson = await personService.getPersonByIdService(queryParam.personId)
        }
        console.log(getPerson,'Getperson')
        if(getPerson.data.keywords){
            person = getPerson.data;
        }
        
        const description = await pinecone.describeIndex(indexName);
        if (!description.status?.ready) {
            throw new Error(`Index not ready, description was ${JSON.stringify(description)}`);
        }
        console.log(title.data.name,'title');
        const index = pinecone.index(indexName).namespace("default");
        const embedder = await createEmbedder("Xenova/all-MiniLM-L6-v2");  // Embedder yerine createEmbedder kullanıldı

        const targetUrls = [
            'https://www.mckinsey.com/business-functions/people-and-organizational-performance/our-insights/the-organization-blog/four-ways-that-organizations-can-help-tomorrows-leaders',
            'https://www.mckinsey.com/business-functions/people-and-organizational-performance/our-insights/the-organization-blog/being-a-good-boss-isnt-easy-heres-how-to-get-better',
            'https://www.hrbartender.com/2024/employee-engagement/bookmark-this-total-rewards/?utm_source=rss&utm_medium=rss&utm_campaign=bookmark-this-total-rewards',
            'https://shows.acast.com/digital-hr-leaders-with-david-green/episodes/how-to-design-hr-programs-that-deliver-impact-and-personalis',
            'https://shows.acast.com/digital-hr-leaders-with-david-green/episodes/using-data-analytics-and-ai-in-talent-management-interview-w'
        ];
        const uniquePostIds = new Set();
        const filter = {
            id: { $nin: Array.from(uniquePostIds) },
            section: {}
        };

        // Eğer lang varsa, tr veya en'ye göre section ayarla
        if (queryParam.lang) {
            if (queryParam.lang === 'tr') {
                filter.section = { $eq: "İş Dünyası" };  // Türkçe için "İş Dünyası"
            } else {
                filter.section = { $eq: "Business" };   // İngilizce için "Business"
            }
        } else {
            // Eğer lang yoksa hem "Business" hem "İş Dünyası" olarak ayarla
            filter.section = { $in: ["Business", "İş Dünyası"] };
        }
        const queries = person && person.keywords.length > 0 ? person.keywords : [queryParam.searchText];

        const embeddings = await Promise.all(queries.map(query => embedder.embed(query)));

        const seenUrls = new Set();
       
        const allResults = [];

        for (const embedding of embeddings) {
            const getResult = await index.query({
                vector: embedding.values,
                includeMetadata: true,
                includeValues: true,
                filter: filter,  // Dinamik filter kullanılıyor
                topK: 15,
            });
            allResults.push(...getResult.matches);
            // Sonuçları filtrele ve yeni ID'leri uniquePostIds set'ine ekle
            getResult.matches.forEach(post => {
                if (!uniquePostIds.has(post.id)) {
                    uniquePostIds.add(post.id);
                }
            });
        }

        const uniquePosts = new Set();  // Benzersiz postları tutacak Set

        const postsForChatGPT = {
            title: title.data.name,
            posts: allResults
                .filter(post => {  // Sadece benzersiz URL'leri filtrele
                    if (uniquePosts.has(post.metadata?.url)) {
                        return false;  // URL zaten varsa bu postu atla
                    }
                    uniquePosts.add(post.metadata?.url);
                    return true;
                })
                .map(post => ({
                    url: post.metadata?.url,
                    title: post.metadata?.title,
                    explanation: "Yapay zekayı HR teknolojilerine entegre ederek daha yenilikçi çözümler geliştirebilirsin.",
                    benefit: ""
                }))
        };
        const promptContent = `Aşağıdaki postlar kullanılarak, '${title.data.name}' ünvanına sahip bir şirket çalışanı için en uygun ve faydalı 15 postu seçin. Seçiminizi yaparken ${queries.join(',')} konularında yüksek bilgi ve strateji sunan tercih edin. Her postun mesleki bağlamda önerilen kişiye neden faydalı olduğunu tek cümleyle açıklayın her post için yazılan cümle farklı olsun açıklamanın metni '${queryParam.lang == 'tr' ? 'türkçe' : 'ingilizce'}' olsun. JSON formatında objenin adı posts olacak şekilde sadece URL, explanation ve fayda düzeyini (Yüksek, Orta, Düşük) içeren bir yanıt verin. Postlar: ${JSON.stringify(postsForChatGPT)}`
        console.log(promptContent,'promptContent')
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert in recommending the most relevant posts."
                },
                {
                    role: "user",
                    content: promptContent
                }
            ],
            max_tokens: 1800,
            temperature: 0.7,
        });
        const response = completion.choices[0].message?.content;
        if (response) {
            try {
                const recommendMetadata = [];
                const cleanedResponse = response.replace(/^```json\s*|\s*```$/g, '');
                const parsedResponse = JSON.parse(cleanedResponse);
                //console.log("Parsed Response:", parsedResponse);
                parsedResponse.posts?.forEach(element => {
                    const result = allResults.find(item => element.url === item.metadata.url);
                    if (result) {
                        element.title = result.metadata.title;
                        element.id = result.id;
                        element.image = result.metadata.image;
                        element.description = result.metadata.article;
                        recommendMetadata.push(element);  // Tek sefer ekler
                    }
                });
                
                //console.log(allResults,'allResults')
                return recommendMetadata; 
            } catch (error) {
                console.error("JSON parse error:", error);
            }
        } else {
            console.error("Response content is undefined");
        }
    } catch (error) {
        console.error('Error in the main execution block:', error);
    }
}

module.exports = { getRecommend };
