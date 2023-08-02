const chalk = require('chalk');
const fs = require('fs');
const { title } = require('process');
const { array } = require('yargs');

const getNotes = function () {
  return 'Your notes...';
};

const addNote = async (title, body) => {
  const notes = await loadNotes();
  const duplicatenotes = notes.filter(function (note) {
    return note.title === title;
  });
  if (duplicatenotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
  } else {
    console.log('Note title taken');
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
  return;
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNotes = async (title) => {
  const notes = await loadNotes();
  const findNote = notes.filter((note) => {
    return note.title === title;
  });
  if (findNote.length === 0) {
    console.log(chalk.inverse.red('No note found!'));
    return;
  }
  const notesToKeep = notes.filter((note) => {
    return note.title !== title;
  });
  console.log(
    `title: "${findNote[0].title}" , body: "${
      findNote[0].body
    }" was deleted ${chalk.green.inverse('sucessly')}`
  );
  await saveNotes(notesToKeep);
};

const listNotes = () => {
  const notes = loadNotes();
  console.log('Your notes!');
  notes.forEach((note) => {
    console.log(note.title);
    console.log('-----------------------------');
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const findNote = notes.filter((note) => {
    return note.title === title;
  });
  console.log(findNote[0].body);
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNote: readNote,
};
