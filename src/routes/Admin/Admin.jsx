import React, { Component } from 'react';
import './Admin.css'

import axios from 'axios';
import Project from './../../components/Project.jsx';


class Admin extends Component {

    constructor(props){
        super(props);
        this.state = {
            projects: [
                {
                    title: 'Chess',
                    description: 'Full chess game built from scratch in React. I also built a chess engine AI that will verse the player. The more difficult levels of my chess engine AI tie into the Stockfish chess engine AI.',
                    image: 'http://www.rdc.pl/wp-content/uploads/2016/07/szachy-700x342.jpg',
                    videoLink: 'https://www.youtube.com/watch?v=Pw-0pbY9JeU',
                },
                {
                    title: 'Facebook Messenger Clone',
                    description: 'A clone of the Facebook messenger app, complete with web sockets, a contacts list, and your most recent conversations with each contact.',
                    images: 'https://sa.kapamilya.com/absnews/abscbnnews/media/2017/news/01/19/facebook-01917.jpg',
                    videoLink: '',
                },
                {
                    title: 'Facebook Messenger Clone',
                    description: 'A clone of the Facebook messenger app, complete with web sockets, a contacts list, and your most recent conversations with each contact.',
                    images: 'https://sa.kapamilya.com/absnews/abscbnnews/media/2017/news/01/19/facebook-01917.jpg',
                    videoLink: '',
                },
            ]
        }

    }

    componentDidMount(){
        axios.get('/api/isLoggedIn')
        .then( response=> {
            console.log(response);
        })
        axios.post('/api/getProjects')
        .then( res => {
            console.log(res);
        })
        .catch(err=>{console.log(err)});
    }

    render() {
        return (
            <section className='routeWrapper admin'>
                <div className='projectsSection'>
                    <p className='projectsWrapperHeader' >Projects</p>
                    <div className='projectsContainer'>
                        <div className='addProject'>
                            <p>+ Add New</p>
                        </div>
                        {
                            this.state.projects.map( (item, i) => {
                                return <Project project={item} key={i} />
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }
}


export default Admin;