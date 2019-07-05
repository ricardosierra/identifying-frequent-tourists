import { combineReducers } from "redux";

import flights from "./flights";
import passengers from "./passengers";
import tickets from "./tickets";

export default combineReducers({
    flights,
    passengers,
    tickets
});