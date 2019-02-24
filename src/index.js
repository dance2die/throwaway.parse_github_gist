const cleanup = require("jsdom-global")();
const edges = require("./data.json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const cheerio = require("cheerio");
const axios = require("axios");
// https://github.com/axios/axios/issues/1418#issue-305515527
const adapter = require("axios/lib/adapters/http");

const log = console.log;

// log(`edges`, edges, JSDOM);

const content = `\n<p style="text-align:right"><em>Photo by </em><a href="https://unsplash.com/photos/bSpqe48INMg?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"><em>Bernard Hermant</em></a><em> on </em><a href="https://unsplash.com/search/photos/emoji?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"><em>Unsplash</em></a></p>\n\n\n\n<p>I&#8217;ve had a problem where I was trying to display an Emoji in a Chrome Extension header of default popup HTML, <code>page_action.html</code> (specified by <code>page_action -> default_popup</code> in <code>manifest.json</code>).</p>\n\n\n\n<p>But got the jumbled up characters instead.</p>\n\n\n\n<!--more-->\n\n\n\n<div class="wp-block-image"><figure class="aligncenter"><img src="https://i1.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/2019-02-16_23-00-15.png?w=1170&#038;ssl=1" alt="" class="wp-image-2510" srcset="https://i1.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/2019-02-16_23-00-15.png?w=603&amp;ssl=1 603w, https://i1.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/2019-02-16_23-00-15.png?resize=300%2C157&amp;ssl=1 300w, https://i1.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/2019-02-16_23-00-15.png?resize=585%2C307&amp;ssl=1 585w" sizes="(max-width: 603px) 100vw, 603px" data-recalc-dims="1" /><figcaption>Emoji displayed as gobbledygook</figcaption></figure></div>\n\n\n\n<p>The problem was that I had to instruct Chrome that I am using a unicode by adding a charset meta tag.</p>\n\n\n\n
  <div class="wp-block-coblocks-gist">
    <script src="https://gist.github.com/dance2die/ab0741ac11b3116d0020075d7d87c8bc.js"></script>
    <noscript><a href="https://gist.github.com/dance2die/ab0741ac11b3116d0020075d7d87c8bc">View this gist on GitHub</a></noscript>
    <figcaption>Character Set set to UTF-8<br></figcaption>
</div>\n\n\n\n<p>This has fixed the issue and shows the cute 🐥 emoji correctly in the Chrome Extension popup.</p>\n\n\n\n<div class="wp-block-image"><figure class="aligncenter"><img src="https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/emoji-shown.jpg?w=1170&#038;ssl=1" alt="" class="wp-image-2515" srcset="https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/emoji-shown.jpg?w=790&amp;ssl=1 790w, https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/emoji-shown.jpg?resize=300%2C229&amp;ssl=1 300w, https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/emoji-shown.jpg?resize=768%2C587&amp;ssl=1 768w, https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/emoji-shown.jpg?resize=585%2C447&amp;ssl=1 585w" sizes="(max-width: 790px) 100vw, 790px" data-recalc-dims="1" /><figcaption>You can now see the cute baby chick 🐥</figcaption></figure></div>\n`;
// const dom = new JSDOM(content, { runScripts: "dangerously" });
// const {
//   window: { document }
// } = dom;

// log(`dom`, dom.window.innerHTML);

// const $ = cheerio.load('<h2 class="title">Hello world</h2>');
const $ = cheerio.load(content);

// $("h2.title").text("Hello there!");
// $("h2").addClass("welcome");

const script = $(`script[src^="https://gist.github.com"]`);

// log(script[0].attribs);

axios(script[0].attribs.src, { adapter })
  .then(result => {
    const { data } = result;
    const $script = cheerio.load(data);
    // log(data, $script);
    // log(data);
    const body = $script("body").html();
    // log(eval(body));
    // log(data);

    const window = new JSDOM(`<body><script>${data}</script></body>`, {
      runScripts: "dangerously"
    }).window;
    // window.eval(data);
    log(
      cheerio
        .load(window.document.body.innerHTML)("body")
        .html()
    );
  })
  .then(cleanup)
  .catch(console.error);
