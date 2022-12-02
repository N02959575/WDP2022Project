// database connection to get users
const con = require('./db_connect')

//creates the users table in the db
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
async function getUser(user){
  let sql
  if(user.userId){
    sql = `
    SELECT * FROM users
    WHERE userId = ${user.userId}`
  }
  else {
    sql = `
    SELECT * FROM users
    WHERE username = "${user.username}"`
  }
  return await con.query(sql)
}

//insert new user into db
async function register(user){
  let cUser = await getUser(user)

  if (cUser.length > 0) throw Error ("username already in use")

  //need to test again/////////////////////////////////////////
  const sql = `INSERT INTO users
  (username, userFname, userLname, userPassword)
  VALUES("${user.username}","${user.userFname}","${user.userLname}", "${user.userPassword}");`

  await con.query(sql)
  return await login(user)
}

//authorizes user for login
async function login(user) { //{username: "" , userPassword: ""}
  let cUser = await getUser(user);//gets user that matches user input from db
  if(!cUser[0]) throw Error("User not found!")
  if(cUser[0].userPassword !== user.userPassword) throw Error("Password incorrect!")

  //console.log(cUser[0])//for testing
  return cUser[0];
}

module.exports = { getAllUsers, login, register };