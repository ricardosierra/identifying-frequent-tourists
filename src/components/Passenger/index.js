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

class FormPassenger extends Component {

    state = { 
        model: { 
            national_id: 0, 
            departure_time: '',
            title: 0, 
            gender: 0 
        } 
    };

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({ model });
    }

    create = () => {
        this.setState({ model: { national_id: 0, title: 0, gender: 0 } })
        this.props.passengerCreate(this.state.model);
    }

    componentWillMount() {
        PubSub.subscribe('edit-passenger', (topic, passenger) => {
            this.setState({ model: passenger });
        });
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="title">Name:</Label>
                    <Input national_id="title" type="text" value={this.state.model.title} placeholder="Name"
                    onChange={e => this.setValues(e, 'title') } />
                </FormGroup>
                <FormGroup>
                    <Label for="gender">Gender:</Label>
                    <Input national_id="gender" type="text" value={this.state.model.gender} placeholder="Gender"
                    onChange={e => this.setValues(e, 'gender') } />
                </FormGroup>
                <Button color="primary" block onClick={this.create}> Save </Button>
            </Form>
        );
    }
}

class ListPassenger extends Component {

    delete = (national_id) => {
        this.props.deletePassenger(national_id);
    }

    onEdit = (passenger) => {
        PubSub.publish('edit-passenger', passenger);
    }

    render() {
        const { passengers } = this.props;
        return (
            <Table className="table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        passengers.map(passenger => (
                            <tr key={passenger.national_national_id}>
                                <td>{passenger.national_national_id}</td>
                                <td>{passenger.title}</td>
                                <td>{passenger.gender}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e => this.onEdit(passenger)}>Edit</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(passenger.national_id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }   
}

export default class PassengerBox extends Component {

    Url = 'http://localhost:3001/passengers';

    state = {
        passengers: [],
        message: {
            text: '',
            alert: ''
        }
    }

    componentDnational_idMount() {
        fetch(this.Url)
            .then(response => response.json())
            .then(passengers => this.setState({ passengers }))
            .catch(e => console.log(e));
    }

    save = (passenger) => {
        let data = {
            national_national_id: parseInt(passenger.national_national_id),
            departure_time: passenger.departure_time,
            arrival_time: passenger.arrival_time,
            title: passenger.title,
            gender: passenger.gender,
        };
        console.log(data);

        const requestInfo = {
            method: data.national_id !== 0? 'PUT': 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        if(data.national_id === 0) {
            // CREATE NEW PRODUCT
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newPassenger => {
                let { passengers } = this.state;
                passengers.push(newPassenger);
                this.setState({ passengers, message: { text: 'Novo passageiro adicionado com sucesso!', alert: 'success' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e)); 
        } else {
            // EDIT PRODUCT
            fetch(`${this.Url}/${data.national_id}`, requestInfo)
            .then(response => response.json())
            .then(updatedPassenger => {
                let { passengers } = this.state;
                let position = passengers.findIndex(passenger => passenger.national_id === data.national_id);
                passengers[position] = updatedPassenger;
                this.setState({ passengers, message: { text: 'Passageiro atualizado com sucesso!', alert: 'info' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e)); 
        }
    }

    delete = (national_id) => {
        fetch(`${this.Url}/${national_id}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(rows => {
                const passengers = this.state.passengers.filter(passenger => passenger.national_id !== national_id);
                this.setState({ passengers,  message: { text: 'Passageiro deletado com sucesso.', alert: 'danger' } });
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
                        <h2 className="font-weight-bold text-center"> Cadastro de passageiros </h2>
                        <FormPassenger passengerCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Lista de passageiros </h2>
                        <ListPassenger passengers={this.state.passengers}  deletePassenger={this.delete} />
                    </div>
                </div>
            </div>
        );
    }
}