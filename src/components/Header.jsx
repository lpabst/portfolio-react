import React, { Component } from 'react';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    scrollTo(selector){
        document.querySelector(selector).scrollIntoView();
        let newScroll = window.scrollY - 60;
        window.scrollTo(0, newScroll);
    }

    render() {
        return (
            <header>
                <p className='headerLogo' onClick={()=> window.scrollTo(0,0)} >LP</p>
                <ul className='nav'>
                    <li onClick={()=> this.scrollTo('.projectsSectionOuter')} >Projects</li>
                    <li onClick={()=> this.scrollTo('.skillsSection')} >Skills</li>
                    <li onClick={()=> this.scrollTo('.aboutSection')} >About</li>
                </ul>
            </header>
        );
    }
}

export default Header;