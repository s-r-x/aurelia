import 'flickity/css/flickity.css';

import Flickity from 'flickity'
const $slider = qs('.slider');
const config = {
  wrapAround: true,
  prevNextButtons: false,
  resize: true,
  pageDots: false,
};
const slider = new Flickity($slider, config);
