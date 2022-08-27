const redux = require("redux");

// defining action
const CAKE_ORDERED = "CAKE_ORDERED";

// action creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

// initial state
const initialState = {
  numOfCakes: 10,
};

// creating reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

// creating store
const store = redux.createStore(reducer);

console.log("Initial state: ", store.getState());

// subscribigng to store
const unsubscribe = store.subscribe(() => {
  console.log("Update state: ", store.getState());
});

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

// unsubscribigng from store
unsubscribe();

// since now we are unscribed this will not work anymore
store.dispatch(orderCake());
