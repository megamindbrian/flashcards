const fs = require('fs');
const functions = require('firebase-functions'),
    admin = require('firebase-admin');
const page = fs.readFileSync(__dirname + '/facebook-meta.html').toString();

exports.fb = functions.https.onRequest((req, res) => {
    if (req.query.fb) {
        return res.send(page.replace(/\{image}/ig, req.query.fb.replace(/[^a-z0-9_]/ig, '_')));
    }
});


