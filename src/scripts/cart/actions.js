const bouquets = require('../../../bouquets.json').list;

const actions = {
  items: {
    add(id) {
      return function(state) {
        if(id in state) {
          state[id].amount += 1;
          return { ...state };
        }
        else {
          const bouquet = bouquets.find(_bouquet => _bouquet.id === id);
          state[id] = {
            title: bouquet.title,
            price: Number(bouquet.price),
            amount: 1,
            id: id,
          }
          return { ...state };
        }
      }
    }, 
    remove(id) {
      return function(state) {
        if(id in state) {
          delete state[id];
          return { ...state };
        }
        else {
          return state;
        }
      }
    },
    decAmount(id) {
      return function(state) {
        state[id].amount -= 1;
        return { ...state };
      }
    },
    incAmount(id) {
      return function(state) {
        state[id].amount += 1;
        return { ...state };
      }
    }
  }
}

export default actions;
