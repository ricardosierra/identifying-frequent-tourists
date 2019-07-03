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
    state = {
        suspeits: []
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props, this.state, prevProps, prevState);
    }

    /**
     * São aqueles possuem bilhetes de ida e volta em um mesmo dia, 
     * mais de 3 vezes nos últimos 30 dias.
     */
    detected(passengers) {

        // passengers. 

        let date = moment().subtract(1, 'months').format();

        axios.get((`http://localhost:3001/tickets?views_gte=${date}`))
        .then(res => {
            const tickets = res.data;

            //@todo
            var numFlights = tickets.reduce(function (n, passenger) {
                return n + (passenger.date == '');
            }, 0);


            this.setState({suspeits})
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
