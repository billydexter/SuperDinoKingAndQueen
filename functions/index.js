
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();

var db = firebase.firestore();
var itemsRef = db.collection('items');

app.post('/api/register', async (req, res) => {
    try
    {
        //Make sure the parameters are passed in correctly.
        let username = req.body.username;
        let password = req.body.password;
        console.log(username);
        console.log(password);
        //Throw an error if either parameter is blank.
        if (username === "")
        {
            res.status(400).send("Please include a username.");
            return;
        }
        if (password === "")
        {
            res.status(400).send("Please include a password");
            return;
        }
        console.log("got into the server...");
        let querySnapshot = await itemsRef.get();
        console.log(itemsRef.doc(username));
        let array = querySnapshot.docs.map(doc => doc.data())
        for (var i = 0; i < array.length; i++)
        {
            let checkUsername = array[i].username;
            let checkPassword = array[i].password;
            console.log(i);
            console.log(checkUsername);
            console.log(checkPassword);
            if (checkUsername === username)
            {
                res.status(400).send("That user already exists");
                return;
            }
        }
        let user = {
          username: username,
          password: password
        }
        itemsRef.doc(user.username).set(user);
        res.sendStatus(200);
    }
    catch(err)
    {
        res.sendStatus(500);
    }
});

app.post('/api/login/', async (req, res) => {
    try
    {
        //First, make sure the username and password are passed within the params.
        console.log(req.body);
        let username = req.body.username;
        let password = req.body.password;
        if (username === "")
        {
            res.status(400).send("Please include a username.");
            return;
        }
        if (password === "")
        {
            res.status(400).send("Please include a password");
            return;
        }
        let querySnapshot = await itemsRef.get();
        let array = querySnapshot.docs.map(doc => doc.data())
        let correctCredentials = false;
        for (var i = 0; i < array.length; i++)
        {
            let checkUsername = array[i].username;
            let checkPassword = array[i].password;
            console.log(i);
            console.log(checkUsername);
            console.log(checkPassword);
            if ((checkUsername === username) && (checkPassword === password))
            {
                correctCredentials = true;
            }
        }
        console.log("yee");
        if (!correctCredentials)
        {
          res.status(400).send("Wrong Credentials");
          return;
        }
        //Throw an error if the password doesn't match the one in the database.
        res.sendStatus(200);
    }
    catch(err)
    {
        res.sendStatus(500);
    }
});

app.post('/api/delete', async (req, res) =>
{
	try
    {
        let username = req.body.username;
        let password = req.body.password;
        if (username === "")
        {
            res.status(400).send("Please include a username.");
            return;
        }
        if (password === "")
        {
            res.status(400).send("Please include a password");
            return;
        }
        let querySnapshot = await itemsRef.get();
        let array = querySnapshot.docs.map(doc => doc.data())
        let correctCredentials = false;
        for (var i = 0; i < array.length; i++)
        {
            let checkUsername = array[i].username;
            let checkPassword = array[i].password;
            console.log(i);
            console.log(checkUsername);
            console.log(checkPassword);
            if ((checkUsername === username) && (checkPassword === password))
            {
                correctCredentials = true;
            }
        }
        console.log("yee");
        if (!correctCredentials)
        {
          res.status(400).send("Wrong Credentials");
          return;
        }
        itemsRef.doc(username).delete();
        //Throw an error if the password doesn't match the one in the database.
        res.sendStatus(200);
    }
    catch(err)
    {
        res.sendStatus(500);
    }
});

app.post('/api/edit', async (req, res) =>
{
    try
    {
        //Check that the new password is not nothing.
        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        console.log(username);
        console.log(oldPassword);
        console.log(newPassword);
        if (username === "")
        {
            res.status(400).send("Please include a username.");
            return;
        }
        if (oldPassword === "")
        {
            res.status(400).send("Please include a password");
            return;
        }
        if (newPassword === "")
        {
            res.status(400).send("Please enter in a new password.");
            return;
        }
        let querySnapshot = await itemsRef.get();
        let array = querySnapshot.docs.map(doc => doc.data());
        var index = -1;
        for (var i = 0; i < array.length; i++)
        {
            let checkUsername = array[i].username;
            let checkPassword = array[i].password;
            console.log(i);
            console.log(checkUsername);
            console.log(checkPassword);
            console.log(username);
            console.log(oldPassword);
            if ((checkUsername === username) && (checkPassword === oldPassword))
            {
                index = i;
            }
        }
        if (index === -1)
        {
          res.status(400).send("Wrong Credentials");
          return;
        }
        let user = {
          username: username,
          password: newPassword
        }
        itemsRef.doc(user.username).set(user);
        res.sendStatus(200);
    }
    catch(err)
    {
        res.sendStatus(500);
    }
});
exports.app = functions.https.onRequest(app);