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

class FormTicket extends Component {

    state = { 
        model: { 
            passenger_national_id: 0, 
            flight_number: 0,
            seat_number: 0
        } 
    };

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({ model });
    }

    create = () => {
        this.setState({ model: { id: 0,  departure_time: '', origin: 0, destination: 0 } })
        this.props.ticketCreate(this.state.model);
    }

    componentWillMount() {
        PubSub.subscribe('edit-ticket', (topic, ticket) => {
            this.setState({ model: ticket });
        });
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-4">
                            <Label for="passenger_national_id">Passanger National ID:</Label>
                            <Input id="passenger_national_id" type="text"  value={this.state.model.passenger_national_id} placeholder="" 
                            onChange={e => this.setValues(e, 'passenger_national_id') } />
                        </div>
                        <div className="col-md-4">
                            <Label for="flight_number">Flight Number:</Label>
                            <Input id="flight_number" type="text" value={this.state.model.flight_number} placeholder="" 
                            onChange={e => this.setValues(e, 'flight_number') } />
                        </div>
                        <div className="col-md-4">
                            <Label for="seat_number">Seat Number:</Label>
                            <Input id="seat_number" type="text" value={this.state.model.seat_number} placeholder="" 
                            onChange={e => this.setValues(e, 'seat_number') } />
                        </div>
                    </div>
                </FormGroup>
                <Button color="primary" block onClick={this.create}> Save </Button>
            </Form>
        );
    }
}

class ListTicket extends Component {

    delete = (id) => {
        this.props.deleteTicket(id);
    }

    onEdit = (ticket) => {
        PubSub.publish('edit-ticket', ticket);
    }

    render() {
        const { tickets } = this.props;
        return (
            <Table className="table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Passanger National ID</th>
                        <th>Flight Number</th>
                        <th>Seat Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.passenger_national_id}</td>
                                <td>{ticket.flight_number}</td>
                                <td>{ticket.seat_number}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e => this.onEdit(ticket)}>Edit</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(ticket.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }   
}

export default class TicketBox extends Component {

    Url = 'http://localhost:3001/tickets';

    state = {
        tickets: [],
        message: {
            text: '',
            alert: ''
        }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(response => response.json())
            .then(tickets => this.setState({ tickets }))
            .catch(e => console.log(e));
    }

    save = (ticket) => {
        let data = {
            number: parseInt(ticket.number),
            departure_time: ticket.departure_time,
            arrival_time: ticket.arrival_time,
            origin: ticket.origin,
            destination: ticket.destination,
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
            .then(newTicket => {
                let { tickets } = this.state;
                tickets.push(newTicket);
                this.setState({ tickets, message: { text: 'Novo ticket adicionado com sucesso!', alert: 'success' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e)); 
        } else {
            // EDIT PRODUCT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedTicket => {
                let { tickets } = this.state;
                let position = tickets.findIndex(ticket => ticket.id === data.id);
                tickets[position] = updatedTicket;
                this.setState({ tickets, message: { text: 'Ticket atualizado com sucesso!', alert: 'info' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e)); 
        }
    }

    delete = (id) => {
        fetch(`${this.Url}/${id}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(rows => {
                const tickets = this.state.tickets.filter(ticket => ticket.id !== id);
                this.setState({ tickets,  message: { text: 'Ticket deletado com sucesso.', alert: 'danger' } });
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
                        <h2 className="font-weight-bold text-center"> Cadastro de Tickets </h2>
                        <FormTicket ticketCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Lista de Tickets </h2>
                        <ListTicket tickets={this.state.tickets}  deleteTicket={this.delete} />
                    </div>
                </div>
            </div>
        );
    }
}