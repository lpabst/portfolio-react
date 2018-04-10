import React, { Component } from 'react';
import './Project.css'


class Project extends Component {
    render() {
        let {project, index} = this.props;
        return (
            <section className='projectWrapper'>

                <p className='projectTitle' >{project.title}</p>

                <div className='projectImageWrapper'>
                    <img src={project.image} alt={project.title} className='projectImage' />
                </div>

                <p className='projectDescription' >{project.description}</p>
                <p className='projectDescription'>Project Link: <span><a target='_blank' href={`http://${project.projectlink}`}>{project.projectlink}</a></span></p>
                {(project.video || this.props.controls) && <p className='projectDescription'>Video Walkthrough: {project.video}</p>}

                { this.props.controls && 
                    <div className='projectButtons'>
                        <button onClick={() => this.props.toggleAreYouSureModal(index)} >Delete</button>
                        <button onClick={() => this.props.editProject(index)} >Edit</button>
                    </div>
                }
                
            </section>
        );
    }
}


export default Project;