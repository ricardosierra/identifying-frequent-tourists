export default function tickets(state = [], action) {
    switch (action.type) {
      case "ADD_TICKET":
        return [...state, { id: Math.random(), text: action.payload.text }];
      default:
        return state;
    }
  }
  