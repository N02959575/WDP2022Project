// USER Class
class User {
    constructor(username, fname, lname, password) {
        //this.userId = id
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
    constructor(userId, content, date) {
        //this.noteId = id
        this.noteCreator = userId
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
const users = document.getElementById('userList')//from login.html

//Grabbing buttons
let logout = document.getElementById('logout-btn')
let usersButton = document.getElementById('btn-users')

//Event listeners
if(registerForm) registerForm.addEventListener('submit', registerUser)
if(loginForm) loginForm.addEventListener('submit', login)
if(noteForm) noteForm.addEventListener('submit', addNote)
if(logout) logout.addEventListener('click', removeCurrentUser)//for removing user from local storage
if (usersButton) usersButton.addEventListener('click', displayUsers)//for user display button in login.html


//Functions
// stateful mechanism for user
function setCurrentUser(user){//login in a user
    localStorage.setItem('user', JSON.stringify(user))
}

function getCurrentUser(){//getting curret user function
    return JSON.parse(localStorage.getItem(('user')))
}

//logout function for current user
function removeCurrentUser(){//logout
  localStorage.removeItem('user')
}

function registerUser(e){//registers a user
    e.preventDefault()
    
    //get new user info
    let username = document.getElementById('username').value
    let fname = document.getElementById('fname').value
    let lname = document.getElementById('lname').value
    let userPassword = document.getElementById('regPasswd').value
    //eventually i would like to get the confirm password to make sure they match
    let user = new User(username, fname, lname, userPassword)

    console.log(user)

    fetchData("/users/register", user, "POST")
    .then((data) =>{
      //console.log(data)
      setCurrentUser(data)
      window.location.href = "note.html"
    })
    .catch((err) =>{
      console.log(err)
    })


    //print user, for testing
    //console.log(user)
}

function login(e){//logs in a user
    e.preventDefault()

    //get login user input
    let username = document.getElementById('username').value
    let password = document.getElementById('passwd').value
    let user = new User(username, null, null, password);

    //print username and password entered by user
    //console.log(`username: ${username}\npasword: ${password}`)
    //console.log(user)

    //fetch data from server
    fetchData("/users/login", user, "POST")
    .then((data) => {
      //console.log(data)
      setCurrentUser(data)
      window.location.href = "note.html"
      
    })
    .catch((err) => {
      console.log(`Error!!! ${err.message}`)
    })
}

function addNote(e){
    e.preventDefault()

    //get note entered by user
    let noteCreator = getCurrentUser() //for testing while getCurrentUser gets fixed
    let noteContent = document.getElementById('note').value
    let today = new Date()
    let noteCreationDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()//for mysql format
    let displayDate = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear() //for display on web format

    let newNote = new Note(noteCreator.userId, noteContent, noteCreationDate)
    console.log("note: "+ newNote.getNote)

    fetchData("/notes/create", newNote, "POST")
    .then((note) => {
        console.log("note: "+ note)
    })
    .catch((err) => {
        console.log(`Error!!! ${err.message}`)
    })

    //print note and today's date
    console.log(`note: ${noteContent}\ndate created: ${noteCreationDate}`)

    //display note
    notes.innerHTML += `
        <div class="note">
            <br>
            <p>${displayDate}:</p>
            <br>
            <p>${noteContent}</p>
        </div>
    `


    //erase input from form
    document.getElementById('note').value = ''

    //displayNotes()
}


//when user logs in all their notes are displayed
function displayNotes(){
    let user = getCurrentUser()
    let tempNote = new Note(user.userId, "", "1992-10-09")
    console.log("getCuser: " + user.userId)
    //fetch notes for current user
    fetchData("/notes/getMyNotes", tempNote, "POST")
    .then((data) => {
        console.log(data)
        //forEach only works if i use Object.values
        Object.values(data).forEach(note => {
            //removes time from date so that only the date is printed
            let date = (new Date(note.noteCreationDate)).toLocaleDateString()
            notes.innerHTML += `
            <div class="note">
                <br>
                <p>${date}:</p>
                <br>
                <p>${note.noteContent}</p>
            </div>
            `
        })
    })
    .catch((err) => {
        console.log(`Error!!! ${err.message}`)
    })
    
}

//Checks if user is logged in
if(getCurrentUser()){
    //==let test1 = getCurrentUser()
    //console.log(test1)
    displayNotes()
}

function displayUsers(e) {//used to display all users in database on the log in pages
    e.preventDefault()

    if(users.innerText === ""){ 
        fetch("http://localhost:3000/users")//does not use fetchData function for testing purposes
        .then((res) => res.json()) //JSON.parse(res)
        .then((data) => {
        console.log(data)
        data.forEach(user => {
            let section = `
                <div class="user">
                    <p>${user.username}</p>
                </div>
            `
            users.innerHTML += section
        })
        })
        .catch((err) => {
        console.log(`Error!!! ${err.message}`)
        })
    }
    users.classList.toggle('hide')
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