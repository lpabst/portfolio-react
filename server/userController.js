var app = require('./index.js');

module.exports = {
  isLoggedIn: (req, res) => {
    isLoggedIn = req.session.isLoggedIn || false;
    return res.status(200).send({isLoggedIn: isLoggedIn});
  },

  login: (req, res) => {
    var db = app.get('db');
    let {username, password} = req.body;
    db.login([username, password])
    .then( user => {
      console.log(user);
    })
    .catch(err=>{});
  },
  
  getProjects: function (req, res) {
    var db = app.get('db');
    db.getProjects()
    .then( projects => {
      console.log(projects);
    })
    .catch(err=>{});
  },
  
  addProject: (req, res) => {
    var db = app.get('db');
    
    // if (!req.session.isLoggedIn){
    //   return res.status(200).send({isLoggedIn: false, message: 'Must be logged in to use this feature'});
    // }
    
    let {newProjectDescription, newProjectImage, newProjectTitle, newProjectVideoLink} = req.body;
    console.log('adding project');
    console.log(newProjectTitle);
    db.addProject([newProjectDescription, newProjectImage, newProjectTitle, newProjectVideoLink])
    .then(result => {
      console.log('done');
      console.log(result);
    })
    .catch(err=>{});
  },
  
  updateProject: (req, res) => {
    var db = app.get('db');
    
    if (!req.session.isLoggedIn){
      return res.status(200).send({isLoggedIn: false, message: 'Must be logged in to use this feature'});
    }

    let {projectId, projectTitle, projectDescription, projectImage, projectVideoLink} = req.body;
    db.updateProject([projectId, projectTitle, projectDescription, projectImage, projectVideoLink])
    .then( result => {
      console.log(result);
    })
    .catch(err=>{});
  },
  
  deleteProject: (req, res) => {
    var db = app.get('db');

    if (!req.session.isLoggedIn){
      return res.status(200).send({isLoggedIn: false, message: 'Must be logged in to use this feature'});
    }

    let {projectId} = req.body;
    db.deleteProject([projectId])
    .then( result => {
      console.log(result);
    })
    .catch(err=>{});
  },
};
