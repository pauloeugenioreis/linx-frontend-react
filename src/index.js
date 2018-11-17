import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppVitrine from './components/Vitrine/App';

ReactDOM.render(<AppVitrine api="/json/challenge.json" />, document.getElementById('container'));
