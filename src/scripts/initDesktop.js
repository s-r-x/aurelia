require('./loader');
require('./head');
require('./fancy_bg');
require('./bouquets');

const windowLoad = new Promise(r => window.addEventListener('load', r));
const scriptsDone = new Promise(r => __ee__.on('load', r));
Promise.all([ windowLoad, scriptsDone ])
  .then(() => __ee__.emit('ready'));
