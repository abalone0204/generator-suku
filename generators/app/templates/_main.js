require('../static/stylesheets/style.scss');
import React from 'react';
import {render} from 'react-dom';
import Hello from './components/Hello';
render(<Hello />, 
        document.getElementsByClassName('container')[0]
        );