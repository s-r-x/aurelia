import TimelineLite from 'gsap/TimelineLite';                                                                                                                          
import { Power1 } from 'gsap/EasePack'; 
import * as PIXI from 'pixi.js';
import webfont from 'webfontloader';
import throttle from 'lodash.throttle';
import { RESIZE_DELAY } from './utils';

const { loader, Graphics, Sprite, Container, filters, autoDetectRenderer, Text, TextStyle } = PIXI;

const FILL_COLOR = 0xffffff;
const SUB_HEAD_FILTER_SCALE = 65;
const SUB_HEAD_FILTER_SPRITE_SCALE = 5;
const HEAD_FILTER_SCALE = 70;
const HEAD_FILTER_SPRITE_SCALE = 3;

// ^-^ DOM REFS ^-^
const $root = qs('.site-head');
const DOM = {
  canvas: $root.querySelector('.hero--headers'),
  btn: $root.querySelector('.button'),
}

// ^-^ LOAD FONTS ^-^
const fontPromise = new Promise(r => {
  webfont.load({
    google: {
      families: [ 'Oranienbaum' ],
    },
    custom: {
      families: [ 'BebasNeue' ],  
    },
    active: r,
  });
});

// ^-^ WAIT FOR ASSETS TO LOAD ^-^ 
const assetsPromise = new Promise(r => __ee__.on('load', r));

// ^-^ INIT PIXI ^-^
let stage
let renderer;
let subheadText;
let headText;
let rect;
let headFilter;
let subheadFilter;
let subheadFilterSprite;
let headFilterSprite;
Promise.all([ fontPromise, assetsPromise ]).then(onload);
function onload() {
  stage = new Container();
  renderer = new autoDetectRenderer(window.innerWidth, 290, {
    transparent: true,
    view: DOM.canvas,
  });
  renderer.plugins.interaction.autoPreventDefault = false;

  // text
  const subheadStyle = new TextStyle({
    fontFamily: 'BebasNeue',
    fontSize: 36,
    lineHeight: 41,
    letterSpacing: 2,
    fill: FILL_COLOR,
    align: "center",
  });
  const headStyle = new TextStyle({
    fontFamily: 'Oranienbaum',
    fontSize: 144,
    letterSpacing: 10,
    fill: FILL_COLOR,
    align: "center",
  });
  subheadText = new Text('Доставка цветов\n в Ханты-Мансийске', subheadStyle);
  headText = new Text('АВРЕЛИЯ', headStyle);
  headText.alpha = 0;
  subheadText.alpha = 0;
  subheadText.x = renderer.screen.width / 2 - subheadText.width / 2;
  headText.y = subheadText.height + 15;
  headText.x = renderer.screen.width / 2 - headText.width / 2;

  // rect
  const graphics = new Graphics();
  graphics.beginFill(FILL_COLOR).drawRect(0, 0, 60, 3);
  rect = new Sprite(renderer.generateTexture(graphics));
  rect.x = renderer.screen.width / 2 - rect.width / 2;
  rect.y = subheadText.height;
  rect.alpha = 0;

  subheadFilterSprite = new Sprite(loader.resources.disp.texture);
  headFilterSprite = new Sprite(loader.resources.disp.texture);
  subheadFilterSprite.scale.x = SUB_HEAD_FILTER_SPRITE_SCALE;
  subheadFilterSprite.scale.y = SUB_HEAD_FILTER_SPRITE_SCALE;
  headFilterSprite.scale.x = HEAD_FILTER_SPRITE_SCALE;
  headFilterSprite.scale.y = HEAD_FILTER_SPRITE_SCALE;

  // head filter
  headFilter = new filters.DisplacementFilter(headFilterSprite);
  headFilter.scale.x = HEAD_FILTER_SCALE;
  headFilter.scale.y = HEAD_FILTER_SCALE;
  headFilter.padding = 0;
  // subhead filter
  subheadFilter = new filters.DisplacementFilter(subheadFilterSprite);
  subheadFilter.scale.x = SUB_HEAD_FILTER_SCALE;
  subheadFilter.scale.y = SUB_HEAD_FILTER_SCALE;
  subheadFilter.padding = 0;


  stage.addChild(subheadText);
  stage.addChild(headText);
  stage.addChild(rect);
  stage.addChild(headFilterSprite);
  stage.addChild(subheadFilterSprite);
  headText.filters = [ headFilter ];
  subheadText.filters = [ subheadFilter ];
  renderer.render(stage);

  // ^-^ ANIMATIONS ^-^
  const tl = new TimelineLite();
  // subhead
  tl.add('subhead_start', 0);
  tl.to(subheadFilter.scale, 2, {
    x: 0,
    y: 0,
    ease: Power1.easeInOut,
    onUpdate() {
      renderer.render(stage);
    }
  }, 'subhead_start')
  tl.to(subheadText, 2, {
    alpha: 1,
    ease: Power1.easeInOut,
  }, 0.2);
  // head
  tl.add('head_start', 0.45);
  tl.to(headFilter.scale, 1.75, {
    x: 0,
    y: 0,
    ease: Power1.easeInOut,
    onUpdate() {
      renderer.render(stage);
    }
  }, 'head_start')
  tl.to(headText, 2, {
    alpha: 1,
    ease: Power1.easeInOut,
  }, 'head_start');
  //rect
  tl.to(rect, 1.5, {
    alpha: 1,
    ease: Power1.easeInOut,
  }, .8);
  // btn
  tl.to(DOM.btn, 1.3, {
    opacity: 1,
    ease: Power1.easeInOut,
  }, .7)
}

// ^-^ RESIZE EVENT ^-^
window.addEventListener('resize', throttle(() => {
  $root.style.height = window.innerHeight + 'px';
  renderer.resize(window.innerWidth, 290);
  headText.x = renderer.screen.width / 2 - headText.width / 2;
  subheadText.x = renderer.screen.width / 2 - subheadText.width / 2;
  rect.x = renderer.screen.width / 2 - rect.width / 2;
  renderer.render(stage);
}, RESIZE_DELAY));
