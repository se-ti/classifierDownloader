// ==UserScript==
// @name         gDoc sheet as csv
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  download GoogleDoc sheets as csv with one click!
// @author       Serge Titov
// @match        https://docs.google.com/spreadsheets/d/e/2PACX-1vQQ3X7Yj-45yzG9cn2V0MCV0N7cm6jqp6EgIgOhRquJ455z7LzC5RI2EYxHv67Eq7ocAYipBVpUSmp6*
// @match        https://docs.google.com/spreadsheets/d/e/2PACX-1vScHwAGONYYwxgeGvPhNg_IkLN_FkAJw1vs2Pkp5F2sTp6m4H7ya_L5HG9Zwc_nso-Vbq67mY2UzBp0*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @downloadURL https://github.com/se-ti/classifierDownloader/raw/master/downloader.user.js
// @updateURL   https://github.com/se-ti/classifierDownloader/raw/master/downloader.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //const sample = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQ3X7Yj-45yzG9cn2V0MCV0N7cm6jqp6EgIgOhRquJ455z7LzC5RI2EYxHv67Eq7ocAYipBVpUSmp6/pub?single=true&output=csv&gid=2099777681#';


  function dlUrl(docId, sheetId) {
    return `https://docs.google.com/spreadsheets/d/e/${docId}/pub?single=true&output=csv&gid=${sheetId}#`;
  }

  function atGDoc() {
    const path = window.location.pathname;
    const m = /\/spreadsheets\/d\/e\/([^\/]*)/gi.exec(window.location.pathname);
    if (!m)
        return;
    const docId = m[1];

    var css = 'li[id^="sheet-button-"] a.dl-hover { visibility: hidden;  margin-left: 1ex; font-size: smaller;} li[id^="sheet-button-"]:hover a.dl-hover { visibility: visible; } ';
    var style = document.createElement('style');
    if (style.styleSheet)
        style.styleSheet.cssText = css;
    else
        style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    const sheets = document.querySelectorAll('li[id^="sheet-button-"]');
    Array.from(sheets).forEach(li => {
        const m2 = /sheet-button-(\d+)/.exec(li.id);
        if (!m2)
            return;

        const el = document.createElement('a');
        el.innerText = '(csv)';
        el.className = 'dl-hover';
        el.href = dlUrl(docId, m2[1]);

        li.appendChild(el);
    });
  }

  atGDoc();
})();
