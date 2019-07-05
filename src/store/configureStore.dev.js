import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import reducer from './ducks/reducers';


export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(promise),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./ducks/reducers', () => {
      const nextReducer = require('./ducks/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}