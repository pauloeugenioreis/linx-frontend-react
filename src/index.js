import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppVitrine from './components/Vitrine/App';


ReactDOM.render(<AppVitrine api="https://api.myjson.com/bins/oyc02" />, document.getElementById('container'));