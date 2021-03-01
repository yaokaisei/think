import {config} from '../common/config';
import 'intersection-observer';

/**
 * ページトップボタンの表示・位置調整処理
 * @returns {void}
 */
const adjustPagetopBtn = () => {
    const btn = document.getElementById('js-pagetop');

    if (!btn) {
        return;
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    };

    /**
     * headerが交差したときに呼び出す関数
     * @param entries [IntersectionObserverEntry]
     */
    const intersectHeader = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                btn.classList.remove(config.showClassName);
            } else {
                btn.classList.add(config.showClassName);
            }
        });
    };

    /**
     * footerが交差したときに呼び出す関数
     * @param entries [IntersectionObserverEntry]
     */
    const intersectFooter = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                btn.classList.add(config.fixedClassName);
            } else {
                btn.classList.remove(config.fixedClassName);
            }
        });
    };

    const headerObserver = new IntersectionObserver(intersectHeader, options);
    const footerObserver = new IntersectionObserver(intersectFooter, options);

    headerObserver.observe(config.header);
    footerObserver.observe(config.footer);
};

export {adjustPagetopBtn};
