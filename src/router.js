
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './routes/Home/Home.jsx';
import Admin from './routes/Admin/Admin.jsx';
import Login from './routes/Login/Login.jsx';


export default (
    <Switch>
        
        <Route component={ Home } path='/' exact />
        <Route component={ Home } path='/home' exact />
        <Route component={ Admin } path='/admin' exact />
        <Route component={ Login } path='/login' exact />
        <Route component={ Login } path='/signin' exact />

    </Switch>
)
