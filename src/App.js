import React, { Component } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from "./store";
import FlightList from "/FlightList";

import Suspeit from './components/Suspeit';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Identifying Frequent Tourists'
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onClick() {
        alert('Suspeit');
    }

    onSubmit(event) {
        event.preventDefault();
        alert('Suspeit');

        console.log(this.input.value);
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor} >
                    <FlightList />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
