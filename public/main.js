// USER Class
class User {
    constructor(id, username, fname, lname, password) {
        this.userId = id
        this.username = username
        this.userFname = fname
        this.userLname = lname
        this.userPassword = password
    }

    //getters
    getUsername() {
        return this.username
    }

    getUserFname(){
        return this.userFname
    }

    getUserLname(){
        return this.userLname
    }

    getUserFullName(){//still need to do this one

    }

    getUserPassword(){
        return this.userPassword
    }

    //setters
    setUsername(name) {
        this.username = name
    }

    setUserFname(fname){
        this.userFname = fname
    }

    setUserLname(lname){
        this.userLname = lname
    }

    setUserPassword(password){
        this.userPassword = password
    }
}

//NOTE Class
class Note {
    constructor(id, username, content, date) {
        this.noteId = id
        this.noteCreator = username
        this.noteContent = content
        this.noteCreationDate = date
    }

    //getters
    getNote() {
        return this.noteContent
    }

    getNoteCreator(){
        return this.noteCreator
    }

    getNoteCreationDate(){
        return this.noteCreationDate
    }

    //setters
    setNote(content) {
        this.noteContent = content
    }

    setNoteCretor(username){
        this.getNoteCreator = username
    }

    setNoteCreationDate(date){
        this.noteCreationDate = date
    }
}

//Grabbing forms
const registerForm = document.getElementById('registerForm')//from register.html
const loginForm = document.getElementById('loginForm')//from login.html
const noteForm = document.getElementById('noteForm')//from note.html

//Grabbing sections
const notes = document.getElementById('noteList')//from note.html

//Event listeners
if(registerForm) registerForm.addEventListener('submit', registerUser)
if(loginForm) loginForm.addEventListener('submit', login)
if(noteForm) noteForm.addEventListener('submit', addNote)

//Functions
function registerUser(e){//registers a user
    e.preventDefault()
    
    //get new user info
    let num = Math.floor(Math.random() * 90000) + 10000 //generate random 5-digit number
    let username = document.getElementById('username').value
    let fname = document.getElementById('fname').value
    let lname = document.getElementById('lname').value
    let password = document.getElementById('regPasswd').value
    //eventually i would like to get the confirm password to make sure they match
    let user = new User(num, username, fname, lname, password)

    //print user
    console.log(user)
}

function login(e){//logs in a user
    e.preventDefault()

    //get login user input
    let username = document.getElementById('username').value
    let password = document.getElementById('passwd').value
    let user = new User(null, username, null, null, password);

    //print username and password entered by user
    console.log(`username: ${username}\npasword: ${password}`)
    console.log(user)

    //fetch data from server////////////////////////////////////////////////////////needs testing still
    fetchData("/users/login", user, "POST")
    .then((data) => {
      console.log(data)
      window.location.href = "note.html"
    })
    .catch((err) => {
      console.log(`Error!!! ${err.message}`)
    })
    /////////////////////////////////////////////////////////////////////////////////
}

function addNote(e){
    e.preventDefault()

    //get note entered by user
    let note = document.getElementById('note').value
    let today = new Date()
    let dateCreated = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear()

    //print note and today's date
    console.log(`note: ${note}\ndate created: ${dateCreated}`)

    //display note
    notes.innerHTML += `
        <div class="note">
            <br>
            <p>${dateCreated}:</p>
            <br>
            <p>${note}</p>
        </div>
    `


    //erase input from form
    document.getElementById('note').value = ''
}

// Fetch method implementation:
async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: methodType, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
      return await response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw await response.json();
    }
  }