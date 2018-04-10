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
            projectToDelete: null,
            showEditModal: false,
            projectId: '',
            projectTitle: '',
            projectDescription: '',
            projectImage: '',
            projectVideoLink: '',
            showAddNewModal: false,
        }

        this.toggleAreYouSureModal = this.toggleAreYouSureModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
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

    toggleAreYouSureModal(projectIndex){
        this.setState({
            showAreYouSureModal: !this.state.showAreYouSureModal,
            projectToDelete: projectIndex,
        })
    }

    toggleEditModal(index){
        if (this.state.showEditModal){
            this.setState({
                showEditModal: false
            })
        }else{
            let project = this.state.projects[index];
            this.setState({
                showEditModal: true,
                projectId: project.id,
                projectTitle: project.title,
                projectDescription: project.description,
                projectImage: project.image,
                projectVideoLink: project.videoLink
            })
        }
    }

    updateProject(){
        let {projectId, projectTitle, projectDescription, projectImage, projectVideoLink} = this.state;
        axios.post('/api/updateProject', {projectId, projectTitle, projectDescription, projectImage, projectVideoLink})
        .then( res => {
            console.log(res);
            // clear state
        })
        .catch(err=>{});
    }

    deleteProject(){
        let projectId = this.state.projects[this.state.projectToDelete].id;
        axios.post('/api/delete', {
            projectId: projectId
        })
        .then( res => {
            console.log(res);
            // clear state
        })
        .catch(err=>{});
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
                                return <Project project={item} key={i} toggleAreYouSureModal={this.toggleAreYouSureModal} editProject={this.toggleEditModal} index={i} />
                            })
                        }
                    </div>
                </div>

                { this.state.showAddNewModal &&
                    <div className={`addNewModal modal`}>
                        
                    </div>
                }

                { this.state.showEditModal &&
                    <div className={`editModal modal`}>>
                        <input value={this.state.projectTitle} onChange={(e) => this.setState({projectTitle: e.target.value})} />
                        <input value={this.state.projectDescription} onChange={(e) => this.setState({projectDescription: e.target.value})} />
                        <input value={this.state.projectImage} onChange={(e) => this.setState({projectImage: e.target.value})} />
                        <input value={this.state.projectVideoLink} onChange={(e) => this.setState({projectVideoLink: e.target.value})} />
                        <button onClick={this.updateProject} >Save</button>
                    </div>
                }

                { this.state.showAreYouSureModal &&
                    <div className={`areYouSureModal modal`}>
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