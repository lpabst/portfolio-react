import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>
                <p className='headerLogo'>LP</p>
                <ul className='nav'>
                    <li>Projects</li>
                    <li>Skills</li>
                    <li>About</li>
                </ul>
            </header>
        );
    }
}

export default Header;