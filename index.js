const redux = require("redux");

// defining action
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

// action creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(quantity = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: quantity,
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

    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
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

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

// binding action creators
const actions = redux.bindActionCreators(
  { orderCake, restockCake },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

// unsubscribigng from store
unsubscribe();

// since now we are unscribed this will not work anymore
store.dispatch(orderCake());
