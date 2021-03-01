import {config} from '../common/config';

/**
 * スムーススクロール
 * @constructor
 * @classdesc スムーススクロール機能。
 * @param {Object} anc イベントが発火するリンク（a[href^="#anc-"], a[href^="#top"]）
 * @param {Number=50} speed スクロールのスピード（指定がなければ50に設定）
 */
class SmoothScroll {
    constructor(anc, speed = 80) {
        this.anc = anc;
        this.speed = speed;

        /**
         * @type {string} id アンカー要素のhref属性（#以降）
         * @type {HTMLElement} target スクロール先の要素
         * @type {fuction} easeOut イージング関数
         * @type {object} mql matchMediaオブジェクト
         */
        this.id = this.anc.getAttribute('href').substring(1);
        this.target = (this.id === 'top') ? config.html : document.getElementById(this.id);
        this.easeOut = (value) => value * (2 - value);
        this.mql = window.matchMedia(`screen and (min-width: ${config.breakTab + 1}px)`);

        /**
         * フラグ
         * @type {boolean} isScrolling スクロール中かの判定用フラグ
         */
        this.isScrolling = true;

        // アンカーリンクにイベント付与
        this.anc.addEventListener('click', (e) => {
            e.preventDefault();
            this.clickHandler();
        });
    }

    /**
     * フォーカスの設定
     * @returns {void}
     */
    setFocus() {
        if (!/^(?:a|button|select)$/ui.test(this.target.tagName)) {
            this.target.tabIndex = -1;
            this.target.focus();
            this.target.removeAttribute('tabindex');
        } else {
            this.target.focus();
        }
    }

    /**
     * クリック時の処理
     * @returns {void}
     */
    clickHandler() {
        const scrollPos = window.pageYOffset; // スクロール開始時の位置
        const fixHeight = this.mql.matches ? 0 : config.header.clientHeight; // 固定ヘッダーの高さ（SP時のみ）
        const targetPos = this.target.getBoundingClientRect().top; // ターゲット要素の位置
        const range = (this.target === config.html) ? 0 : targetPos + scrollPos - fixHeight; // スクロール先までの距離
        const diff = range - scrollPos; // 目的の位置までの差分
        const isUpside = diff <= 0; // 上下どちらのスクロールになるか
        let position = 0; // スクロールする位置
        let count = 0; // 現在の進捗

        this.isSliding = true;
        this.setFocus();

        // 移動中にマウスホイールが動いた時の処理（スクロールを中止）
        const stop = () => {
            this.isSliding = false;
            window.removeEventListener('wheel', stop);
        };

        const move = () => {
            count++; // 進捗を進める
            position = scrollPos + (diff * this.easeOut(count / this.speed)); // スクロールする位置を計算

            window.scrollTo(0, position);

            if (
                this.isSliding &&
                (
                    (
                        isUpside &&
                        range < position
                    ) ||
                    (
                        !isUpside &&
                        position < range
                    )
                )
            ) {
                // 現在の位置が目的の位置より進んでいなければ続行
                requestAnimationFrame(move);

                return;
            }

            window.removeEventListener('wheel', stop);
        };

        window.addEventListener('wheel', stop);
        requestAnimationFrame(move);
    }
}

/**
 * SmoothScrollをインスタンス化
 * @param speedNum スクロールのスピード
 */
const setSmoothScroll = (speedNum) => {
    const ancs = document.querySelectorAll('a[href^="#anc-"], a[href^="#top"]');

    if (!ancs.length === 0) {
        return;
    }

    ancs.forEach((anc) => {
        const SetSmoothScroll = new SmoothScroll(anc, speedNum); // eslint-disable-line no-unused-vars
    });
};

export {setSmoothScroll};
