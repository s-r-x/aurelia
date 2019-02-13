require('../styles/index.less');
import CSSPlugin from 'gsap/CSSPlugin'
import scrollToPlugin from 'gsap/ScrollToPlugin';
import TweenLite from 'gsap/TweenLite';
import { Power2 } from 'gsap/EasePack';
import { isMobile, RESIZE_DELAY } from './utils';
import throttle from 'lodash.throttle';

// ie11 promise all fix
require('core-js/fn/promise');

const gsapPlugins = [ CSSPlugin, scrollToPlugin ];
window.qs = document.querySelector.bind(document);
window.qsa = document.querySelectorAll.bind(document);

require('./preloader');

if(isMobile) {
  console.log('init mobile');
  import(/* webpackChunkName: "initMobile" */ './initMobile');
}
else {
  console.log('init desktop');
  import(/* webpackChunkName: "initDesktop" */ './initDesktop');
}

// ^-^ COMMON CODE ^-^
document.body.style.cursor = 'wait';
const $head = qs('.site-head');
$head.style.height = window.innerHeight + 'px';
$head.querySelector('.button').onclick = e => {
  e.preventDefault();
  TweenLite.to(window, 1.5, {
    scrollTo: '.bouquets',
    ease: Power2.easeInOut,
  });
};

require('./cart/Cart.jsx');
