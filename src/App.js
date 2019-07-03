import React, { Component } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from "./store";
import FlightBox from "./components/Flight";


class App extends Component {
    render() {
        return (
            <div className="container">
                <Header title="App" />
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor} >
                        <FlightBox />
                    </PersistGate>
                </Provider>
            </div>
        );
    }
}

export default App;
