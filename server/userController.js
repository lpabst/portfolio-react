var app = require('./index.js');

module.exports = {
  login: (req, res) => {
    var db = app.get('db');
    let {username, password} = req.body;
    db.login([username, password])
    .then( user => {
      console.log(user);
    })
    .catch(err=>{});
  },

  isLoggedIn: (req, res) => {
    return res.status(200).send({isLoggedIn: req.session.isLoggedIn});
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

    if (!req.session.isLoggedIn){
      return res.status(200).send({isLoggedIn: false, message: 'Must be logged in to use this feature'});
    }
  },
  
  updateProject: (req, res) => {
    var db = app.get('db');

    if (!req.session.isLoggedIn){
      return res.status(200).send({isLoggedIn: false, message: 'Must be logged in to use this feature'});
    }
  },
  
  deleteProject: (req, res) => {
    var db = app.get('db');

    if (!req.session.isLoggedIn){
      return res.status(200).send({isLoggedIn: false, message: 'Must be logged in to use this feature'});
    }
  },
};
