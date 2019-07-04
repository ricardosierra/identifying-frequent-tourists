import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';


// Featured
import Index from './pages/Index';
import Flights from './pages/Flights';
import Passengers from './pages/Passengers';
import Tickets from './pages/Tickets';
import NotFound from './pages/404';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Header title="App" />
                <Router basename={BASE_PATH}>
                    <Switch>
                    <Route exact path="/" component={Index} />
                    <Route path="/flights" component={Flights} />
                    <Route path="/passengers" component={Passengers} />
                    <Route path="/tickets" component={Tickets} />
                    {/* Only useful in development mode */}
                    <Route component={NotFound} status={404} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
