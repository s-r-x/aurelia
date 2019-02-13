
// change DOM a little bit
const hero = qs('.hero');
const headers = hero.querySelector('.hero--hidden-headers');
document.body.classList.add('is-mobile');
hero.querySelector('.hero--headers').style.display = 'none';
headers.classList.remove('hero--hidden-headers');
headers.classList.add('hero--not-hidden-headers');
hero.querySelector('.button').style.opacity = 1;
qs('.slider--nav').style.display = 'none';
__ee__.emit('ready');

require('./mobileSlider');
