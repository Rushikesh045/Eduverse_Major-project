// src/store/reducers/exampleReducer.js
import { EXAMPLE_ACTION } from '../actions/exampleActions';

const initialState = {
  exampleState: false,
};

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return {
        ...state,
        exampleState: !state.exampleState,
      };
    default:
      return state;
  }
};

export default exampleReducer;
