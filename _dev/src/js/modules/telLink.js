import {config} from '../common/config';

/**
 * 電話番号リンク
 * @constructor
 * @classdesc 電話番号のリンク付与・削除機能（SP時のみリンク）
 * @param {HTMLElement} target リンクを付与するa要素
 * @param {string} number 電話番号
 */

class TelLink {
    constructor(target, number) {
        this.target = target;
        this.number = number;

        /**
         * @type {object} mql matchMediaオブジェクト
         */
        this.mql = window.matchMedia(`(min-width: ${config.breakSp + 1}px)`);

        /**
         * matchMedia処理
         * @returns {void}
         */
        const mqlHandler = () => {
            this.toggleLink(this.mql.matches);
        };

        // メディアクエリーの状態変更に応じてコールバック関数を実行
        this.mql.addListener(mqlHandler);

        // 関数実行
        mqlHandler();
    }

    /**
     * 電話番号のリンクを付与・削除
     * @param flag
     * @returns {void}
     */
    toggleLink(flag) {
        if (flag) {
            this.target.removeAttribute('href');
        } else {
            this.target.setAttribute('href', this.number);
        }
    }
}

/**
 * TelLinkをインスタンス化
 */
const setTelLink = () => {
    const targets = document.querySelectorAll('.js-tel-link');

    if (!targets.length) {
        return;
    }

    targets.forEach((target) => {
        const number = `tel:${target.textContent}`;
        const SetTelLink = new TelLink(target, number); // eslint-disable-line no-unused-vars
    });
};

export {setTelLink};
