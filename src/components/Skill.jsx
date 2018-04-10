import React, { Component } from 'react';
import './Skill.css';

class Skill extends Component {
    render() {
        return (
            <div className='skill'>
                <img className='skillImage' src={this.props.image} alt={this.props.name} />
                <p>{this.props.name}</p>
            </div>
        );
    }
}


export default Skill;