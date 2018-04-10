import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Admin.css'

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
            newProjectTitle: '',
            newProjectDescription: '',
            newProjectImage: '',
            newProjectVideoLink: '',
        }

        this.getProjects = this.getProjects.bind(this);
        this.closeAllModals = this.closeAllModals.bind(this);
        this.toggleAddNewModal = this.toggleAddNewModal.bind(this);
        this.toggleAreYouSureModal = this.toggleAreYouSureModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.addNewProject = this.addNewProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    componentDidMount() {
        // check to see if the user is logged in
        axios.get('/api/isLoggedIn')
            .then(response => {
                if (!response.data.isLoggedIn) {
                    document.querySelector('a.hidden').click();
                } else {
                    // if the user is logged in as an admin, get the projects for them to see/edit
                    this.getProjects();
                }

            })
            .catch(err => { console.log(err) });
    }

    getProjects(){
        axios.post('/api/getProjects')
            .then(res => {
                this.setState({
                    projects: res.data.projects
                })
            })
            .catch(err => { console.log(err) });
    }

    closeAllModals() {
        this.setState({
            showAddNewModal: false,
            showAreYouSureModal: false,
            showEditModal: false,
        })
    }

    toggleAddNewModal() {
        this.setState({
            showAddNewModal: !this.state.showAddNewModal,
            showAreYouSureModal: false,
            showEditModal: false,
        })
    }

    toggleAreYouSureModal(projectIndex) {
        this.setState({
            showAreYouSureModal: !this.state.showAreYouSureModal,
            showAddNewModal: false,
            showEditModal: false,
            projectToDelete: projectIndex,
        })
    }

    toggleEditModal(index) {
        if (this.state.showEditModal) {
            this.setState({
                showEditModal: false,
                showAddNewModal: false,
                showAreYouSureModal: false,
            })
        } else {
            let project = this.state.projects[index];
            this.setState({
                showEditModal: true,
                showAddNewModal: false,
                showAreYouSureModal: false,
                projectId: project.id,
                projectTitle: project.title,
                projectDescription: project.description,
                projectImage: project.image,
                projectVideoLink: project.videoLink
            })
        }
    }

    addNewProject() {
        let { newProjectDescription, newProjectImage, newProjectTitle, newProjectVideoLink } = this.state;
        axios.post('/api/addProject', { newProjectDescription, newProjectImage, newProjectTitle, newProjectVideoLink })
            .then(res => {
                if (!res.data) {
                    console.log(res);
                    alert('unexpected error');
                }
                else if (res.data.message) {
                    alert(res.data.message);
                }

                this.setState({
                    showAddNewModal: false,
                    newProjectTitle: '',
                    newProjectDescription: '',
                    newProjectImage: '',
                    newProjectVideoLink: '',
                })
            })
            .catch(err => { });
    }

    updateProject() {
        let { projectId, projectTitle, projectDescription, projectImage, projectVideoLink } = this.state;
        axios.post('/api/updateProject', { projectId, projectTitle, projectDescription, projectImage, projectVideoLink })
            .then(res => {
                if (!res.data) {
                    console.log(res);
                    alert('unexpected error');
                }
                else if (res.data.message) {
                    alert(res.data.message);
                }

                this.setState({
                    showEditModal: false,
                    projectId: '',
                    projectTitle: '',
                    projectDescription: '',
                    projectImage: '',
                    projectVideoLink: '',
                })
            })
            .catch(err => { });
    }

    deleteProject() {
        let projectId = this.state.projects[this.state.projectToDelete].id;
        axios.post('/api/deleteProject', { projectId })
            .then(res => {
                if (!res.data) {
                    console.log(res);
                    alert('unexpected error');
                }
                else if (res.data.successful){
                    this.getProjects();
                }
                else if (res.data.message) {
                    alert(res.data.message);
                }

                this.setState({
                    showAreYouSureModal: false,
                    projectToDelete: null,
                })
            })
            .catch(err => { });
    }

    render() {
        return (
            <section className='routeWrapper admin'>

                <div className='projectsSection'>
                    <p className='projectsWrapperHeader' >Projects</p>
                    <div className='projectsContainer'>
                        <div className='addProject' onClick={this.toggleAddNewModal} >
                            <p>+ Add New</p>
                        </div>
                        {
                            this.state.projects.map((item, i) => {
                                return <Project project={item} key={i} toggleAreYouSureModal={this.toggleAreYouSureModal} editProject={this.toggleEditModal} index={i} />
                            })
                        }
                    </div>
                </div>

                {this.state.showAddNewModal &&
                    <div className={`modal`}>
                        <p style={{ fontSize: '10px' }}>TITLE</p>
                        <p className='closeX' onClick={this.closeAllModals}>x</p>
                        <input placeholder='Title' value={this.state.newProjectTitle} onChange={(e) => this.setState({ newProjectTitle: e.target.value })} />
                        <p style={{ fontSize: '10px' }}>DESCRIPTION</p>
                        <textarea placeholder='Description' value={this.state.newProjectDescription} onChange={(e) => this.setState({ newProjectDescription: e.target.value })} />
                        <p style={{ fontSize: '10px' }}>IMAGE</p>
                        <input placeholder='Image URL' value={this.state.newProjectImage} onChange={(e) => this.setState({ newProjectImage: e.target.value })} />
                        <p style={{ fontSize: '10px' }}>VIDEO</p>
                        <input placeholder='Video Link URL' value={this.state.newProjectVideoLink} onChange={(e) => this.setState({ newProjectVideoLink: e.target.value })} />
                        <button onClick={this.addNewProject} >Add New</button>
                    </div>
                }

                {this.state.showEditModal &&
                    <div className={`modal`}>
                        <p className='closeX' onClick={this.closeAllModals}>x</p>
                        <p style={{ fontSize: '10px' }}>TITLE</p>
                        <input placeholder='Title' value={this.state.projectTitle} onChange={(e) => this.setState({ projectTitle: e.target.value })} />
                        <p style={{ fontSize: '10px' }}>DESCRIPTION</p>
                        <textarea placeholder='Description' value={this.state.projectDescription} onChange={(e) => this.setState({ projectDescription: e.target.value })} />
                        <p style={{ fontSize: '10px' }}>IMAGE</p>
                        <input placeholder='image URL' value={this.state.projectImage} onChange={(e) => this.setState({ projectImage: e.target.value })} />
                        <p style={{ fontSize: '10px' }}>VIDEO</p>
                        <input placeholder='Video Link URL' value={this.state.projectVideoLink} onChange={(e) => this.setState({ projectVideoLink: e.target.value })} />
                        <button onClick={this.updateProject} >Update</button>
                    </div>
                }

                {this.state.showAreYouSureModal &&
                    <div className={`modal`}>
                        <p className='closeX' onClick={this.closeAllModals}>x</p>
                        <p>Do you really want to delete this project? This cannot be undone.</p>
                        <button onClick={() => this.deleteProject()} >Yes</button>
                        <button onClick={() => this.toggleAreYouSureModal()} >No</button>
                    </div>
                }

                <Link className='hidden' to='/login'>Hidden Login Link</Link>

            </section>
        );
    }
}


export default Admin;