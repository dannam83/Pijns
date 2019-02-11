const admin = require('firebase-admin');
const functions = require('firebase-functions');
const getUserFeed = require('./get_user_feed');
const serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pijns-dc1c1.firebaseio.com"
});

exports.getUserFeed = functions.https.onRequest(getUserFeed);
