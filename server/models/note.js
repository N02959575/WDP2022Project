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

//creates the notes table in the db
async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS notes (
      noteId INT NOT NULL AUTO_INCREMENT,
      noteCreator INT REFERENCES users(userId),
      noteContent VARCHAR(255) NOT NULL,
      noteCreationDate DATE NOT NULL,
      CONSTRAINT notePK PRIMARY KEY(noteId)
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

//insert new note into db
//note is added to db but getting error: Unknown column 'undefined' in 'where clause'
async function createNote(note){
  const sql = `INSERT INTO notes
  (noteCreator, noteContent, noteCreationDate)
  VALUES(${note.noteCreator},"${note.noteContent}", "${note.noteCreationDate}");`

  await con.query(sql)
  //this doesnt return properly need to fix
  //return await getNote(note)
}

//get note by id from db
async function getNote(note){
  let sql = `SELECT * FROM notes
  WHERE noteId = ${note.noteId}`

 
 return await con.query(sql)
 
}

//get all current user notes
async function getAllUserNotes(note){
  let sql = `
  SELECT * FROM notes
  WHERE noteCreator = ${note.noteCreator}`

  return await con.query(sql)
}

//allows user to edit note
async function editNote(note){//should also modify date eventually
  let cNote = await getNote(note)
  //check if note exists
  if (cNote.length == 0) throw Error ("note does not exist")

  let sql = `UPDATE notes
  SET noteContent = "${note.noteContent}"
  WHERE noteId = ${note.noteId}`

  await con.query(sql)
  let updatedNote = await getNote(note)
  return updatedNote[0]
}

//allows user to delete note
async function deleteNote(note){
  let sql = `DELETE FROM notes
  WHERE noteId = ${note.noteId}`

  await con.query(sql)
}

module.exports = { getAllNotes, createNote, getNote, getAllUserNotes, editNote, deleteNote };