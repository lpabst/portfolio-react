import React, { Component } from 'react';
import './Admin.css'

import axios from 'axios';
import Project from './../../components/Project.jsx';


class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [
                {
                    id: 0,
                    title: 'Chess',
                    description: 'Full chess game built from scratch in React. I also built a chess engine AI that will verse the player. The more difficult levels of my chess engine AI tie into the Stockfish chess engine AI.',
                    image: 'http://www.rdc.pl/wp-content/uploads/2016/07/szachy-700x342.jpg',
                    videoLink: 'https://www.youtube.com/watch?v=Pw-0pbY9JeU',
                },
                {
                    id: 1,
                    title: 'Facebook Messenger Clone',
                    description: 'A clone of the Facebook messenger app, complete with web sockets, a contacts list, and your most recent conversations with each contact.',
                    image: 'https://i.guim.co.uk/img/media/322719401053edcb22d42f01c4c7eb5c6b68867f/0_405_4126_2476/master/4126.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=b8630c397d66ec01a6b71cfc5af0074c',
                    videoLink: '',
                },
                {
                    id: 2,
                    title: 'Test 3rd Project',
                    description: 'A clone of the Facebook messenger app, complete with web sockets, a contacts list, and your most recent conversations with each contact.',
                    image: 'https://www.ptotoday.com/images/articles/fullsize/0216-make-family-tech-talk-night-fun-fullsize.jpg',
                    videoLink: '',
                },
            ],
            showAreYouSureModal: false,
            showEditModal: false,
            showAddNewModal: false,
        }

    }

    componentDidMount() {
        axios.get('/api/isLoggedIn')
            .then(response => {
                console.log(response);
            })
        axios.post('/api/getProjects')
            .then(res => {
                console.log(res);
            })
            .catch(err => { console.log(err) });
    }

    toggleAreYouSureModal(){
        this.setState({
            showAreYouSureModal: !this.state.showAreYouSureModal
        })
    }

    toggleEditModal(){
        this.setState({
            showEditModal: !this.state.showEditModal
        })
    }

    deleteProject(projectId){
        axios.post('/api/delete', {
            projectId: projectId
        })
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
                            this.state.projects.map((item, i) => {
                                return <Project project={item} key={i} toggleAreYouSureModal={this.toggleAreYouSureModal} editProject={this.toggleEditModal} />
                            })
                        }
                    </div>
                </div>

                { this.state.showAddNewModal &&
                    <div className='addNewModal'>
                        
                    </div>
                }

                { this.state.showEditModal &&
                    <div className='editModal'>
                        
                    </div>
                }

                { this.state.showAreYouSureModal &&
                    <div className='areYouSureModal'>
                        <p>Do you really want to delete this project? This cannot be undone.</p>
                        <button onClick={() => this.deleteProject()} >Yes</button>
                        <button onClick={() => this.toggleAreYouSureModal()} >No</button>
                    </div>
                }

            </section>
        );
    }
}


export default Admin;