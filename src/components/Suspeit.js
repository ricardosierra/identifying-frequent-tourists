import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    passenger: PropTypes.string.isRequired,
    flight: PropTypes.func,
    onClick: PropTypes.string.isRequired
}

const defaultProps = {
    passenger: 'Passenger 1',
    flight: 'Flight 1'
}


class Suspeit extends Component {
    componentDidUpdate(prevProps, prevState) {
        console.log(this.props, this.state, prevProps, prevState);
    }

    /**
     * São aqueles possuem bilhetes de ida e volta em um mesmo dia, 
     * mais de 3 vezes nos últimos 30 dias.
     */
    detected(passenger) {

        flights = [

            since_days: 
        ];

        flights.map( passenger => {



            return (
                <div onclick={this.onClick}>{passenger}</div>
            );
        })

        // Mesmo voo ida e volta

        // 
    }

    render() {
        const {passenger, flight, onClick } = this.props;


        return (
            <div className="Suspeit">
                <h1>Flight: {flight}</h1>
                <h2>Passenger: {passenger}</h2>
                <div onClick={onClick}>Capture</div>
            </div>
        );
    }
}

Suspeit.propTypes = propTypes;
Suspeit.defaultProps = defaultProps;

export default Suspeit;
