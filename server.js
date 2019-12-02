const express = require(`express`);
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const router = express.Router();
const { Position, Applicant, Manager } = require(`./bookshelf`);
const jsonify = a => a.toJSON();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(__dirname + '/view'));//stores all html files in view folder.
app.use('/', router);
var app = angular.module('app', [require('angular-ui-grid')]);

/*****Routes******/
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
});

router.get('/position', async function (req, res) {
    const positions = await Position.fetchAll().then(jsonify);
    res.json(positions);
});

router.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname + '/home.html'))
});

router.post(`/submit`, async (req, res) => {
    let data = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        emailAddress: req.body.email,
        jobTitle: req.body.position,
        resume: req.file || null
    };
    const new_app = await new Applicant(data).save();

    res.json({ app_id: new_app.id });
});

router.get('/loginM', function (req, res) {
    res.sendFile(path.join(__dirname + '/loginM.html'))
});

router.post(`/login`, function (req, res) {
    let username = req.body.user_name;
    let password = req.body.password;
    
    return Manager.where({ username }).fetch().then(function (found) {
        if (found) {
            console.log("username was found in the database")

            bcrypt.compare(password, found.get('password'), function (err, response) {
                if (response) {
                    console.log("password matches!")
                    res.sendFile(path.join(__dirname + '/dashboard.html'));
                } else {
                    console.log("password did not match!!!")
                    res.sendFile(path.join(__dirname + '/.html'));
                }
            })
        } else {
            console.log("username did not match!!!")
            res.sendFile(path.join(__dirname + '/signup.html'));
        }
    })
});

router.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname + '/signup.html'))
});
router.post(`/signup`, function (req, res) {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        var user = new Manager({ username: req.body.user_name, password: hash })
        user.save().then(function () {
            console.log("Successfully added " + req.body.user_name + " to the database!!")
            res.sendFile(path.join(__dirname + '/index.html'))
        });
    });
});
app.listen(3000, function () {
    console.log(`Listening on port 3000`);
});
