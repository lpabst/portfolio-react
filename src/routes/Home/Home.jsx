import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Home.css'

import Header from './../../components/Header.jsx';
import Project from './../../components/Project.jsx';
import Skill from './../../components/Skill.jsx';
import Footer from './../../components/Footer.jsx';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      skills: [
        {name: 'React', image: 'https://github.com/lpabst/portfolio/blob/master/public/img/react_img.png?raw=true'},
        {name: 'JavaScript', image: 'https://github.com/lpabst/portfolio/blob/master/public/img/javascript_img.png?raw=true'},
        {name: 'Node', image: 'https://github.com/lpabst/portfolio/blob/master/public/img/node_img.jpeg?raw=true'},
        {name: 'SQL', image: 'https://github.com/lpabst/portfolio/blob/master/public/img/sql_img.png?raw=true'},
        {name: 'HTML5', image: 'https://github.com/lpabst/portfolio/blob/master/public/img/html_img.png?raw=true'},
        {name: 'CSS', image: 'https://github.com/lpabst/portfolio/blob/master/public/img/css_img.png?raw=true'},
        {name: 'Git', image: 'https://github.com/lpabst/portfolio/blob/master/public/img/git_img.png?raw=true'},
        {name: 'JQuery', image: 'https://github.com/lpabst/portfolio/blob/master/public/img/jquery_img.png?raw=true'},
        {name: 'Angular', image: 'https://github.com/lpabst/portfolio/blob/master/public/img/angluar_img.png?raw=true'},
      ]
    }

    this.changeHeaderCss = this.changeHeaderCss.bind(this);
    this.getProjects = this.getProjects.bind(this);
  }

  componentDidMount() {
    this.getProjects();
    window.scrollTo(0,0);
    window.addEventListener("scroll", this.changeHeaderCss, false);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.changeHeaderCss);
  }

  changeHeaderCss(){
    let scrollAmt = window.scrollY;
    if (scrollAmt >= 60){
      document.querySelector('header').style.background = '#111';
    }else{
      document.querySelector('header').style.background = 'none';
    }
  }

  getProjects() {
    axios.post('/api/getProjects')
      .then(res => {
        this.setState({
          projects: res.data.projects
        })
      })
      .catch(err => { console.log(err) });
  }

  render() {
    return (
      <section className='routeWrapper'>

        <Header />

        <section className='home_landing_section'>
          <div className='home_landing_content'>
            <h1>LOREN PABST</h1>
            <h3>Web Developer</h3>
          </div>
          <Link className='adminLogin' to='/admin'></Link>
        </section>

        <section className='projectsSectionOuter'>
          <section className='projectsSection'>
            <p className='homeSectionHeader' >Recent Projects</p>
            <div className='projectsContainer'>
              {
                this.state.projects.map((item, i) => {
                  return <Project project={item} key={i} toggleAreYouSureModal={this.toggleAreYouSureModal} editProject={this.toggleEditModal} index={i} controls={false} />
                })
              }
            </div>
          </section>
        </section>

        <section className='skillsSection'>
          <p className='homeSectionHeader'>Skills & Qualifications</p>
          <section className='skillsSectionInner'>
            {
              this.state.skills.map( (item, i) => {
                return <Skill name={item.name} image={item.image} key={i} />
              })
            }
          </section>
        </section>

        <section className='aboutSection'>
          <p className='homeSectionHeader'>About Me</p>
          <div className='aboutPhoto' >
            <img className='aboutPhoto' src='https://github.com/lpabst/portfolio/blob/master/public/img/headshot_img.jpg?raw=true' alt='headshot photo' />
          </div>
          <p className='aboutContent'>
            I'm an avid programmer and developer, with a love for all things tech. I live in the Northern Utah area with my wife and two cats. I have a bachelor's degree from Utah State University (Go Aggies!) and a coding certificate from DevMountain. I enjoy coding, exercising, reading, and seeing new places! 
          </p>
        </section>

        <Footer />

      </section>
    );
  }
}


export default Home;