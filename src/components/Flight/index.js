import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import { 
    Table, 
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';

class FormFlight extends Component {

    state = { 
        model: { 
            id: 0, 
            departure_time: '',
            origin: 0, 
            destination: 0 
        } 
    };

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({ model });
    }

    create = () => {
        this.setState({ model: { id: 0,  departure_time: '', origin: 0, destination: 0 } })
        this.props.flightCreate(this.state.model);
    }

    componentWillMount() {
        PubSub.subscribe('edit-flight', (topic, flight) => {
            this.setState({ model: flight });
        });
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="departure_time">Departure Time:</Label>
                    <Input id="departure_time" type="text" value={this.state.model.departure_time} placeholder="departure_time..."
                    onChange={e => this.setValues(e, 'departure_time') } />
                </FormGroup>
                <FormGroup>
                    <Label for="arrival_time">Arrival Time:</Label>
                    <Input id="arrival_time" type="text" value={this.state.model.arrival_time} placeholder="arrival time..."
                    onChange={e => this.setValues(e, 'arrival_time') } />
                </FormGroup>
                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-6">
                            <Label for="origin">Origin:</Label>
                            <Input id="origin" type="text"  value={this.state.model.origin} placeholder="Origin do Voo" 
                            onChange={e => this.setValues(e, 'origin') } />
                        </div>
                        <div className="col-md-6">
                            <Label for="destination">Destination:</Label>
                            <Input id="destination" type="text" value={this.state.model.destination} placeholder="Destino do voo" 
                            onChange={e => this.setValues(e, 'destination') } />
                        </div>
                    </div>
                </FormGroup>
                <Button color="primary" block onClick={this.create}> Save </Button>
            </Form>
        );
    }
}

class ListFlight extends Component {

    delete = (id) => {
        this.props.deleteFlight(id);
    }

    onEdit = (flight) => {
        PubSub.publish('edit-flight', flight);
    }

    render() {
        const { flights } = this.props;
        return (
            <Table className="table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Number</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        flights.map(flight => (
                            <tr key={flight.number}>
                                <td>{flight.number}</td>
                                <td>{flight.origin}</td>
                                <td>{flight.destination}</td>
                                <td>{flight.departure_time}</td>
                                <td>{flight.arrival_time}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e => this.onEdit(flight)}>Edit</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(flight.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }   
}

export default class FlightBox extends Component {

    Url = 'http://localhost:3001/flights';

    state = {
        flights: [],
        message: {
            text: '',
            alert: ''
        }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(response => response.json())
            .then(flights => this.setState({ flights }))
            .catch(e => console.log(e));
    }

    save = (flight) => {
        let data = {
            number: parseInt(flight.number),
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
            origin: flight.origin,
            destination: flight.destination,
        };
        console.log(data);

        const requestInfo = {
            method: data.id !== 0? 'PUT': 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        if(data.id === 0) {
            // CREATE NEW PRODUCT
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newFlight => {
                let { flights } = this.state;
                flights.push(newFlight);
                this.setState({ flights, message: { text: 'Novo voo adicionado com sucesso!', alert: 'success' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e)); 
        } else {
            // EDIT PRODUCT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedFlight => {
                let { flights } = this.state;
                let position = flights.findIndex(flight => flight.id === data.id);
                flights[position] = updatedFlight;
                this.setState({ flights, message: { text: 'Voo atualizado com sucesso!', alert: 'info' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e)); 
        }
    }

    delete = (id) => {
        fetch(`${this.Url}/${id}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(rows => {
                const flights = this.state.flights.filter(flight => flight.id !== id);
                this.setState({ flights,  message: { text: 'Voo deletado com sucesso.', alert: 'danger' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: '', alert: ''} });
        }, duration);
    }

    render() {
        return (
            <div>
                {
                    this.state.message.text !== ''? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : ''
                }

                <div className="row">
    
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Cadastro de Voos </h2>
                        <FormFlight flightCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Lista de Voos </h2>
                        <ListFlight flights={this.state.flights}  deleteFlight={this.delete} />
                    </div>
                </div>
            </div>
        );
    }
}