
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './routes/Home/Home.jsx';
import Admin from './routes/Admin/Admin.jsx';


export default (
    <Switch>
        
        <Route component={ Home } path='/' exact />
        <Route component={ Home } path='/home' exact />
        <Route component={ Admin } path='/admin' exact />

    </Switch>
)
