'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function addStyles (win, styles) {
  styles.forEach(style => {
    let link = win.document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', style);
    win.document.getElementsByTagName('head')[0].appendChild(link);
  });
}

function openWindow (url, name, props) {
  let windowRef = null;
  windowRef = window.open(url, name, props);
  if (!windowRef.opener) {
    windowRef.opener = self;
  }
  windowRef.focus();
  return windowRef;
}

const VueHtmlToPaper = {
  install (Vue, options = {}) {
    Vue.prototype.$htmlToPaper = (el, localOptions, cb = () => true) => {
      let defaultName = '_blank',
        defaultSpecs = ['fullscreen=yes','titlebar=yes', 'scrollbars=yes'],
        defaultReplace = true,
        defaultStyles = [];
      let {
        name = defaultName,
        specs = defaultSpecs,
        replace = defaultReplace,
        styles = defaultStyles,
      } = options;

      // If has localOptions
      // TODO: improve logic
      if (!!localOptions) {
        if (localOptions.name) name = localOptions.name;
        if (localOptions.specs) specs = localOptions.specs;
        if (localOptions.replace) replace = localOptions.replace;
        if (localOptions.styles) styles = localOptions.styles;
      }

      specs = !!specs.length ? specs.join(',') : '';

      const element = window.document.getElementById(el);

      if (!element) {
        alert(`Element to print #${el} not found!`);
        return;
      }

      const url = '';
      const win = openWindow(url, name, specs);

      win.document.write(`
        <html>
          <head>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Kantumruy:wght@300;400&display=swap" rel="stylesheet">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet">
            <title>${window.document.title}</title>
          </head>
         <style>
         body{
         margin: 0;
         padding: 0;
         }
            h1, h2, ,h3, h4, h5, h6{
                font-family: "Kh Muol";
            }
            p {
             font-family: 'Open Sans', 'Kantumruy';
            }
         </style>
          <body>
            ${element.innerHTML}
          </body>
        </html>
      `);

      addStyles(win, styles);

      setTimeout(() => {
        win.document.close();
        win.focus();
        win.print();
        setTimeout(function () {window.close();}, 1);
        cb();
      }, 1000);

      return true;
    };
  },
};

exports.default = VueHtmlToPaper;
