// controllers/titleController.js
const asyncHandler = require('express-async-handler');
const { getRecommend } = require('../services/recommendService');
const { search } = require('../services/searchService');
const {sendMail} = require('../services/mailService');
// Başlık oluşturma
const getRecommendation = asyncHandler(async (req, res) => {
    if(!req.query.titleId){
        return res.status(400).send({message:"titleId yok"})
    }
    const data = await getRecommend(req.query);
    /*
  const data = [
    {
        author: "Tera Allas",
        date: "2021-09-27T00:00:00.000Z",
        description: "Organizations can create immense value by helping tomorrow’s leaders develop crucial skills to become better bosses.",
        image: "https://www.mckinsey.com/~/media/mckinsey/business%20functions/people%20and%20organizational%20performance/our%20insights/leadership%20and%20organization%20blog/four%20ways%20that%20organizations%20can%20help%20tomorrows%20leaders/post%20212.jpg",
        logo: "https://logo.clearbit.com/mckinsey.com",
        publisher: "McKinsey & Company",
        title: "Four ways that organizations can help tomorrow’s leaders",
        url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-organization-blog/four-ways-that-organizations-can-help-tomorrows-leaders",
        lang: "en"
    },
    {
        author: "Tera Allas",
        date: "2021-10-18T00:00:00.000Z",
        description: "Good bosses are essential for employee satisfaction and retention. These four practices can help strengthen that leadership muscle.",
        image: "https://www.mckinsey.com/~/media/mckinsey/business%20functions/people%20and%20organizational%20performance/our%20insights/leadership%20and%20organization%20blog/being%20a%20good%20boss%20isnt%20easy%20heres%20how%20to%20get%20better/post-212_2_hero_1536x864.jpg",
        logo: "https://logo.clearbit.com/mckinsey.com",
        publisher: "McKinsey & Company",
        title: "Being a good boss isn’t easy—here’s how to get better",
        url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-organization-blog/being-a-good-boss-isnt-easy-heres-how-to-get-better",
        lang: "en"
    },
    {
        author: "Eric W. Dolan",
        date: "2024-07-24T03:37:50.000Z",
        description: "Humble leadership, characterized by acknowledging personal limitations and appreciating employee strengths, boosts employees’ perceived status and leadership potential, with those focused on personal development responding most positively.",
        image: "https://www.psypost.org/wp-content/uploads/2024/07/team-business-leader-congratulate-his-employee.jpg",
        logo: "https://www.psypost.org/wp-content/uploads/2022/03/PsyPost-blue-brain-logo-no-name.png",
        publisher: "PsyPost",
        title: "The power of humble leadership: Elevating employee status and driving initiative",
        url: "https://www.psypost.org/the-power-of-humble-leadership-elevating-employee-status-and-driving-initiative/",
        lang: "en"
    },
    {
        author: "Craig Dowden Ph.D.",
        date: "2024-05-28T19:16:53.000Z",
        description: "Could leadership rooted in empathy be the game-changer in our diverse workplaces? I speak with James and Krista White about their bestselling book on anti-racist leadership.",
        image: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/teaser_image/blog_entry/2024-05/pexels-alexander-suhorucov-6457495.jpg?itok=YDc7q40x",
        logo: "https://logo.clearbit.com/psychologytoday.com",
        publisher: "Psychology Today",
        title: "Truly Championing Diversity, Equity, and Inclusion",
        url: "https://www.psychologytoday.com/intl/blog/the-leaders-code/202405/truly-championing-diversity-equity-and-inclusion",
        lang: "en"
    },
    {
        author: "Sharlyn Lauby",
        date: "2024-07-24T14:08:10.000Z",
        description: "Get expert advice on handling polarizing workplace conversations. Learn an HR consultant’s practical tips in navigating challenging behavior.",
        image: "https://www.hrbartender.com/wp-content/uploads/2024/07/Polarizing-Conversations.png",
        logo: "https://logo.clearbit.com/hrbartender.com",
        publisher: "hr bartender",
        title: "4 Steps for Managing Polarizing Workplace Conversations",
        url: "https://www.hrbartender.com/2024/leadership-and-management/4-steps-managing-polarizing-conversations/",
        lang: "en"
    },
    {
        author: "Tera Allas",
        date: "2021-10-18T00:00:00.000Z",
        description: "Good bosses are essential for employee satisfaction and retention. These four practices can help strengthen that leadership muscle.",
        image: "https://www.mckinsey.com/~/media/mckinsey/business%20functions/people%20and%20organizational%20performance/our%20insights/leadership%20and%20organization%20blog/being%20a%20good%20boss%20isnt%20easy%20heres%20how%20to%20get%20better/post-212_2_hero_1536x864.jpg",
        logo: "https://logo.clearbit.com/mckinsey.com",
        publisher: "McKinsey & Company",
        title: "Being a good boss isn’t easy—here’s how to get better",
        url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-organization-blog/being-a-good-boss-isnt-easy-heres-how-to-get-better",
        lang: "en"
    },
    {
        author: "David Green",
        date: "2024-07-01T13:40:38.000Z",
        description: "HR practices are rapidly evolving. To support these practices, the creation of a new operating model for people analytics is essential. Erin Gerbec, Director of People Analytics at Cardinal Health, discusses revolutionising people analytics. Erin shares her journey of transforming her team into a hi",
        image: "http://static1.squarespace.com/static/5a588e521f318dd974eb925e/5cd2a76e57985d00010fab98/66705afeebda6410afc055de/1719841238474/Digital+HR+Leaders+S39+Thumbnails.png?format=1500w",
        logo: "https://logo.clearbit.com/myhrfuture.com",
        publisher: "myHRfuture",
        title: "Episode 195: How Cardinal Health Transformed Their People Analytics Function (Interview with Erin Gerbec) | myHRfuture",
        url: "https://www.myhrfuture.com/digital-hr-leaders-podcast/how-cardinal-health-transformed-their-people-analytics-function",
        lang: "en"
    },
    {
        author: null,
        date: "2023-06-27T01:00:21.707Z",
        description: "Listen to Rethinking Leadership for the Future of Work (an Interview with Heather McGowan) from Digital HR Leaders with David Green. In this episode of the Digital HR Leaders Podcast, David is joined by Future of Work Strategist and esteemed co-author of the books The Adaptation Advantage and The Empathy Advantage. Heather McGowan is renowned for her expertise in all things related to the future of work, and this conversation promises to be a thought-provoking exploration of the shifting landscape of work and the critical role of empathetic leadership. Expect to learn more about: How the pandemic transformed the way we work and the four significant shifts in leadership that emerged as a result The link between empathy and performance The challenges faced by existing leaders who have been taught that an autocratic leadership style leads to success, and how they can embrace empathy as a transformative approach The evolving role of HR professionals and the areas they should focus on to drive business value in the future Practical steps individuals can take to transition and benefit from the ‘empathy advantage’ in their personal and professional lives The implications of technological advancements like generative AI on companies and the future of work Efficient ways of training and developing employees in a rapidly changing skills landscape Support from this podcast comes from Worklytics. You can learn more by visiting: www.worklytics.co/DigitalHRLeaders",
        image: "https://res.cloudinary.com/pippa/image/fetch/c_pad,w_600,h_315/https://assets.pippa.io/shows/611a598b29aaa600197df91c/1687782322133-e9348cd1c09ae67c8223e8754a3b606f.jpeg",
        logo: "https://logo.clearbit.com/acast.com",
        publisher: "Acast",
        title: "Rethinking Leadership for the Future of Work (an Interview with Heather McGowan) | Digital HR Leaders with David Green",
        url: "https://shows.acast.com/digital-hr-leaders-with-david-green/episodes/rethinking-leadership-for-the-future-of-work-an-interview-wi",
        lang: "en"
    },
    {
        author: null,
        date: "2020-02-04T04:41:53.000Z",
        description: "Listen to What is the Future of Talent Assessments? Interview with Uri Ort from Digital HR Leaders with David Green. The perennial challenge organisations face of matching the right people with the right roles is becoming even more complex in the age of AI, analytics and automation. In parallel an increasing number of companies are turning to a new generation of assessment tools, harnessing AI, gamification and data science. Not just for hiring but to support areas such as coaching and development as well. My guest on today’s episode of the podcast is Uri Ort, who is the co-founder of behavioural insights company Deeper Signals and is an adjunct instructor at NYU.\nIn our conversation Uri and I discuss: The key trends and evolutions in the assessment space We talk about personalisation, algorithms and ethics and how technology is making assessments more precise and less biased We look at how to measure the business impacts and outcomes of assessments We delve into some of the latest research findings on personality and talent signals As with all our guests, we look into the crystal ball and ponder what the role of HR will be in 2025 This episode is a must listen for anyone interested in how assessments can support talent identification and development as well as HR and business professionals who are interested in how technology is being used to improve hiring and reduce bias.\nSupport for this podcast is brought to you by Gapsquare, to learn more visit www.gapsquare.com/accelerate.",
        image: "https://res.cloudinary.com/pippa/image/fetch/c_pad,w_600,h_315/https://assets.pippa.io/shows/611a598b29aaa600197df91c/show-cover.jpg",
        logo: "https://logo.clearbit.com/acast.com",
        publisher: "Acast",
        title: "What is the Future of Talent Assessments? Interview with Uri Ort | Digital HR Leaders with David Green",
        url: "https://shows.acast.com/digital-hr-leaders-with-david-green/episodes/what-is-the-future-of-talent-assessments-interview-with-uri-",
        lang: "en"
    }

  ]*/
  res.status(200).json(data);
});

const getSearch = asyncHandler(async (req, res) => {
    const data = await search(req.query);
    console.log(data,'data')
    res.status(200).send(data);
});
const send_mail = asyncHandler(async(req,res) => {
    console.log('asd send_mail')
    return res.status(200).json({
        success: true,
        message: 'Operation succeed.',
      });
})
const mail = asyncHandler(async(req,res) => {
    getPosts.forEach(item => {
        mailPosts += ` <div class="for-you-post">
                          <tr>
                            <td>
                              <div class="t22"
                                style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">
                                &nbsp;</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <!--[if !mso]>-->
                              <table class="t29" role="presentation" cellpadding="0" cellspacing="0"
                                style="Margin-left:auto;">
                                <!--<![endif]-->
                                <!--[if mso]><table class="t29" role="presentation" cellpadding="0" cellspacing="0" align="right"><![endif]-->
                                <tr>
                                  <!--[if !mso]>-->
                                  <td class="t28" style="width:420px;">
                                    <!--<![endif]-->
                                    <!--[if mso]><td class="t28" style="width:500;"><![endif]-->
                                    <div class="t27"
                                      style="display:inline-table;width:100%;text-align:right;vertical-align:bottom;">
                                      <!--[if mso]>
  <table role="presentation" cellpadding="0" cellspacing="0" align="right" valign="bottom" width="500"><tr><td width="500" valign="bottom"><![endif]-->

                                      <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <!--[if !mso]>-->
                              <table class="t38" role="presentation" cellpadding="0" cellspacing="0"
                                style="Margin-left:auto;Margin-right:auto;">
                                <!--<![endif]-->
                                <!--[if mso]><table class="t38" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                                <tr>
                                  <!--[if !mso]>-->
                                  <td class="t37" style="width:420px;">
                                    <!--<![endif]-->
                                    <!--[if mso]><td class="t37" style="width:500;"><![endif]-->
                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td>
                                          <!--[if !mso]>-->
                                          <table class="t36" role="presentation" cellpadding="0" cellspacing="0"
                                            style="Margin-left:auto;Margin-right:auto;">
                                            <!--<![endif]-->
                                            <!--[if mso]><table class="t36" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                                            <tr>
                                              <!--[if !mso]>-->
                                              <td class="t35" style="width:420px;">
                                                <!--<![endif]-->
                                                <!--[if mso]><td class="t35" style="width:500;"><![endif]-->
                                                <div class="t34"
                                                  style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
                                                  <!--[if mso]>
  <table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="500"><tr><td width="500" valign="top"><![endif]-->
                                                  <div class="t33"
                                                    style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
                                                    <table role="presentation" width="100%" cellpadding="0"
                                                      cellspacing="0" class="t32">
                                                      <tr class="share-your-thoughts-container">
                                                        <td class="t31"
                                                          style="overflow:hidden;background-color:#F3F4F6;padding:10px 15px 10px 15px;border-radius:12px 12px 12px 12px;">
                                                          <a class="post-link" target="_blank" href="${item.url}"><h1 class="t30 share-your-thoughts"
                                                            style="margin:0;Margin:0;font-family:Helvetica,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:20px;font-weight:500;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:0.5px;direction:ltr;color:#3F3F46;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;line-height:normal;">
                                                            ${item.note ? item.note : getPersonalNote(55,elementId)}</h1></a>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </div>
                                                  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
                                                </div>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="border-bottom:1px solid #e2e2e2;padding: 0px 0px 10px 0px;">
                              <!--[if !mso]>-->
                              <table class="t60" role="presentation" cellpadding="0" cellspacing="0"
                                style="Margin-left:auto;Margin-right:auto;">
                                <!--<![endif]-->
                                <!--[if mso]><table class="t60" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                                <tr>
                                  <!--[if !mso]>-->
                                  <td class="t59"
                                    style="background-color:#FFFFFF;overflow:hidden;width:420px;padding:10px 0 10px 0;border-radius:12px 12px 12px 12px;">
                                    <!--<![endif]-->
                                    <!--[if mso]><td class="t59" style="background-color:#FFFFFF;overflow:hidden;width:500;padding:10px 0 10px 0;border-radius:12px 12px 12px 12px;"><![endif]-->
                                    <div class="t58"
                                      style="display:inline-table;width:100%;text-align:center;vertical-align:middle;">
                                      <!--[if mso]>
  <table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="middle" width="500"><tr><td class="t46" style="width:10px;" width="10"></td><td width="367.63237" valign="middle"><![endif]-->
                                      <div class="t50"
                                        style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:820px;">
                                        <div class="t49" style="padding:15px 10px 0 10px;">
                                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                            class="t48">
                                            <tr>
                                              <td class="t47">
                                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                                  <tr>
                                                    <td>
                                                      <!--[if !mso]>-->
                                                      <table class="t41" role="presentation" cellpadding="0"
                                                        cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                        <!--<![endif]-->
                                                        <!--[if mso]><table class="t41" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                                                        <tr>
                                                          <!--[if !mso]>-->
                                                          <td class="t40" style="width:600px;">
                                                            <!--<![endif]-->
                                                            <!--[if mso]><td class="t40" style="width:367.6323676323676;"><![endif]-->
                                                            <a class="post-link" target="_blank" href="${item.url}"><h1 class="t39 post-title"
                                                              style="margin:0;Margin:0;font-family:Helvetica,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:15px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0px;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;line-height: 22px;">
                                                              ${item.title.length < 90 ? item.title : ellipsis(item.title, 90)}</h1></a>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <div class="t42"
                                                        style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                        &nbsp;</div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <!--[if !mso]>-->
                                                      <table class="t45" role="presentation" cellpadding="0"
                                                        cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                        <!--<![endif]-->
                                                        <!--[if mso]><table class="t45" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                                                        <tr>
                                                          <!--[if !mso]>-->
                                                          <td class="t44" style="width:600px;">
                                                            <!--<![endif]-->
                                                            <!--[if mso]><td class="t44" style="width:367.6323676323676;"><![endif]-->
                                                            <a class="post-link" target="_blank" href="${item.url}"><h1 class="t43 post-description"
                                                              style="margin:0;Margin:0;font-family:Helvetica,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:16px;font-weight:300;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;direction:ltr;color:#3F3F46;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;letter-spacing: 0px;line-height:20px">
                                                              ${item.description.length < 172 ? item.description : ellipsis(item.description, 172)}</h1></a>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </div>

                                      <!--[if mso]>
  </td><td class="t46" style="width:10px;" width="10"></td><td class="t52" style="width:10px;" width="10"></td><td width="92.36763" valign="middle"><![endif]-->
                                      <div class="t57"
                                        style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:221px;">
                                        <div class="t56" style="padding:0 10px 0 10px;">
                                          <div class="t53"
                                            style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                            &nbsp;</div>
                                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                            class="t55">
                                            <tr>
                                              <td class="t54">
                                                <div style="font-size:0px;"><a class="post-link" target="_blank" href="${item.url}"><img class="t51 post-image"
                                                    style="display:block;border:0;height:93px;width:93px;Margin:0 auto;max-width:100%;border-radius: 5px;object-fit: cover;"
                                                    width="93" height="93" alt=""
                                                    src="${item.image}" />
                                                    </a>
                                                </div>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </div>
                                      <div class="t26"
                                        style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:600px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                          class="t25">
                                          <tr>
                                            <td class="t24"
                                              style="text-align:right;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:9px;">
                                              <a class="post-link" target="_blank" href="${item.url}"><span class="t23"
                                                style="display:block;margin:0;Margin:0;font-family:Helvetica,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:44px;font-weight:600;font-style:normal;font-size:13px;text-decoration:underline;text-transform:none;letter-spacing:0px;direction:ltr;color:#000000;text-align:right;mso-line-height-rule:exactly;mso-text-raise:9px;padding:0 10px 0 10px;">İçeriğe Git</span></a></td>
                                          </tr>
                                        </table>
                                      </div>
                                      <!--[if mso]>
  </td><td class="t52" style="width:10px;" width="10"></td>
  </tr></table>
  <![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>`;
        elementId++;
      })
      const mailTemplate = `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
  <title></title>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <!--[if !mso]>-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
  <meta name="x-apple-disable-message-reformatting" content="" />
  <meta content="target-densitydpi=device-dpi" name="viewport" />
  <meta content="true" name="HandheldFriendly" />
  <meta content="width=device-width" name="viewport" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
  <style type="text/css">
    table {
      border-collapse: separate;
      table-layout: fixed;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt
    }

    table td {
      border-collapse: collapse
    }

    .ExternalClass {
      width: 100%
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%
    }

    body,
    a,
    li,
    p,
    h1,
    h2,
    h3 {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    html {
      -webkit-text-size-adjust: none !important
    }

    body,
    #innerTable {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale
    }

    #innerTable img+div {
      display: none;
      display: none !important
    }

    img {
      Margin: 0;
      padding: 0;
      -ms-interpolation-mode: bicubic
    }

    h1,
    h2,
    h3,
    p,
    a {
      line-height: inherit;
      overflow-wrap: normal;
      white-space: normal;
      word-break: break-word
    }

    a {
      text-decoration: none
    }

    h1,
    h2,
    h3,
    p {
      min-width: 100% !important;
      width: 100% !important;
      max-width: 100% !important;
      display: inline-block !important;
      border: 0;
      padding: 0;
      margin: 0
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important
    }

    u+#body a {
      color: inherit;
      text-decoration: none;
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      line-height: inherit;
    }

    a[href^="mailto"],
    a[href^="tel"],
    a[href^="sms"] {
      color: inherit;
      text-decoration: none
    }

    img,
    p {
      margin: 0;
      Margin: 0;
      font-family: Helvetica, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
      line-height: 22px;
      font-weight: 500;
      font-style: normal;
      font-size: 14px;
      text-decoration: none;
      text-transform: none;
      letter-spacing: -.56px;
      direction: ltr;
      color: #333;
      text-align: center;
      mso-line-height-rule: exactly;
      mso-text-raise: 2px
    }

    h1 {
      margin: 0;
      Margin: 0;
      font-family: Helvetica, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
      line-height: 41px;
      font-weight: 800;
      font-style: normal;
      font-size: 39px;
      text-decoration: none;
      text-transform: none;
      letter-spacing: -1.56px;
      direction: ltr;
      color: #191919;
      text-align: center;
      mso-line-height-rule: exactly;
      mso-text-raise: 1px
    }

    h2 {
      margin: 0;
      Margin: 0;
      font-family: Lato, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
      line-height: 30px;
      font-weight: 400;
      font-style: normal;
      font-size: 24px;
      text-decoration: none;
      text-transform: none;
      letter-spacing: 0;
      direction: ltr;
      color: #333;
      text-align: left;
      mso-line-height-rule: exactly;
      mso-text-raise: 2px
    }

    h3 {
      margin: 0;
      Margin: 0;
      font-family: Lato, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
      line-height: 26px;
      font-weight: 400;
      font-style: normal;
      font-size: 20px;
      text-decoration: none;
      text-transform: none;
      letter-spacing: 0;
      direction: ltr;
      color: #333;
      text-align: left;
      mso-line-height-rule: exactly;
      mso-text-raise: 2px
    }
  </style>
  <style type="text/css">
    @media (min-width: 481px) {
      .hd {
        display: none !important
      }
    }
    a {
      text-decoration: none!important;
    }
  </style>
  <style type="text/css">
    @media (max-width: 480px) {
      .hm {
        display: none !important
      }
    }
  </style>
  <style type="text/css">
    @media (min-width: 481px) {

      h1,
      img,
      p {
        margin: 0;
        Margin: 0;
        font-family: Helvetica, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
        text-align: center
      }

      .t104,
      .t107,
      .t110,
      .t112,
      .t12,
      .t16,
      .t20,
      .t28,
      .t35,
      .t37,
      .t59,
      .t63,
      .t66,
      .t7,
      .t88 {
        width: 500px !important
      }

      img,
      p {
        line-height: 22px;
        font-weight: 500;
        font-style: normal;
        font-size: 14px;
        text-decoration: none;
        text-transform: none;
        letter-spacing: -.56px;
        direction: ltr;
        color: #333;
        mso-line-height-rule: exactly;
        mso-text-raise: 2px
      }

      h1 {
        line-height: 41px;
        font-weight: 800;
        font-style: normal;
        font-size: 39px;
        text-decoration: none;
        text-transform: none;
        letter-spacing: -1.56px;
        direction: ltr;
        color: #191919;
        mso-line-height-rule: exactly;
        mso-text-raise: 1px
      }

      h2,
      h3 {
        margin: 0;
        Margin: 0;
        font-family: Lato, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
        font-weight: 400;
        font-style: normal;
        text-decoration: none;
        text-transform: none;
        letter-spacing: 0;
        direction: ltr;
        color: #333;
        text-align: left;
        mso-line-height-rule: exactly;
        mso-text-raise: 2px
      }

      h2 {
        line-height: 30px;
        font-size: 24px
      }

      h3 {
        line-height: 26px;
        font-size: 20px
      }

      .t62 {
        mso-line-height-alt: 45px !important;
        line-height: 45px !important;
        display: block !important
      }

      .t11,
      .t15 {
        line-height: 26px !important
      }

      .t63 {
        padding-left: 50px !important;
        padding-bottom: 60px !important;
        padding-right: 50px !important
      }

      .t12,
      .t16,
      .t88 {
        padding-bottom: 0 !important
      }

      .t15 {
        font-size: 22px !important;
        letter-spacing: 0 !important
      }

      .t112 {
        padding: 48px 50px !important
      }

      .t74,
      .t80,
      .t86 {
        width: 8.8% !important
      }

      .t58 {
        text-align: left !important
      }

      .t50 {
        width: 77.52647% !important
      }

      .t40,
      .t44 {
        padding-left: 10px !important;
        width: 357.63px !important
      }

      .t4 {
        width: 40% !important
      }

      .t57 {
        width: 22.47353% !important
      }

      .t11 {
        font-size: 17px !important;
        letter-spacing: .2px !important;
        mso-text-raise: 3px !important
      }
    }
  </style>
  <style type="text/css" media="screen and (min-width:481px)">
    .moz-text-html img,
    .moz-text-html p {
      margin: 0;
      Margin: 0;
      font-family: Helvetica, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
      line-height: 22px;
      font-weight: 500;
      font-style: normal;
      font-size: 14px;
      text-decoration: none;
      text-transform: none;
      letter-spacing: -.56px;
      direction: ltr;
      color: #333;
      text-align: center;
      mso-line-height-rule: exactly;
      mso-text-raise: 2px
    }

    .moz-text-html h1 {
      margin: 0;
      Margin: 0;
      font-family: Helvetica, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
      line-height: 41px;
      font-weight: 800;
      font-style: normal;
      font-size: 39px;
      text-decoration: none;
      text-transform: none;
      letter-spacing: -1.56px;
      direction: ltr;
      color: #191919;
      text-align: center;
      mso-line-height-rule: exactly;
      mso-text-raise: 1px
    }

    .moz-text-html h2 {
      margin: 0;
      Margin: 0;
      font-family: Lato, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
      line-height: 30px;
      font-weight: 400;
      font-style: normal;
      font-size: 24px;
      text-decoration: none;
      text-transform: none;
      letter-spacing: 0;
      direction: ltr;
      color: #333;
      text-align: left;
      mso-line-height-rule: exactly;
      mso-text-raise: 2px
    }

    .moz-text-html h3 {
      margin: 0;
      Margin: 0;
      font-family: Lato, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
      line-height: 26px;
      font-weight: 400;
      font-style: normal;
      font-size: 20px;
      text-decoration: none;
      text-transform: none;
      letter-spacing: 0;
      direction: ltr;
      color: #333;
      text-align: left;
      mso-line-height-rule: exactly;
      mso-text-raise: 2px
    }

    .moz-text-html .t62 {
      mso-line-height-alt: 45px !important;
      line-height: 45px !important;
      display: block !important
    }

    .moz-text-html .t63 {
      padding-left: 50px !important;
      padding-bottom: 60px !important;
      padding-right: 50px !important;
      width: 500px !important
    }

    .moz-text-html .t16 {
      padding-bottom: 0 !important;
      width: 500px !important
    }

    .moz-text-html .t15 {
      line-height: 26px !important;
      font-size: 22px !important;
      letter-spacing: 0 !important
    }

    .moz-text-html .t112 {
      padding: 48px 50px !important;
      width: 500px !important
    }

    .moz-text-html .t66 {
      width: 500px !important
    }

    .moz-text-html .t88 {
      padding-bottom: 0 !important;
      width: 500px !important
    }

    .moz-text-html .t74,
    .moz-text-html .t80,
    .moz-text-html .t86 {
      width: 8.8% !important
    }

    .moz-text-html .t110,
    .moz-text-html .t59 {
      width: 500px !important
    }

    .moz-text-html .t58 {
      text-align: left !important
    }

    .moz-text-html .t20,
    .moz-text-html .t7 {
      width: 500px !important
    }

    .moz-text-html .t50 {
      width: 77.52647% !important
    }

    .moz-text-html .t40,
    .moz-text-html .t44 {
      padding-left: 10px !important;
      width: 357.63px !important
    }

    .moz-text-html .t4 {
      width: 40% !important
    }

    .moz-text-html .t57 {
      width: 22.47353% !important
    }

    .moz-text-html .t104,
    .moz-text-html .t107,
    .moz-text-html .t35,
    .moz-text-html .t37 {
      width: 500px !important
    }

    .moz-text-html .t12 {
      padding-bottom: 0 !important;
      width: 500px !important
    }

    .moz-text-html .t11 {
      line-height: 26px !important;
      font-size: 17px !important;
      letter-spacing: .2px !important;
      mso-text-raise: 3px !important
    }

    .moz-text-html .t28 {
      width: 500px !important
    }
  </style>
  <!--[if !mso]>-->
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&amp;family=Albert+Sans:wght@400;500;700;800&amp;family=Inter:wght@600&amp;display=swap"
    rel="stylesheet" type="text/css" />
  <!--<![endif]-->
  <!--[if mso]>
<style type="text/css">
img,p{margin:0;Margin:0;font-family:Helvetica,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Helvetica,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t62{mso-line-height-alt:45px !important;line-height:45px !important;display:block !important}td.t63{padding-left:50px !important;padding-bottom:60px !important;padding-right:50px !important}td.t16{padding-bottom:0 !important}h1.t15{line-height:26px !important;font-size:22px !important;letter-spacing:0 !important}td.t112{padding:48px 50px !important}td.t88{padding-bottom:0 !important}div.t74,div.t80,div.t86{width:8.8% !important}div.t58{text-align:left !important}div.t50{width:77.52647% !important}td.t40,td.t44{padding-left:10px !important}div.t4{width:40% !important}div.t57{width:22.47353% !important}td.t12{padding-bottom:0 !important}h1.t11{line-height:26px !important;font-size:17px !important;letter-spacing:.2px !important;mso-text-raise:3px !important}
</style>
<![endif]-->
  <!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>

<body id="body" class="t116" style="min-width:100%;Margin:0px;padding:0px;background-color:#20201F;">
  <div class="t115" style="background-color:#20201F;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background: #20201F;">
      <tr>
        <td class="t114" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#20201F;"
          valign="top" align="center">
          <!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color="#20201F"/>
</v:background>
<![endif]-->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"
            id="innerTable" style="background: #20201F;">
            <tr>
              <td>
                <!--[if !mso]>-->
                <table class="t8" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;background: #20201F;Margin-top: 25px;">
                  <!--<![endif]-->
                  <!--[if mso]><table class="t8" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                  <tbody><tr>
                    <!--[if !mso]>-->
                    <td class="t7" style="width:420px;">
                      <!--<![endif]-->
                      <!--[if mso]><td class="t7" style="width:500;"><![endif]-->
                      <div class="t5" style="display:inline-table;width:100%;text-align:center;vertical-align:top;background: #20201F;">
                        <!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="200"><tr><td width="200" valign="top"><![endif]-->
                        <div class="t4" style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.61905%;max-width:200px;background: #20201F;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t2">
                            <tbody><tr>
                              <td class="t1">
                                <div style="font-size:0px;"><a href="https://beta.wisermedia.com" target="_blank"><img class="t0" style="display:block;border:0;height:auto;width:120px;Margin:0 auto;max-width:100%;" width="120px" height="auto" alt="" src="https://mcusercontent.com/49346e557655bf4ea2ac6b5f3/images/a0c3ea67-2299-6173-e369-b554ede282ec.png"></a>
                                </div>
                              </td>
                            </tr>
                          </tbody></table>
                          <div class="t3" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">
                            &nbsp;</div>
                        </div>
                        <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                      </div>
                    </td>
                  </tr>
                </tbody></table>
              </td>
            </tr>
            <tr>
              <!--[if !mso]>-->
              <td class="t12" style="width:420px;padding:0 0 20px 0;">
                <!--<![endif]-->
                <!--[if mso]><td class="t12" style="width:500;padding:0 0 20px 0;"><![endif]-->
                <h1 class="t11" style="margin:0;Margin:0;/* border-bottom:1px solid #E2E2E2; */padding: 0 0 25px 0;font-family:Helvetica,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:800;font-style:normal;font-size:17px;text-decoration:none;text-transform:none;letter-spacing:0px;direction:ltr;color: #FFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">
                  <span class="t9" style="margin:0;Margin:0;font-weight:400;mso-line-height-rule:exactly;font-size:17px;">Bu bülten </span><span class="t10" style="margin:0;Margin:0;font-weight:700;mso-line-height-rule:exactly;letter-spacing:0px;">Wiser
                    ve Havelsan Akademi</span>
                    <span class="t9" style="margin:0;Margin:0;font-weight:400;mso-line-height-rule:exactly;font-size:17px;"> iş birliğiyle hazırlandı.</span>
                </h1>
              </td>
            </tr>

            <tr>
              <td>
                <!--[if !mso]>-->
                <table class="t64" role="presentation" cellpadding="0" cellspacing="0"
                  style="Margin-left:auto;Margin-right:auto;">
                  <!--<![endif]-->
                  <!--[if mso]><table class="t64" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                  <tr>
                    <!--[if !mso]>-->
                    <td class="t63" style="background-color:#FFFFFF;width:420px;padding:0 30px 40px 30px;">
                      <!--<![endif]-->
                      <!--[if mso]><td class="t63" style="background-color:#FFFFFF;width:600;padding:0 30px 40px 30px;"><![endif]-->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <div class="t6"
                              style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:20px;font-size:1px;display:block;">
                              &nbsp;</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <!--[if !mso]>-->
                            <table class="t17" role="presentation" cellpadding="0" cellspacing="0"
                              style="Margin-left:auto;Margin-right:auto;">
                              <!--<![endif]-->
                              <!--[if mso]><table class="t17" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                              <tr>
                                <!--[if !mso]>-->
                                <td class="t16" style="width:420px;padding:0 0 20px 0;">
                                  <!--<![endif]-->
                                  <!--[if mso]><td class="t16" style="width:500;padding:0 0 20px 0;"><![endif]-->
                                  <h1 class="t15 today-text"
                                    style="margin:0;Margin:0;font-family:Helvetica,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:700;font-style:normal;font-size:22px!important;text-decoration:none;text-transform:none;letter-spacing:0px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">
                                    Merhaba Arif, Bugün 2 Eylül 2024.</h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="t18"
                              style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">
                              &nbsp;</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <!--[if !mso]>-->
                            <table class="t21" role="presentation" cellpadding="0" cellspacing="0"
                              style="Margin-left:auto;Margin-right:auto;">
                              <!--<![endif]-->
                              <!--[if mso]><table class="t21" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                              <tr>
                                <!--[if !mso]>-->
                                <td class="t20" style="width:420px;">
                                  <!--<![endif]-->
                                  <!--[if mso]><td class="t20" style="width:500;"><![endif]-->
                                  <p class="t19"
                                    style="margin:0;Margin:0;font-family:Helvetica,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:17px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;letter-spacing:0px;border-bottom:1px solid #e2e2e2;padding: 0px 0px 15px 0px;">
                                    Bu hafta senin için faydalı olacağını düşündüğüm 5 içerik:</p>
                                </td>

                              </tr>
                            </table>
                          </td>
                        </tr>
                              ${mailPosts}
                          </div>
                        
                        <tr>
                          <td>
                            <div class="t61"
                              style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">
                              &nbsp;</div>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <!--[if !mso]>-->
                <table class="t113" role="presentation" cellpadding="0" cellspacing="0"
                  style="Margin-left:auto;Margin-right:auto;">
                  <!--<![endif]-->
                  <!--[if mso]><table class="t113" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                  <tr>
                    <!--[if !mso]>-->
                    <td class="t112" style="background-color:#20201F;width:420px;padding:40px 30px 40px 30px;">
                      <!--<![endif]-->
                      <!--[if mso]><td class="t112" style="background-color:#20201F;width:600;padding:40px 30px 40px 30px;"><![endif]-->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <!--[if !mso]>-->
                            <table class="t67" role="presentation" cellpadding="0" cellspacing="0"
                              style="Margin-left:auto;Margin-right:auto;">
                              <!--<![endif]-->
                              <!--[if mso]><table class="t67" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                              <tr>
                                <!--[if !mso]>-->
                                <td class="t66" style="width:420px;">
                                  <!--<![endif]-->
                                  <!--[if mso]><td class="t66" style="width:500;"><![endif]-->
                                  <p class="t65"
                                    style="margin:0;Margin:0;font-family:Helvetica,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:0px;direction:ltr;color:#BDBDBD;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                    Bu önerileri nasıl buldun? Sana daha iyi içerikler sunabilmem için, bu e-mail’e cevap vererek geri bildirimini paylaşabilirsin.
                                    <br></br>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="t68"
                              style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">
                              &nbsp;</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <!--[if !mso]>-->
                            <table class="t89" role="presentation" cellpadding="0" cellspacing="0"
                              style="Margin-left:auto;Margin-right:auto;">
                              <!--<![endif]-->
                              <!--[if mso]><table class="t89" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                              <tr>
                                <!--[if !mso]>-->
                                <td class="t88" style="width:420px;padding:0 0 36px 0;">
                                  <!--<![endif]-->
                                  <!--[if mso]><td class="t88" style="width:500;padding:0 0 36px 0;"><![endif]-->
                                  <div class="t87"
                                    style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
                                    <!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="132"><tr><td class="t70" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
                                    <div class="t74"
                                      style="display:inline-table;text-align:initial;vertical-align:inherit;width:10.47619%;max-width:44px;">
                                      <div class="t73" style="padding:0 10px 0 10px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                          class="t72">
                                          <tr>
                                            <td class="t71">
                                              <div style="font-size:0px;"><a href="https://www.instagram.com/wiserfeed" target="_blank"><img class="t69"
                                                  style="display:block;border:0;height:24px;width:24px;Margin:0;"
                                                  width="24" height="24" alt=""
                                                  src="https://img.wisermedia.app/2024/05/16/instagram.png
                                                  " /></a>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </div>
                                    <!--[if mso]>
</td><td class="t70" style="width:10px;" width="10"></td><td class="t76" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
                                    <div class="t80"
                                      style="display:inline-table;text-align:initial;vertical-align:inherit;width:10.47619%;max-width:44px;">
                                      <div class="t79" style="padding:0 10px 0 10px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                          class="t78">
                                          <tr>
                                            <td class="t77">
                                              <div style="font-size:0px;"><a href="https://twitter.com/curatewiser" target="_blank"><img class="t75"
                                                  style="display:block;border:0;height:24px;width:24px;Margin:0;"
                                                  width="24" height="24" alt=""
                                                  src="https://img.wisermedia.app/2024/05/16/twitter_w.png" /></a>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </div>
                                    <!--[if mso]>
</td><td class="t76" style="width:10px;" width="10"></td><td class="t82" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
                                    <div class="t86"
                                      style="display:inline-table;text-align:initial;vertical-align:inherit;width:10.47619%;max-width:44px;">
                                      <div class="t85" style="padding:0 10px 0 10px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                          class="t84">
                                          <tr>
                                            <td class="t83">
                                              <div style="font-size:0px;"><a href="https://www.tiktok.com/@curatewiser" target="_blank"><img class="t81"
                                                  style="display:block;border:0;height:24px;width:24px;Margin:0;"
                                                  width="24" height="24" alt=""
                                                  src="https://img.wisermedia.app/2024/05/16/tiktok.png" /></a>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </div>
                                    <!--[if mso]>
</td><td class="t82" style="width:10px;" width="10"></td>
</tr></table>
<![endif]-->
                                    <div class="t86"
                                    style="display:inline-table;text-align:initial;vertical-align:inherit;width:10.47619%;max-width:44px;">
                                    <div class="t85" style="padding:0 10px 0 10px;">
                                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                        class="t84">
                                        <tr>
                                          <td class="t83">
                                            <div style="font-size:0px;"><a href="https://www.linkedin.com/company/curatewiser/" target="_blank"><img class="t81"
                                                style="display:block;border:0;height:24px;width:24px;Margin:0;"
                                                width="24" height="24" alt=""
                                                src="https://img.wisermedia.app/2024/05/16/linkedin.png" /></a>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                    </div>
<!--[if mso]>
</td><td class="t82" style="width:10px;" width="10"></td>
</tr></table>
<![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <!--[if !mso]>-->
                            <table class="t102" role="presentation" cellpadding="0" cellspacing="0"
                              style="Margin-left:auto;Margin-right:auto;">
                              <!--<![endif]-->
                              <!--[if mso]><table class="t102" role="presentation" cellpadding="0" cellspacing="0" align="center"><![endif]-->
                              <tr>
                                <!--[if !mso]>-->
                                <td class="t101" style="width:120px;padding:20px 15px 20px 15px;">
                                  <!--<![endif]-->
                                  <!--[if mso]><td class="t101" style="width:150;padding:20px 15px 20px 15px;"><![endif]-->
                                  <div class="t100"
                                    style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
                                    <!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="120"><tr><td class="t95" style="width:5px;" width="5"></td><td width="110" valign="top"><![endif]-->
                                    <div class="t99"
                                      style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:310px;">
                                      <div class="t98" style="padding:0 5px 0 5px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                          class="t97">
                                          <tr>
                                            <td class="t96">
                                              <div class="t94"
                                                style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                <!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="110"><tr><td width="110" valign="top"><![endif]-->
                                                <div class="t93"
                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:600px;">
                                                  <table role="presentation" width="100%" cellpadding="0"
                                                    cellspacing="0" class="t92">
                                                    <tr>
                                                      <td class="t91">
                                                        <div style="font-size:0px;"><a href="https://beta.wisermedia.com" target="_blank"><img class="t90"
                                                            style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;"
                                                            width="109.99999999999994" height="33.671875" alt=""
                                                            src="https://mcusercontent.com/49346e557655bf4ea2ac6b5f3/images/a0c3ea67-2299-6173-e369-b554ede282ec.png" /></a>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </div>
                                                <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </div>
                                    <!--[if mso]>
</td><td class="t95" style="width:5px;" width="5"></td>
</tr></table>
<![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>

</html>`;
    await sendMail('arbeyturan@hotmail.com', 'Recommendations from your AI Learning Assistant', mailTemplate);
    
    //await sendMail('berkayoflaz@gmail.com', 'For You - Project Manager TR', mailTemplate);
      return res.status(200).json({
        success: true,
        message: 'Operation succeed.',
      });
})
module.exports = { getRecommendation,getSearch,send_mail };