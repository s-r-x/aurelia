const EventEmitter = require('wolfy87-eventemitter');
window.__ee__ = new EventEmitter();

const $el = qs('.preloader');

__ee__.on('ready', onload);

function onload() {
  document.body.style.cursor = '';
  $el.style.opacity = 0;
  $el.addEventListener('transitionend', () => $el.style.display = 'none');
}
