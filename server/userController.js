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
      if (!user[0]){
        req.session.user = {};
        req.session.isLoggedIn = false;
        return res.status(200).send({successful: false, message: 'Wrong username or password'});
      }else{
        req.session.user = user[0];
        req.session.isLoggedIn = true;
        return res.status(200).send({successful: true, message: 'Successful login'});
      }
    })
    .catch(err=>{});
  },
  
  getProjects: function (req, res) {
    var db = app.get('db');
    db.getProjects()
    .then( projects => {
      let data = {
        isLoggedIn: req.session.isLoggedIn || false,
        projects: projects,
        message: 'Found the projects'
      }
      return res.status(200).send(data);
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
      return res.status(200).send({successful: true, message: 'Successfully edited the project info in the db'});
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
      return res.status(200).send({successful: true, message: 'Successfully deleted project from db'});
    })
    .catch(err=>{});
  },
};
