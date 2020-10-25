'use strict';
let myNotes = getSavedNotes();
const filter = {
  searchText: '',
  hideCompleted: false,
  sortBy: 'byEdited',
};

render(myNotes, filter);
document.querySelector('#filter-notes').addEventListener('input', (e) => {
  filter.searchText = e.target.value;
  render(myNotes, filter);
});

document.querySelector('#checking').addEventListener('change', (e) => {
  e.preventDefault();
  filter.hideCompleted = e.target.checked;
  render(myNotes, filter);
});

//Change the selection in filter object
document.querySelector('#selection').addEventListener('change', (e) => {
  filter.sortBy = e.target.value;
  saveNotes(myNotes);
  render(myNotes, filter);
});

//Create a new note and save it to the local storage
document.querySelector('#formation').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = uuidv4();

  myNotes.push({
    id: id,
    title: e.target.elements.newNote.value,
    body: '',
    createdAt: moment().valueOf(),
    updatedAt: moment().valueOf(),
    sortBy: 'createdAt',
  });
  e.target.elements.newNote.value = '';
  saveNotes(myNotes);
  location.assign(`./edit.html#${id}`);
  //   render(myNotes, filter);
});

window.addEventListener('storage', (e) => {
  if ((e.key = 'notes')) {
    myNotes = JSON.parse(e.newValue);

    render(myNotes, filter);
  }
});

// localStorage.setItem('location', 'Nairobi');
// console.log(localStorage.getItem('location'));

// for (let note = 0; note < myNotes.length; note++) {
//   const p = document.createElement('p');
//   p.textContent = myNotes[note].title;
//   document.querySelector('body').appendChild(p);
// }
// myNotes.forEach(function (note) {
//   const p = document.createElement('p');
//   p.textContent = note.title;
//   document.querySelector('body').appendChild(p);
// });

// document.querySelector('#add-note').addEventListener('click', function () {
//   console.log('This button has been clicked');
// });
