export default function flights(state = [], action) {
    switch (action.type) {
      case "ADD_FLIGHT":
        return [...state, { id: Math.random(), text: action.payload.text }];
      default:
        return state;
    }
  }
  