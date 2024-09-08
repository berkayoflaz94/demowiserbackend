const { getEnv, getQueryingCommandLineArguments, validateEnvironmentVariables } = require('../utils/utils');
const { OpenAI } = require('openai');
const { createEmbedder } = require('../utils/embedding');  // Embedder yerine createEmbedder kullanıldı
const { Pinecone } = require('@pinecone-database/pinecone');
const personService = require('./personService');
const titleService = require('./titleService');
validateEnvironmentVariables();

const indexName = getEnv("PINECONE_INDEX");
const pinecone = new Pinecone();

async function search(queryParam){
    try {
        let getPerson
        let person;
        let title
        if(queryParam.personId){
            getPerson = await personService.getPersonByIdService(queryParam.personId)
        }
        if(queryParam.titleId){
            getPerson = await titleService.getTitleByIdService(queryParam.titleId)
        }
       
        if(getPerson && getPerson.data.keywords){
            person = getPerson.data;
        }
        console.log(person,'PERSON');
        const description = await pinecone.describeIndex(indexName);
        if (!description.status?.ready) {
            throw new Error(`Index not ready, description was ${JSON.stringify(description)}`);
        }
        console.log(person,'PERSON')
        const index = pinecone.index(indexName).namespace("default");
        const embedder = await createEmbedder("Xenova/all-MiniLM-L6-v2");  // Embedder yerine createEmbedder kullanıldı

        const queries = person && person.keywords.length > 0 ? person.keywords : [queryParam.searchText];
        console.log(queries,'queries')
        const uniquePostIds = new Set();  // Benzersiz post ID'lerini tutacak Set
        const allResults = [];

        for (const query of queries) {
            const embedding = await embedder.embed(query);
             // Filter objesini dinamik olarak oluşturuyoruz
             // Eğer lang queryParam'da varsa, filter'a lang koşulunu ekle
            // Dinamik filter oluşturma
            const filter = {
                id: { $nin: Array.from(uniquePostIds) },
                section: {}
            };

            // Eğer lang varsa, tr veya en'ye göre section ayarla
            if (queryParam.lang) {
                if (queryParam.lang === 'tr') {
                    filter.section = { $eq: "İş Dünyası" };  // Türkçe için "İş Dünyası"
                } else if (queryParam.lang === 'en') {
                    filter.section = { $eq: "Business" };   // İngilizce için "Business"
                }
            } else {
                // Eğer lang yoksa hem "Business" hem "İş Dünyası" olarak ayarla
                filter.section = { $in: ["Business", "İş Dünyası"] };
            }

            
            const getResult = await index.query({
                vector: embedding.values,
                includeMetadata: true,
                includeValues: true,
                filter: filter,  // Dinamik filter kullanılıyor
                topK: 200,
            });

            // Sonuçları filtrele ve yeni ID'leri uniquePostIds set'ine ekle
            getResult.matches.forEach(post => {
                if (!uniquePostIds.has(post.id)) {
                    uniquePostIds.add(post.id);
                    allResults.push(post);
                }
            });
        }

        // Sonuçları benzersiz URL'ler ile filtrele
        // Sonuçları uygun JSON formatında düzenle
        const formattedResults = allResults.map(post => ({
            url: post.metadata.url,
            title: post.metadata.title,
            explanation: "", // Explanation kısmı article'dan alınır
            benefit: "", // Benefit bilgisi örnek olarak "High" sabit veriliyor, ihtiyaca göre güncellenebilir
            id: post.id,
            image: post.metadata.image,
            description: post.metadata.article // Description kısmı article'dan alınır
        }));
        console.log(formattedResults, 'allResults');
        return formattedResults;
    } catch (e) {
        console.log(e, 'error');
        return [];
    }
}

module.exports = { search };
