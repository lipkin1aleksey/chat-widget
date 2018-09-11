//import { dbClass } from './classes/dbClass.js';
let dbClass = require("./classes/dbClass.js");

let q = new dbClass.dbClass();

q.getUser(1).then(e => {
  console.log(e);
})

q.getDialog(1).then(e => {
  console.log(e);
})