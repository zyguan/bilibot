function injectJs(link) {
        var scr = document.createElement("script");
        scr.type="text/javascript";
        scr.src=link;
        (document.head || document.body || document.documentElement).appendChild(scr);
}

injectJs(chrome.extension.getURL("ocrad.js"));
injectJs(chrome.extension.getURL("bot.js"));
