(function () {
    'use strict'; // eslint-disable-line strict

    let html = document.documentElement;

    // JavaScript 有効環境判定
    if (
        html &&
        'object' === typeof html &&
        1 === html.nodeType
    ) {
        html.setAttribute('data-script-enabled', 'true');
    }

    // 念のためガベージコレクトを明示的に実行
    html = null;
}());
