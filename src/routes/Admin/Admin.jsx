import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Admin.css'

import Project from './../../components/Project.jsx';


class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [{}],
            showAreYouSureModal: false,
            projectToDelete: null,
            showEditModal: false,
            projectId: '',
            projectTitle: '',
            projectDescription: '',
            projectImage: '',
            projectLink: '',
            projectVideoLink: '',
            showAddNewModal: false,
            newProjectTitle: '',
            newProjectDescription: '',
            newProjectImage: '',
            newProjectLink: '',
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
                projectLink: project.projectlink,
                projectVideoLink: project.videolink
            })
        }
    }

    addNewProject() {
        let { newProjectDescription, newProjectImage, newProjectTitle, newProjectVideoLink, newProjectLink } = this.state;
        axios.post('/api/addProject', { newProjectDescription, newProjectImage, newProjectTitle, newProjectVideoLink, newProjectLink })
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
        let { projectId, projectTitle, projectDescription, projectImage, projectVideoLink, projectLink } = this.state;
        axios.post('/api/updateProject', { projectId, projectTitle, projectDescription, projectImage, projectVideoLink, projectLink })
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
                                return <Project project={item} key={i} toggleAreYouSureModal={this.toggleAreYouSureModal} editProject={this.toggleEditModal} index={i} controls={true}  />
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
                        <p style={{ fontSize: '10px' }}>PROJECT LINK</p>
                        <input placeholder='Project Link URL' value={this.state.newProjectLink} onChange={(e) => this.setState({ newProjectLink: e.target.value })} />
                        <p style={{ fontSize: '10px' }}>VIDEO WALKTHROUGH LINK</p>
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
                        <input placeholder='image URL' value={this.state.projectImage} onChange={(e) => this.setState({projectImage: e.target.value })} />
                        <p style={{ fontSize: '10px' }}>PROJECT LINK</p>
                        <input placeholder='Project Link URL' value={this.state.projectLink} onChange={(e) => this.setState({projectLink: e.target.value })} />
                        <p style={{ fontSize: '10px' }}>VIDEO WALKTHROUGH LINK</p>
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