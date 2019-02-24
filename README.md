# What?

A demo to figure out how to extract `script` tag from WordPress API, which doesn't return full HTML output of GitHub gist.

Gatsby GraphQL retrieves WordPress data like this.

```js
{
  "data": {
    "allWordpressPost": {
      "edges": [
        {
          "node": {
            "id": "c6dbad63-7d4a-5414-ae71-ba538c1f448c",
            "wordpress_id": 2509,
            "link": "https://www.slightedgecoder.com/2019/02/17/emoji-error-in-chrome-extension-html/",
            "slug": "emoji-error-in-chrome-extension-html",
            "status": "publish",
            "template": "",
            "format": "standard",
            "jetpack_featured_media_url": "https://i0.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/featured-image-5.jpg?fit=600%2C400&ssl=1",
            "content": "\n<p style=\"text-align:right\"><em>Photo by </em><a href=\"https://unsplash.com/photos/bSpqe48INMg?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText\"><em>Bernard Hermant</em></a><em> on </em><a href=\"https://unsplash.com/search/photos/emoji?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText\"><em>Unsplash</em></a></p>\n\n\n\n<p>I&#8217;ve had a problem where I was trying to display an Emoji in a Chrome Extension header of default popup HTML, <code>page_action.html</code> (specified by <code>page_action -> default_popup</code> in <code>manifest.json</code>).</p>\n\n\n\n<p>But got the jumbled up characters instead.</p>\n\n\n\n<!--more-->\n\n\n\n<div class=\"wp-block-image\"><figure class=\"aligncenter\"><img src=\"https://i1.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/2019-02-16_23-00-15.png?w=1170&#038;ssl=1\" alt=\"\" class=\"wp-image-2510\" srcset=\"https://i1.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/2019-02-16_23-00-15.png?w=603&amp;ssl=1 603w, https://i1.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/2019-02-16_23-00-15.png?resize=300%2C157&amp;ssl=1 300w, https://i1.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/2019-02-16_23-00-15.png?resize=585%2C307&amp;ssl=1 585w\" sizes=\"(max-width: 603px) 100vw, 603px\" data-recalc-dims=\"1\" /><figcaption>Emoji displayed as gobbledygook</figcaption></figure></div>\n\n\n\n<p>The problem was that I had to instruct Chrome that I am using a unicode by adding a charset meta tag.</p>\n\n\n\n<div class=\"wp-block-coblocks-gist\"><script src=\"https://gist.github.com/dance2die/ab0741ac11b3116d0020075d7d87c8bc.js\"></script><noscript><a href=\"https://gist.github.com/dance2die/ab0741ac11b3116d0020075d7d87c8bc\">View this gist on GitHub</a></noscript><figcaption>Character Set set to UTF-8<br></figcaption></div>\n\n\n\n<p>This has fixed the issue and shows the cute 🐥 emoji correctly in the Chrome Extension popup.</p>\n\n\n\n<div class=\"wp-block-image\"><figure class=\"aligncenter\"><img src=\"https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/emoji-shown.jpg?w=1170&#038;ssl=1\" alt=\"\" class=\"wp-image-2515\" srcset=\"https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/emoji-shown.jpg?w=790&amp;ssl=1 790w, https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/emoji-shown.jpg?resize=300%2C229&amp;ssl=1 300w, https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/emoji-shown.jpg?resize=768%2C587&amp;ssl=1 768w, https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/02/emoji-shown.jpg?resize=585%2C447&amp;ssl=1 585w\" sizes=\"(max-width: 790px) 100vw, 790px\" data-recalc-dims=\"1\" /><figcaption>You can now see the cute baby chick 🐥</figcaption></figure></div>\n",
            "type": "post"
          }
        }
      ]
    }
  }
}
```

While WordPress correctly generates the HTML, `allWordpressPost.edges.node.content` doesn't contain the correct HTML but has the script tag only.

```html
<div class=\"wp-block-coblocks-gist\"><script src=\"https://gist.github.com/dance2die/ab0741ac11b3116d0020075d7d87c8bc.js\"></script><noscript><a href=\"https://gist.github.com/dance2die/ab0741ac11b3116d0020075d7d87c8bc\">View this gist on GitHub</a></noscript><figcaption>Character Set set to UTF-8<br></figcaption>
```

This is a throwaway code to extract the gist script and generate a rendered HTML.

`https://gist.github.com/dance2die/ab0741ac11b3116d0020075d7d87c8bc.js` returns following script.

```js
document.write('<link rel="stylesheet" href="https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css">')
document.write('<div id=\"gist94694525\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-meta-html\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"blob-wrapper data type-html \">\n      \n<table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-meta-html-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-meta-html-LC1\" class=\"blob-code blob-code-inner js-file-line\">&lt;<span class=\"pl-ent\">html<\/span>&gt;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-meta-html-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-meta-html-LC2\" class=\"blob-code blob-code-inner js-file-line\">  &lt;<span class=\"pl-ent\">head<\/span>&gt;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-meta-html-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-meta-html-LC3\" class=\"blob-code blob-code-inner js-file-line\">    &lt;<span class=\"pl-ent\">meta<\/span> <span class=\"pl-e\">charset<\/span>=<span class=\"pl-s\"><span class=\"pl-pds\">&quot;<\/span>UTF-8<span class=\"pl-pds\">&quot;<\/span><\/span> /&gt;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-meta-html-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-meta-html-LC4\" class=\"blob-code blob-code-inner js-file-line\">    ...<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-meta-html-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-meta-html-LC5\" class=\"blob-code blob-code-inner js-file-line\">  &lt;/<span class=\"pl-ent\">head<\/span>&gt;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-meta-html-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-meta-html-LC6\" class=\"blob-code blob-code-inner js-file-line\">...<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-meta-html-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-meta-html-LC7\" class=\"blob-code blob-code-inner js-file-line\">&lt;/<span class=\"pl-ent\">html<\/span>&gt;<\/td>\n      <\/tr>\n<\/table>\n\n\n  <\/div>\n\n  <\/div>\n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/dance2die/ab0741ac11b3116d0020075d7d87c8bc/raw/adeea35eb10c839f7f91f09fd51dc646586746d6/meta.html\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/dance2die/ab0741ac11b3116d0020075d7d87c8bc#file-meta-html\">meta.html<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')
```

The problem is that, it needs to be `eval`ulated and reappend to the DOM.

This is for my private repo - A static version of SlightEdgeCoder.com
https://github.com/dance2die/sung.codes
