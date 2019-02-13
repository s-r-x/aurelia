import store from 'store';

const baseCart = {};

export function getInitialCart() {
  let cart;
  const oldCart = store.get('cart');
  if(oldCart) {
    return oldCart;
  }
  else {
    return baseCart;
  }
}

export function objectSize(obj) {
  let count = 0;
  for(let prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      count += 1;
    }
  }
  return count;
}
