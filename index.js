const redux = require("redux");

// defining action
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const PIZZA_ORDERED = "PIZZA_ORDERED";
const PIZZA_RESTOCKED = "PIZZA_RESTOCKED";

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

// action creator
function orderPizza() {
  return {
    type: PIZZA_ORDERED,
    payload: 1,
  };
}

function restockPizza(quantity = 1) {
  return {
    type: PIZZA_RESTOCKED,
    payload: quantity,
  };
}

// initial state
const initialCakeState = {
  numOfCakes: 10,
};

// initial state
const initialPizzaState = {
  numOfPizzas: 20,
};

// creating reducer
const reducerCake = (state = initialCakeState, action) => {
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

// creating reducer
const reducerPizza = (state = initialPizzaState, action) => {
  switch (action.type) {
    case PIZZA_ORDERED:
      return {
        ...state,
        numOfPizzas: state.numOfPizzas - 1,
      };

    case PIZZA_RESTOCKED:
      return {
        ...state,
        numOfPizzas: state.numOfPizzas + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = redux.combineReducers({
  cake: reducerCake,
  pizza: reducerPizza,
});

// creating store
const store = redux.createStore(rootReducer);
console.log("Initial state: ", store.getState());

// subscribigng to store
const unsubscribe = store.subscribe(() => {
  console.log("Updated state: ", store.getState());
});

// binding action creators
const actions = redux.bindActionCreators(
  { orderCake, restockCake, orderPizza, restockPizza },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderPizza();
actions.orderPizza();
actions.orderPizza();
actions.restockPizza(3);

// unsubscribigng from store
unsubscribe();

// since now we are unscribed this will not work anymore
store.dispatch(orderCake());
