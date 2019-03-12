import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Apollo config
//import ApolloClient from "apollo-boost";
//export default client = new ApolloClient({
//   uri: 'http://localhost:3000/root'
//});