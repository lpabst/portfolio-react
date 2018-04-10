import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Login.css'


class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }

        this.login = this.login.bind(this);
    }

    login(){
        axios.post('/api/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then( res => {
            console.log(res);
            if (!res.data){
                alert('unexpected error');
            }else{
                if (res.data.successful){
                    document.querySelector('a.hidden').click();
                }else if (res.data.message){
                    alert(res.data.message);
                }
            }
        })
        .catch(err => {});
    }

    render() {
        return (
            <section className='routeWrapper'>

                <div className='modal'>
                    <p>Username</p>
                    <input placeholder='Username' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                    <p>Password</p>
                    <input placeholder='Password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                    <button onClick={this.login} >Login</button>
                </div>

                <Link className='hidden' to='/admin'>Hidden Link to Admin page</Link>

            </section>
        );
    }
}


export default Login;