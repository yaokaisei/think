/**
 * QA ディスクロージャー
 * @constructor
 * @classdesc 開閉機能
 * @param {HTMLElement} root ルートとなる要素
 * @param {HTMLElement} trigger クリック対象要素
 * @param {HTMLElement} panel 開閉対象要素
 * @param {HTMLElement} panelInner 開閉対の高さ取得要素
 */
class Disclosure {
    constructor(root, trigger, panel, panelInner) {
        this.root = root;
        this.trigger = trigger;
        this.panel = panel;
        this.panelInner = panelInner;

        /**
         * フラグ
         * @type {Boolean} isPanelSliding 開閉中かの判定用フラグ
         * @type {Boolean} isPanelOpened 開閉状態判定用フラグ
         */
        this.isPanelSliding = false;
        this.isPanelOpened = false;

        // 属性値付与
        this.trigger.setAttribute('aria-expanded', 'false');
        this.trigger.setAttribute('aria-controls', this.panel.id);
        this.trigger.setAttribute('role', 'button');
        this.trigger.setAttribute('tabindex', '0');

        // クリック時の開閉処理イベント
        this.trigger.addEventListener('click', () => {
            if (this.isPanelOpened) {
                this.closeHandler();
            } else {
                this.openHandler();
            }
        });

        // transition終了時の開閉処理イベント
        this.panel.addEventListener('transitionend', (e) => {
            if (
                e.propertyName === 'height' &&
                this.isPanelOpened
            ) {
                this.panel.style.height = 'auto';
            }

            this.isPanelSliding = false;
        });

        // キーボードで開閉操作
        this.trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();

                if (this.isPanelOpened) {
                    this.closeHandler();
                } else {
                    this.openHandler();
                }
            }
        });
    }

    /**
     * ディスクロージャーを開く処理
     * @returns {void}
     */
    openHandler() {
        // クリックの連打をさせない
        if (this.isPanelSliding) {
            return;
        }
        this.isPanelSliding = true;
        this.trigger.setAttribute('aria-expanded', 'true');
        this.panel.style.height = `${this.panelInner.clientHeight}px`;
        this.isPanelOpened = true;
    }

    /**
     * ディスクロージャーを閉じる処理
     * @returns {void}
     */
    closeHandler() {
        // クリックの連打をさせない
        if (this.isPanelSliding) {
            return;
        }
        this.isPanelSliding = true;
        this.trigger.setAttribute('aria-expanded', 'false');
        this.panel.style.height = `${this.panelInner.clientHeight}px`;

        setTimeout(() => {
            this.panel.style.height = 0;
        }, 100);
        this.isPanelOpened = false;
    }
}

/**
 * Disclosureをインスタンス化
 */
const setFaqDisclosure = () => {
    const roots = document.querySelectorAll('.js-disclosure > .item');

    if (!roots) {
        return;
    }

    roots.forEach((root) => {
        const trigger = root.querySelector('dt');
        const panel = root.querySelector('dd');
        const panelInner = root.querySelector('dd > .content');

        const SetFaqDisclosure = new Disclosure(root, trigger, panel, panelInner); // eslint-disable-line no-unused-vars
    });
};

export {setFaqDisclosure};
