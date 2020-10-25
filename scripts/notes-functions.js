'use strict';

//Get saved Notes from localStorage
const getSavedNotes = (myNotes) => {
  const addNote = localStorage.getItem('notes');
  try {
    return addNote ? (myNotes = JSON.parse(addNote)) : [];
  } catch (error) {
    return [];
  }
};

//Save notes to local storage
const saveNotes = function (myNotes) {
  localStorage.setItem('notes', JSON.stringify(myNotes));
};

const filterSortBy = (notes, sortBy) => {
  return notes.sort((a, b) => {
    if (sortBy === 'byEdited') {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (b.updatedAt > a.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    } else if (sortBy === 'byCreated') {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (b.createdAt > a.createdAt) {
        return 1;
      } else {
        return 0;
      }
    } else if (sortBy === 'alphabetically') {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (b.title.toLowerCase() < a.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return notes;
    }
  });
};

//Render notes based on filters
const render = (notes, filter) => {
  notes = filterSortBy(notes, filter.sortBy);
  const filtered = notes.filter((note) => {
    const searchNotes = note.title
      .toLowerCase()
      .includes(filter.searchText.toLowerCase());
    const hideNotes = !filter.hideCompleted || !note.completed;
    return searchNotes && hideNotes;
  });

  document.querySelector('#Search').innerHTML = '';

  const completas = filtered.filter((note) => {
    return !note.completed;
  });

  document
    .querySelector('#Search')
    .appendChild(domElementsForListSummary(completas));

  if (filtered.length > 0) {
    filtered.forEach((note) => {
      document
        .querySelector('#Search')
        .appendChild(domElementsForIndividualNote(note));
    });
  } else {
    const bill = document.createElement('p');
    bill.textContent = 'No notes to show';
    bill.classList.add('empty-message');
    document.querySelector('#Search').appendChild(bill);
  }
};

//Remove the individual note by its ID

const removeNotes = (id) => {
  const noteIndex = myNotes.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    myNotes.splice(noteIndex, 1);
  }
};

//Get the dom elements for an individual note

const domElementsForIndividualNote = (note) => {
  const noteEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const button = document.createElement('button');
  const link = document.createElement('a');
  const status = document.createElement('p');

  //Set up our checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = note.completed;
  checkbox.addEventListener('click', () => {
    toggleCompleted(note.id);
    saveNotes(myNotes);
    render(myNotes, filter);
  });
  noteEl.appendChild(checkbox);

  //seting up the link for notes

  link.setAttribute('href', `./edit.html#${note.id}`);
  link.classList.add('list-item__title');
  noteEl.appendChild(link);
  noteEl.classList.add('list-item');

  //Set up our text
  const textEl = document.createElement('span');
  textEl.textContent = note.title;
  textEl.classList.add('list-item__title');
  link.appendChild(textEl);

  //Set up our button
  button.textContent = 'x';
  noteEl.appendChild(button);
  button.addEventListener('click', () => {
    removeNotes(note.id);
    saveNotes(myNotes);
    render(myNotes, filter);
  });

  //setUp the status message
  const generateLastEdited = (timestamp) =>
    `Last edited ${moment(timestamp).fromNow()}`;
  status.textContent = generateLastEdited(note.updatedAt);
  status.classList.add('list-item__subtitle');
  noteEl.appendChild(status);

  return noteEl;
};

//Toggle the checkbox and change the completed property
const toggleCompleted = (id) => {
  const note = myNotes.find((note) => note.id === id);

  if (note) {
    return (note.completed = !note.completed);
  }
};

//Get the dom elements for list summary
const domElementsForListSummary = (completas) => {
  const para = document.createElement('h2');
  para.textContent = `You have ${completas.length} notes to complete`;
  return para;
};
