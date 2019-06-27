import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
            <div className="App">
                <h1>
                {this.state.title}
                </h1>
                <Suspeit
                    title ={2}
                    name="Michael"
                    onClick={this.onClick}
                />


                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onChange} ref={input => this.input = input} />
                </form>
            </div>
        );
    }
}

export default App;
