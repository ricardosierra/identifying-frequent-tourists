import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';


class Suspeit extends Component {
    const suspeits = useSelector = {
        // Filtra quem tem mais de 3
        state => state.filter( (passenger) => {
            // Retorna viagens de ida e volta em menos de 24 hrs
            if (flights.reduce( function( prevVal, elem, index, array ) {
                // Is in the last 30 days
                if (elem.departure_time < today()-(24*60*30)) {
                    return 0;
                }

                //
                if (flights.filter((flight) => {
                    // Verifica se é ticke de volta
                    if( flight.destination != elem.origin ||  elem.destination != flight.origin) {
                        return false;
                    }

                    // If have more then 24 hrs
                    if ((flight.departure_time - elem.departure_time) > (24*60)) {
                        return false;
                    }

                    return true;
                }).length() == 0) {
                    return 0;
                }

                // Se ele for passageiro retorna +1;
                return prevVal + 1;
            }, initialValue ) > 3) {
                return true;
            }
            return false;
        })
    }

    render() {
        return (
            <>

            </>
            <div className="Suspeit">
                {
                    suspeits.map(suspeit => <li key={suspeit}>{suspeit}</li>)
                }
            </div>
        );
    }
}

export default Suspeit;
