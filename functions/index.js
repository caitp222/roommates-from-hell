const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// exports.helloWorld = functions.https.onRequest((request, response) => {
//
//   response.send("Hello from Firebase!");
// });

exports.makeUppercase = functions.database.ref('/households_practice')
    .onWrite(event => {
      const household = event.data.val();
      console.log("=======================================================================================")
      console.log(household);
      // Grab the current value of what was written to the Realtime Database.
      // const original = event.data.val();
      // console.log('Uppercasing', event.params.pushId, original);
      // const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      // return event.data.ref.parent.child('uppercase').set(uppercase);
    });
