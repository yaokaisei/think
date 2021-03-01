/**
 * 対象のリンクにrel属性を付与
 * HTMLにrel="noopener noreferrer"が記述されていた場合、付与対象から外す
 * @returns {void}
 */
const setLinkRelOption = () => {
    const targets = document.querySelectorAll('a[target="_blank"]:not([rel$="noopener noreferrer"]');

    if (!targets.length) {
        return;
    }

    targets.forEach((target) => {
        target.setAttribute('rel', 'noopener noreferrer');
    });
};

export {setLinkRelOption};
