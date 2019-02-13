import TweenLite from 'gsap/TweenLite';
import TimelineLite from 'gsap/TimelineLite';                                                                                                                          
import throttle from 'lodash.throttle';
import { Power2 } from 'gsap/EasePack';
import { IMAGES_BASE_URL, mapNumber, SLIDER_BTN_HALF_SIZE, RESIZE_DELAY } from './utils';
const bouquetsList = require('../../bouquets.json').list;


const $root = qs('.bouquets');
const $canvas = qs('.bouquets--bg');
const $slider = $root.querySelector('.slider');
const $lis = $slider.querySelectorAll('.slider--item');
const $btn = $root.querySelector('.slider--nav');


// ^-^ GLOBAL STUFF ^-^
// all items are equal in width so we can grab any of them
let itemWidth;
// padding between items
let itemOffset;
let rootBounds;
// width of slider container
let rootWidth;
// need to divide root width by two a lot so it better to create the separate variable
let halfRootWidth;
// need to restrict the button moving for some reasonable value
let buttonBounds;
let isGrab = false;
let minOffset;
let maxOffset;
let activeIndex;

// ^-^ INIT ^-^
function init() {
  // set the middle element as active
  activeIndex = Math.floor(($lis.length - 1) / 2);
  setGlobalValues();
  buildDOMStuff();

  $btn.addEventListener('mousedown', mousedownListener);
  document.addEventListener('mouseup', mouseupListener);
  $root.addEventListener('mousemove', mousemoveListener);
}

// ^-^ EVENT LISTENERS ^-^
function mousedownListener() {
  isGrab = true;
  document.body.classList.add('is-grabbing');
  __ee__.emit('grab');
}
function mouseupListener() {
  if(!isGrab) {
    return;
  }
  __ee__.emit('grab_off');
  isGrab = false;
  let closest = Infinity;
  let index;
  const contCenter = itemWidth / 2;
  // gsap is just a miracle!
  const currentOffset = $slider._gsTransform.x;
  // find the element that closest to the center
  [].slice.call($lis).forEach(($li, i) => {
    const elemCent = i * itemWidth + (itemOffset * i) + (itemWidth / 2) + currentOffset;
    const diff = Math.abs(elemCent - halfRootWidth);
    if(diff < closest) {
      closest = diff;
      index = i;
    }
  });
  activeIndex = index;
  TweenLite.to($slider, 1.2, {
    x: calcNewOffset(),
  });

  updateActiveCssClass();

  document.body.classList.remove('is-grabbing');

}
function mousemoveListener({ clientX, clientY}) {
  if(!isGrab) return;
  if(clientX < 0) return;
  const bounds = $root.getBoundingClientRect();
  TweenLite.to($btn, .6, {
    x: clientX - SLIDER_BTN_HALF_SIZE,
    y: clientY - bounds.top - SLIDER_BTN_HALF_SIZE,
  });
  const offset = mapNumber(clientX, rootWidth - buttonBounds, buttonBounds, minOffset, maxOffset);
  TweenLite.to($slider, .7, {
    ease: Power2.easeOut,
    x: offset,
  });
}
const resizeListener = throttle(() => {
  setGlobalValues();
  buildDOMStuff();
}, RESIZE_DELAY);

function keyListener({ keyCode }) {
  const ARROW_LEFT = 37;
  const ARROW_RIGHT = 39;
  // show slider if it's still has 0 opacity
  TweenLite.to($slider, 1, { opacity: 1 });
  if(keyCode === ARROW_LEFT) {
    if(activeIndex === 0) {
      activeIndex = bouquetsList.length - 1;    
    }
    else {
      activeIndex -= 1;
    }
  }
  if(keyCode === ARROW_RIGHT) {
    if(activeIndex === bouquetsList.length - 1) {
      activeIndex = 0;
    }
    else {
      activeIndex += 1;
    }
  }
  updateActiveCssClass();
  TweenLite.to($slider, 1.2, {
    x: calcNewOffset(),
  });
}

// ^-^ UTILS ^-^ 
function setGlobalValues() {
  itemWidth = $lis[0].getBoundingClientRect().width;
  itemOffset = 100;
  rootBounds = $root.getBoundingClientRect()
  rootWidth = rootBounds.width;
  buttonBounds = 200;
  halfRootWidth = rootWidth / 2;
  minOffset = calcMinOffset();
  maxOffset = calcMaxOffset();
}
function updateActiveCssClass() {
  [].slice.call($lis).forEach(($li, i) => {
    if(i === activeIndex) {
      $li.classList.add('is-active');
      $li.querySelector('.slider--cart').tabIndex = 0;
    }
    else {
      $li.querySelector('.slider--cart').tabIndex = -1;
      $li.classList.remove('is-active');
    }
  })
}
function buildDOMStuff() {
  const tallestItem = [].slice.call($lis).reduce((a, $li) =>
    Math.max($li.getBoundingClientRect().height, a), -Infinity);
  // set initial css absolute offset 
  // plus center items vertically
  // don't change, it fixes some weird firefox bugs
  [].slice.call($lis).forEach(($li, i) => 
    TweenLite.set($li, { 
      y: - tallestItem / 2,
      left: i * itemWidth + itemOffset * i,
    }))
  const newOffset = calcNewOffset();
  TweenLite.set($slider, { 
    x: newOffset,
  });
  TweenLite.set($btn, { 
    x: setButtonPos(newOffset),
    y: rootBounds.height - 75,
  });

  updateActiveCssClass();
}

function setButtonPos(sliderOffset) {
  return mapNumber(sliderOffset, minOffset, maxOffset, rootWidth - buttonBounds, buttonBounds);
}
function calcMinOffset() {
  const lastCenter = $lis.length * itemWidth + $lis.length * (itemOffset - 1) - (itemWidth / 2);
  return halfRootWidth - lastCenter;
}
function calcMaxOffset() {
  const halfImg = itemWidth / 2;
  return halfRootWidth - halfImg;
}
function calcNewOffset() {
  return halfRootWidth - (activeIndex * itemWidth + (itemOffset * activeIndex) + (itemWidth / 2));
}

// ^-^ INIT APP ^-^ 
// need to wait for item images to load to calculate their heights properly
window.addEventListener('load', init);
window.addEventListener('keyup', keyListener);
window.addEventListener('resize', resizeListener);
