import * as PIXI from 'pixi.js';
import TweenLite from 'gsap/TweenLite';
import { Sine } from 'gsap/EasePack';
import 'pixi-layers';
import * as lights from 'pixi-lights';
import throttle from 'lodash.throttle';
import { IMAGES_BASE_URL, RESIZE_DELAY } from './utils';
const {diffuseGroup, normalGroup, lightGroup} = lights;
const { Sprite, Container, display, WRAP_MODES, Application } = PIXI;
const { resources } = PIXI.loader;
const {Layer, Stage} = display;

const $root = qs('.bouquets');
const $canvas = $root.querySelector('.bouquets--bg');
const app = new Application($root.offsetWidth, $root.offsetHeight, {
  transparent: false,
  view: $canvas,
});

const LIGHT_ACCENT_COLOR = 0xC10758;
const LIGHT_COLOR = 0x8bd5cb;
const AMBIENT_LIGHT_COLOR = 0x15262D;

let isFirst = true;
let isSliderAnimated = false;
let light, light2;

function onload() {
  const diffuse = new Sprite(resources.pattern.texture);
  // also looks nice with little tinting
  //diffuse.tint = 0xffffff * .5;
  const normals = new Sprite(resources.pattern_normal.texture);
  app.stage = new Stage();
  normals.parentGroup = normalGroup;
  diffuse.parentGroup = diffuseGroup;
  light = new lights.PointLight(LIGHT_COLOR, 0);
  light2 = new lights.AmbientLight(AMBIENT_LIGHT_COLOR, 0.3);
  const bg = new Container();
  bg.addChild(normals, diffuse, light, light2);
  app.stage.addChild(
    new Layer(diffuseGroup),
    new Layer(normalGroup),
    new Layer(lightGroup),
    bg);
  $root.addEventListener('mousemove', mousemoveListener);
  $root.addEventListener('mouseleave', mouseleaveListener);
  window.addEventListener('resize', resizeHandler);
}

// ^-^ EVENT LISTENERS ^-^
__ee__.on('grab', () => {
  TweenLite.set(light, {
    color: LIGHT_ACCENT_COLOR,
  });
});
__ee__.on('grab_off', () => {
  TweenLite.set(light, {
    color: LIGHT_COLOR,
  });
});
// light off on leave
function mouseleaveListener() {
  TweenLite.to(light, 2.5, {
    brightness: 0,
  });
  isFirst = true;
}
function mousemoveListener({ clientX, clientY }) {
  const bounds = $canvas.getBoundingClientRect();
  // light the light on first mouse move
  // and show the slider
  if(isFirst) {
    isFirst = false;
    TweenLite.to(light, 4, {
      brightness: 1.5,
    });
    TweenLite.set(light, {
      x: clientX,
      y: clientY - bounds.top,
    });
    if(!isSliderAnimated) {
      isSliderAnimated = true;
      TweenLite.fromTo(qs('.slider'), 2.2, {
        y: -20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        ease: Sine.easeInOut,
      });
    }
  }
  else {
    TweenLite.to(light, 1, {
      x: clientX,
      y: clientY - bounds.top
    });
  }
}
const resizeHandler = throttle(() => {
  app.renderer.resize($root.offsetWidth, $root.offsetHeight);
}, RESIZE_DELAY);


// ^-^ INIT APP ^-^
__ee__.on('load', onload);
