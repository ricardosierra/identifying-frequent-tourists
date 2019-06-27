import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as FlightActions from "./store/actions/flights";

class FlightList extends Component {
  state = {
    newFlightText: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.addFlight(this.state.newFlightText);

    this.setState({ newFlightText: "" });
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={e => this.setState({ newFlightText: e.target.value })}
            value={this.state.newFlightText}
          />
          <button type="submit">Salvar</button>
        </form>
        <ul>
          {this.props.flights.map(flight => <li key={flight.id}>{flight.text}</li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  flights: state.flights
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FlightActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);
