/**
 * @type {HTMLElement} body
 * @type {HTMLElement} html
 * @type {HTMLElement} header
 * @type {HTMLElement} main
 * @type {HTMLElement} footer
 * @type {String} openClassName 展開時のclass名
 * @type {String} showClassName 表示用のclass名
 * @type {String} hiddenClassName 非表示用のclass名
 * @type {String} currentClassName カレント用のclass名
 * @type {String} fixedClassName 固定用のclass名
 * @type {String} blurClassName ぼかし用のclass名
 * @type {Number} breakTab ブレイクポイント（タブレット）
 * @type {Number} breakSp ブレイクポイント（SP）
 */
export const config = {
    body: document.body,
    html: document.documentElement,
    header: document.getElementById('js-header'),
    main: document.querySelector('.site-main'),
    footer: document.getElementById('js-footer'),
    openClassName: 'is-open',
    showClassName: 'is-show',
    hiddenClassName: 'is-hidden',
    currentClassName: 'is-current',
    fixedClassName: 'is-fixed',
    blurClassName: 'is-blur',
    breakTab: 1024,
    breakSp: 834,
};
