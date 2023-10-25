const axios = require('axios')
const { response } = require('express')

exports.homeRoutes = (req, res)=>{
    axios.get(process.env.HOME_ROUTE).then(function(response){
    res.render('index', {users: response.data})
    }).catch(err => {
        res.send(err)
    })
}

exports.add_user = (req, res)=>{
    res.render('addUser')
}

exports.update_user = (req, res)=>{
    axios.get(process.env.HOME_ROUTE, {params: {id: req.query.id}})
    .then(function(userdata){
        res.render("updateUser", {user: userdata.data})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.delete_user = (req, res)=>{
    let id = req.query.id
    let url = process.env.MOD_HOME_ROUTE+"%s"
    url = String.format(url, id)
    axios.delete(url)
    .then(
        res.redirect("/")).catch(function (err) {
        console.log(err);
    });
}
exports.error=(req,res)=>{
    res.render("error.ejs");
}
