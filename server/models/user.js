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

//Creating user table
async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
      userId INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL UNIQUE,
      userFname VARCHAR(255),
      userLname VARCHAR(255),
      userPassword VARCHAR(255) NOT NULL,
      CONSTRAINT userPK PRIMARY KEY(userId)
  );`

  await con.query(sql)
}

createTable()// creates table if it doesn't exist
  
//gets all users in array
async function getAllUsers() {
  const sql = `SELECT * FROM users;`

  let users = await con.query(sql)
  console.log(users)//for testing
}

//get a specific user from db
async function getUser(username){
  let sql = `
  SELECT * FROM users
  WHERE username = "${username}"`

  return await con.query(sql)
}

//insert new user into db
async function register(user){
  let cUser = await getUser(user.username)

  if (cUser.length > 0) throw Error ("username already in use")

  const sql = `INSERT INTO users
  (username, userPassword)
  VALUES("${user.username}", "${user.userPassword}");`

  await con.query(sql)
  return await login(user)
}

//authorizes user for login
async function login(user) { //{username: "" , userPassword: ""}
  let cUser = await getUser(user.username);//gets user that matches user input from db
  if(!cUser[0]) throw Error("User not found!")
  if(cUser[0].userPassword !== user.userPassword) throw Error("Password incorrect!")

  //console.log(cUser[0])//for testing
  return cUser[0];
}

//For testing
// let coke = {//test user
//   username: "coke",
//   userPassword: "coca"
// }

// login(coke)
// getAllUsers()



module.exports = { getAllUsers, login, register };