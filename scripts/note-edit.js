'use strict';

const noteId = location.hash.substring(1);
const myNotes = getSavedNotes();

const myNote = myNotes.find((note) => note.id === noteId);

const dateElement = document.querySelector('#show-time');

if (!myNote) {
  location.assign('./index.html');
}

//Generate the last edited message
const generateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;

document.querySelector('#edit-input').value = myNote.title;
document.querySelector('#edit-textarea').value = myNote.body;
dateElement.textContent = generateLastEdited(myNote.updatedAt);

document.querySelector('#remove-note').addEventListener('click', () => {
  removeNotes(myNote.id);
  saveNotes(myNotes);
  location.assign('./index.html');
});

document.querySelector('#edit-input').addEventListener('input', (e) => {
  e.preventDefault();
  myNote.title = e.target.value;
  myNote.updatedAt = moment().valueOf();
  generateLastEdited(myNote.updatedAt);
  saveNotes(myNotes);
});

// document.querySelector(
//   '#show-time'
// ).textContent = `Last updated at ${myNote.updatedAt}`;

document.querySelector('#edit-textarea').addEventListener('input', (e) => {
  e.preventDefault();
  myNote.body = e.target.value;
  myNote.updatedAt = moment().valueOf();
  generateLastEdited(myNote.updatedAt);
  saveNotes(myNotes);
});

const now = new Date('January 01 1930');
const now1 = new Date('January 01 1993');
const timestamp = now.getTime();
const timestamp1 = now1.getTime();
const timing =
  timestamp1 > timestamp
    ? now.toLocaleString('default', { month: 'short' })
    : now1.toString();

console.log(timing);

const momentum = moment();
momentum.year(1993).month(11).date(17);
const theDay = momentum.format('MMM D, YYYY');
console.log(theDay);
