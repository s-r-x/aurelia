import { loader } from 'pixi.js';
import { IMAGES_BASE_URL } from './utils';

const assets = {
  disp: IMAGES_BASE_URL + '/disp.png',
  pattern: IMAGES_BASE_URL + '/pattern.jpg',
  pattern_normal: IMAGES_BASE_URL + '/pattern_normal.jpg',
}

for(let key in assets) {
  loader.add(key, assets[key])
}
loader.load(() => __ee__.emit('load'));

