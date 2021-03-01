/**
 * 対象のリンクにアイコンを付与
 * @returns {void}
 */
const setLinkIcon = () => {
    const pdfLinks = document.querySelectorAll('a[href$=".pdf"]:not([class*="no-icon"])');
    const zipLinks = document.querySelectorAll('a[href$=".zip"]:not([class*="no-icon"])');
    const blankLinks = document.querySelectorAll('a[target="_blank"]:not([href$=".pdf"]):not([href$=".zip"]):not([class*="no-icon"])');

    if (
        !pdfLinks.length &&
        !zipLinks.length &&
        !blankLinks.length
    ) {
        return;
    }

    const icon = {
        pdf: '<svg class="icon-pdf" viewBox="0 0 26 16" role="img"><title>PDFを開く</title><rect width="26" height="16" rx="2"/><path d="M4.19 12.12a8.059 8.059 0 01-.08-1.3V9.15h1.91a2.833 2.833 0 002.13-.72 2.568 2.568 0 00.67-1.84 2.338 2.338 0 00-.62-1.72 2.84 2.84 0 00-2.13-.71H3.98c-.53 0-.84-.01-1.27-.03a9.028 9.028 0 01.08 1.29v5.41a8.085 8.085 0 01-.08 1.29zM4.11 8V5.31h1.91a1.365 1.365 0 011.09.36 1.349 1.349 0 01.33.96A1.258 1.258 0 016.02 8zm5.79 2.83a8.089 8.089 0 01-.08 1.32c.41-.02.66-.03 1.27-.03h1.82a3.549 3.549 0 002.62-.87 4.21 4.21 0 001.18-3.18 4.025 4.025 0 00-1.11-3.03 3.566 3.566 0 00-2.7-.88h-1.81c-.63 0-.87-.01-1.27-.03a8.383 8.383 0 01.08 1.3zm1.33.11v-5.6h1.6a2.244 2.244 0 011.8.6 2.977 2.977 0 01.69 2.14 3.175 3.175 0 01-.73 2.22 2.2 2.2 0 01-1.77.64zm8.06-2.26h2.14a9.77 9.77 0 011.36.07V7.42a9.865 9.865 0 01-1.36.07h-2.14V5.37h2.66a9.556 9.556 0 011.37.07V4.09a10.221 10.221 0 01-1.37.07h-2.8c-.61 0-.86-.01-1.27-.03a8.635 8.635 0 01.08 1.3v5.27a8.43 8.43 0 01-.08 1.42h1.49a8.625 8.625 0 01-.08-1.44z"/></svg>',
        zip: '<svg class="icon-zip" viewBox="0 0 26 16"><title>zipファイルを開く</title><g><rect x="0.5" y="0.5" width="25" height="15" rx="1.5"/></g><path d="M6.77-1.13a12.114,12.114,0,0,1-1.45.07H2.82c-.32,0-.65.01-.83.01a7.216,7.216,0,0,0,.5-.59L5.75-5.76a9.931,9.931,0,0,1,.84-.97V-7.87c-.38.02-.91.03-1.3.03H2.06A12.433,12.433,0,0,1,.65-7.91v1.32a12.082,12.082,0,0,1,1.41-.07H4.18c.17,0,.51-.01.71-.02-.02.03-.17.2-.44.52L1.11-1.96a7.552,7.552,0,0,1-.81.93V.15C.69.13.97.12,1.6.12H5.32A10.375,10.375,0,0,1,6.77.19ZM7.78-7.84a7.471,7.471,0,0,1,.08,1.29v5.38A7.545,7.545,0,0,1,7.78.12H9.3a7.545,7.545,0,0,1-.08-1.29V-6.55A7.471,7.471,0,0,1,9.3-7.84ZM12.19.12a8.059,8.059,0,0,1-.08-1.3V-2.85h1.91a2.833,2.833,0,0,0,2.13-.72,2.568,2.568,0,0,0,.67-1.84,2.338,2.338,0,0,0-.62-1.72,2.84,2.84,0,0,0-2.13-.71H11.98c-.53,0-.84-.01-1.27-.03a9.028,9.028,0,0,1,.08,1.29v5.41A8.085,8.085,0,0,1,10.71.12ZM12.11-4V-6.69h1.91a1.365,1.365,0,0,1,1.09.36,1.349,1.349,0,0,1,.33.96A1.258,1.258,0,0,1,14.02-4Z" transform="translate(5 12)"/></svg>',
        blank: '<svg class="icon-blank" viewBox="0 0 12 12" role="img"><title>新しいウィンドウで開く</title><path d="M9 11H1V3h2.36V2H0v10h10V8.64H9z"/><path d="M7 0v1h3.3L3.15 8.15l.7.7L11 1.7V5h1V0z"/></svg>',
    };

    // アイコン付与の判定
    const setIcon = (targets) => {
        targets.forEach((target, index) => {
            const pdfFlag = /.pdf$/u.test(target.href);
            const zipFlag = /.zip$/u.test(target.href);

            // アイコン付与対象の判定
            if (pdfFlag) {
                target.innerHTML += icon.pdf;
                target.querySelector('.icon-pdf').setAttribute('aria-labelledby', `pdf-${index}`);
                target.querySelector('title').id = `pdf-${index}`;
            } else if (zipFlag) {
                target.innerHTML += icon.zip;
                target.querySelector('.icon-zip').setAttribute('aria-labelledby', `zip-${index}`);
                target.querySelector('title').id = `zip-${index}`;
            } else {
                target.innerHTML += icon.blank;
                target.querySelector('.icon-blank').setAttribute('aria-labelledby', `blank-${index}`);
                target.querySelector('title').id = `blank-${index}`;
            }
        });
    };

    setIcon(pdfLinks);
    setIcon(zipLinks);
    setIcon(blankLinks);
};

export {setLinkIcon};
