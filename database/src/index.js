//import { dbClass } from './classes/dbClass.js';
let dbClass = require("./classes/dbClass.js");

let q = new dbClass.dbClass();

q.getUser(3).then(e => {
  console.log(e);
})

q.addMessage(1, 'test', {type:'manager', name: "Inav Ivanov"}).then(e => {
  console.log(e);
})

// q.getDialog(1).then(e => {
//   console.log(e);
// })

