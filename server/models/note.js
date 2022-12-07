// database connection to get users
const con = require('./db_connect')

//creates the notes table in the db
async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS notes (
    noteId INT NOT NULL AUTO_INCREMENT,
    noteContent VARCHAR(255),
    noteCreationDate DATE NOT NULL,
    userId INT NOT NULL,
    CONSTRAINT notePK PRIMARY KEY(noteId),
    CONSTRAINT noteFK FOREIGN KEY(userId) references users(userId)
  ); `

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
//getting error: Cannot add or update a child row: a foreign key constraint fails
async function createNote(note){
  const sql = `INSERT INTO notes
  (noteContent, noteCreationDate, userId)
  VALUES("${note.noteContent}","${note.noteCreationDate}", ${note.noteCreator});`

  await con.query(sql)
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
  WHERE userId = ${note.noteCreator}`

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