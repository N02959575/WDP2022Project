//"database" as object literal
// const notes = [//id, username, content, date
//     {
//       noteId: 54321,  
//       noteCreator: "coke",
//       noteContent: "I'm delicious!",
//       noteCreationDate: 11/17/2022,
//     },
//     {
//       noteId: 66666,  
//       noteCreator: "vanillaCoke",
//       noteContent: "I'm more delicious!",
//       noteCreationDate: 11/16/2022,
//     },
//     {
//       noteId: 21432,  
//       noteCreator: "cokeZero",
//       noteContent: "I'm healthier?",
//       noteCreationDate: 11/15/2022,
//     }
//   ];

// database connection to get users
const con = require('./db_connect')

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS notes (
      noteId INT NOT NULL AUTO_INCREMENT,
      noteCreator INT NOT NULL,
      noteContent VARCHAR(255) NOT NULL,
      noteCreationDate DATE  NOT NULL,
      CONSTRAINT notePK PRIMARY KEY(noteId)
      FOREIGN KEY (noteCreator) REFERENCES users(userId)
  );`

  await con.query(sql)
}

createTable()// creates table if it doesn't exist

//get all notes from db
async function getAllNotes() {
  const sql = `SELECT * FROM notes;`

  let notes = await con.query(sql)
  console.log(notes)
}

//get note by id from db
async function getNote(noteId){
  let sql = `
  SELECT * FROM notes
  WHERE noteId = "${noteId}"`

  return await con.query(sql)
}

//insert new note into db
async function createNote(note){
  const sql = `INSERT INTO notes
  (noteCreator, noteContent, noteCreationDate)
  VALUES("${note.noteCreator}","${note.noteContent}", "${note.noteCreationDate}");`

  await con.query(sql)
}

module.exports = { getAllNotes };