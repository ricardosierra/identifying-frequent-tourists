export default function passengers(state = [], action) {
    switch (action.type) {
      case "ADD_PASSENGER":
        return [...state, { id: Math.random(), text: action.payload.text }];
      default:
        return state;
    }
  }
  