import store from 'store';
const bouquets = require('../../../bouquets.json').list;
import { h, app } from "hyperapp"
import actions from './actions';
import { getInitialCart, objectSize } from './utils';
import Table from './Table.jsx';
import Form from './Form.jsx';
import EmptyCart from './EmptyCart.jsx';
import TweenLite from 'gsap/TweenLite';
import { Power1 } from 'gsap/EasePack';


const state = {
  items: getInitialCart(),
};

const view = (state, actions) => {
  const { items } = state;
  const transformed = Object.keys(items).map(key => ({
    title: items[key].title,
    price: items[key].price,
    amount: items[key].amount,
    sum: items[key].amount * Number(items[key].price),
    id: items[key].id,
  }));
  // hyper doesn't have state update watcher, 
  // proxy doesn't work work either
  // so we just simply update localStorage on
  // every update 
  store.set('cart', items);
  return (
    <div 
      class="cart--inner" 
      oncreate={() => {
        __ee__.on('cart_add', id => {
          actions.items.add(id);
        });
      }}
    >
      <button className="cart--close" aria-label="закрыть корзину" title="Закрыть" onclick={() => {
        const $root = qs('.cart');
        TweenLite.to($root, .7, {
          opacity: 0,
          onComplete() {
            $root.style.display = '';
          },
          ease: Power1.easeInOut,
        });
      }}><i className="icon-cancel" ></i></button>
  {transformed.length === 0 ? <EmptyCart/> :
      [
        <Table items={transformed} actions={actions}/>,
        <Form/>
      ]
  }
</div>
  );
};
const DOM = {
  root: qs('.cart'),
  counter: qs('.basket--counter'),      
  add: qsa('.slider--cart'),
  openBtn: qs('.basket'),
};

DOM.openBtn.onclick = () => {
  TweenLite.to(DOM.root, .7, {
    onStart() {
      DOM.root.style.display = 'flex';
      qs('.cart--close').focus();
    },
    opacity: 1,
    ease: Power1.easeInOut,
  });
}
[].slice.call(DOM.add).forEach($btn => {
  $btn.onclick = ({ target }) => 
    __ee__.emit('cart_add', Number(target.dataset.id));
});

// ^-^ COUNTER ^-^
DOM.counter.textContent = objectSize(state.items);
__ee__.on('cart_add', () => {
  const old = DOM.counter.textContent;
  DOM.counter.textContent = Number(old) + 1;
});
__ee__.on('cart_remove', () => {
  const old = DOM.counter.textContent;
  DOM.counter.textContent = Number(old) - 1;
});

const main = app(state, actions, view, DOM.root);
