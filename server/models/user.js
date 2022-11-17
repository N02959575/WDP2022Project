//"database" as object literal
const users = [//id, username, fname, lname, password
    {
      userId: 12345,
      username: "coke",
      fname: "",
      lname: "",
      userPassword: "coca"
    },
    {
      userId: 55555,
      username: "vanillaCoke",
      fname: "",
      lname: "",
      userPassword: "vainilla"
    },
    {
      userId: 23412,
      username: "cokeZero",
      fname: "",
      lname: "",
      userPassword: "cocazero"
    }
  ];
  
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