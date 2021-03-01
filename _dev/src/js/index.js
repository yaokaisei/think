import 'picturefill';
import 'element-closest-polyfill';
import 'whatwg-fetch';

import {hamburgerMenu} from "./modules/hamburgerMenu";
import {adjustPagetopBtn} from './modules/adjustPagetopBtn';
import {setSmoothScroll} from './modules/smoothScroll';
import {setLinkIcon} from './modules/linkIcon';
import {setLinkRelOption} from './modules/linkRelOption';
import {setFaqDisclosure} from './modules/faqDisclosure';
import {setTelLink} from './modules/telLink';

(() => {
    hamburgerMenu();

    // ページトップボタン
    adjustPagetopBtn();

    // スムーススクロール
    setSmoothScroll();

    // リンクアイコン付与
    setLinkIcon();

    // リンクrel属性付与
    setLinkRelOption();

    // FAQディスクロージャー
    setFaqDisclosure();

    // 電話番号リンク
    setTelLink();
})();
