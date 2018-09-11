class dbClass {

  constructor () {
    let admin = require("firebase-admin");
    this.FieldValue = require('firebase-admin').firestore.FieldValue;
    let serviceAccount = require('../../assets/chatwidget-abc-firebase-adminsdk-5ivff-602aa740ba.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://chatwidget-abc.firebaseio.com'
    });
    this.firestore = admin.firestore();
    let settings = {/* your settings... */ timestampsInSnapshots: true};
    this.firestore.settings(settings);
  }

  dbListener(){
    var doc = this.firestore.collection('main').doc('users');

    return doc.onSnapshot(docSnapshot => {
      console.log(docSnapshot.data());
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  getUser (pId) {
    let usersRef = this.firestore.collection('users');
    return usersRef.where("id", "==", pId).get()
      .then(snapshot => {
        let user = {};
        snapshot.forEach(doc => {
          user = doc.data();
        });
        return user;
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  getUsers () {
    let usersRef = this.firestore.collection('main').doc('users');
    usersRef.get()
      .then(users => {
        if (!users.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', users.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  addUser (pName, pUserId) {
    if (pUserId === undefined){
      pUserId = Date.now();
    }
    let users = this.firestore.collection("users").doc();
    users.set({name: pName, id: pUserId});
    return pUserId;
  }

  addConversation(pUserId){
    let conversations = this.firestore.collection("conversations").doc();
    conversations.set({id: Date.now(), userId: pUserId, messages: [] });
  }

  addMessage(pUserId, message, pType){
    let convRef = this.firestore.collection('conversations').where('userId','==',pUserId).orderBy('id','desc');
    return convRef.get()
      .then(snapshot => {
        let convData;
        snapshot.forEach(doc => {
          convData = doc.data();
          convData.messages.push({text: message, sender: pType, time: Date.now()});
          doc.ref.set(convData);
        });
        return message;
      })
      .catch(err => {
        this.addConversation(pUserId);
        this.addMessage(pUserId, message, pType);
      });
  }

  getDialog(pUserId){
    //this.FieldValue.serverTimestamp()
    let convRef = this.firestore.collection('conversations').where('userId','==',pUserId).orderBy('id','desc');
    return convRef.get()
      .then(snapshot => {
        let convData = {};
        snapshot.forEach(doc => {
          convData = doc.data();
        });
        return convData.messages.sort(function(a, b) {
          return a.time - b.time;
        });
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

}

module.exports.dbClass = dbClass;