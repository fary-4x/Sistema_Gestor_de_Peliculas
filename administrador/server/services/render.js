const axios = require('axios');
const querystring = require('querystring');


exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        res.render('principal', { users : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
    }

exports.index = (req, res) => {

    const search = req.query?.search ? `?search=${req.query?.search}` : '';

    axios.get(`http://localhost:3000/api/users${search}`)
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
    }

exports.Login = (req, res) =>{
    res.render('Login');
}


exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
    .then(function(userdata){
        res.render("update_user", { user : userdata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}