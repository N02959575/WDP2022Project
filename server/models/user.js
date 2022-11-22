// //"database" as object literal
// const users = [//id, username, fname, lname, password
//     {
//       userId: 12345,
//       username: "coke",
//       fname: "",
//       lname: "",
//       userPassword: "coca"
//     },
//     {
//       userId: 55555,
//       username: "vanillaCoke",
//       fname: "",
//       lname: "",
//       userPassword: "vainilla"
//     },
//     {
//       userId: 23412,
//       username: "cokeZero",
//       fname: "",
//       lname: "",
//       userPassword: "cocazero"
//     }
//   ];

// database connection to get users
const con = require('./db_connect')

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
      userId INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL UNIQUE,
      userFname VARCHAR(255) NOT NULL,
      userLname VARCHAR(255) NOT NULL,
      userpassword VARCHAR(255) NOT NULL,
      CONSTRAINT userPK PRIMARY KEY(userId)
  );`

  await con.query(sql)
}

createTable()// creates table if it doesn't exist
  
function getAllUsers() {//gets all users in array
  return users;
}

function login(user) { //{username: "" , pasword: ""}
  let cUser = users.filter(u => u.username === user.username)
  if(!cUser[0]) throw Error("User not found!")//checks if user exists
  if(cUser[0].userPassword !== user.userPassword) throw Error("Password incorrect!")//check if password matches

  return cUser[0];
}

module.exports = { getAllUsers, login };