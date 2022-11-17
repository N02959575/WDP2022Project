//"database" as object literal
const notes = [//id, username, content, date
    {
      noteId: 54321,  
      noteCreator: "coke",
      noteContent: "I'm delicious!",
      dateCreated: 11/17/2022,
    },
    {
      noteId: 66666,  
      noteCreator: "vanillaCoke",
      noteContent: "I'm more delicious!",
      dateCreated: 11/16/2022,
    },
    {
      noteId: 21432,  
      noteCreator: "cokeZero",
      noteContent: "I'm healthier?",
      dateCreated: 11/15/2022,
    }
  ];

  function getAllNotes() {//gets all users in array
    return notes;
  }

  module.exports = { getAllNotes };