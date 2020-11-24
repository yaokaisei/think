const hoge = () => {
    // ハンバーガーメニューボタン生成
    const btn = document.createElement('button');
    const span = document.createElement('span');

    span.textContent = 'menu';
    btn.classList.add('js-menuBtn');
    btn.setAttribute('aria-expanded', false);
    btn.setAttribute('aria-controls', 'panel');
    btn.appendChild(span);

    const panel = document.querySelector('.headerNav');
    panel.parentNode.insertBefore(btn, panel);

    const clickHandler = () => {
        if (btn.getAttribute('aria-expanded', false)) {
            btn.setAttribute('aria-expanded', true);
        } else {
            btn.setAttribute('aria-expanded', false);
        }
        document.body.classList.toggle('is-open')
    };

    btn.addEventListener('click', clickHandler);
};

export {hoge};
