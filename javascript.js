// Book constructor

function Book(title, author, readStatus, rating, notes) {
  this.title = title;
  this.author = author;
  this.readStatus = readStatus;
  this.rating = rating;
  this.notes = notes;
}

// Elements

const myLibrary = [
  {
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    readStatus: 'Currently reading',
    notes: 'Several hours in. Maybe soon the boys will actually get out of the Shire.',
  },
  {
    title: 'Stardust',
    author: 'Neil Gaiman',
    readStatus: 'Read',
    rating: '5',
    notes: 'My all-time favourite from Gaiman.',
  },
  {
    title: "There's No Such Thing as an Easy Job",
    author: 'Kikuko Tsumura',
    readStatus: 'Read',
    rating: '4',
    notes: 'This was really enjoyable. Eerie and otherworldly, yet funny and heartwarming at the same time.',
  },
];

const bookList = document.querySelector('main');

const formDialog = document.getElementById('new-edit-dialog');
const openForm = document.getElementById('open-form');
const closeForm = document.getElementById('close-form');

const form = document.getElementById('new-edit-book');

const readStatusButtons = document.getElementsByName('read');
const readButton = document.getElementById('read');
const rating = document.getElementById('rating');

const stars = rating.querySelectorAll('label');

// Event listeners

bookList.addEventListener('click', deleteBook);
bookList.addEventListener('click', editBook);

openForm.addEventListener('click', showForm);
closeForm.addEventListener('click', showForm);

form.addEventListener('submit', addBook);

readStatusButtons.forEach((button) =>button.addEventListener('change', enableRating));

stars.forEach((star) => star.addEventListener('click', addStars));
stars.forEach((star) => star.addEventListener('mouseover', addStars));
stars.forEach((star) => star.addEventListener('mouseout', checkStars));

// Functions

function addBook() {
  // Get title, author, rating, notes
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  let readStatus;
  for (i = 0; i < 3; i++) {
    if (document.getElementsByName('read')[i].checked) {
      readStatus = document.getElementsByName('read')[i].value;
    }
  }
  let rating;
  for (i = 0; i < 5; i++) {
    if (document.getElementsByName('rating')[i].checked) {
      rating = document.getElementsByName('rating')[i].value;
    }
  }
  let notes = document.getElementById('notes').value;
  if (!notes) {
    notes = 'n/a';
  }
  // Make a new book object
  const myBook = new Book(title, author, readStatus, rating, notes);
  // If new book, push to myLibrary array. If edit of existing book, replace existing entry with the new data
  const editIndex = myLibrary.findIndex((book) => book.edit === true);
  if (editIndex === -1) {
    myLibrary.push(myBook);
  } else {
    myLibrary.splice(editIndex, 1, myBook);
  }
  // Display on page
  bookList.innerHTML = ``;
  myLibrary.forEach((book) => display(book));
  // Reset
  myBook.edit = false;
  showForm();
}

function editBook(e) {
  if (e.target.classList.contains('edit')) {
    // Show form
    showForm();
    // Show correct header
    document.querySelector('#add-head').style.display = 'none';
    document.querySelector('#edit-head').style.display = 'block';
    // Find the book in the array
    let bookIndex;
    if (e.target.classList.contains('material-icons-sharp')) {
      bookIndex = e.target.parentNode.parentNode.parentNode.getAttribute('num');
      console.log(bookIndex);
    } else {
      bookIndex = e.target.parentNode.parentNode.getAttribute('num');
    }
    bookData = myLibrary.at(bookIndex);
    // Flag as editing
    bookData.edit = true;
    // Fill form with book details
    document.getElementById('title').value = bookData.title;
    document.getElementById('author').value = bookData.author;
    document.querySelector(`input[value="${bookData.readStatus}"`).checked = true;
    document.getElementById('notes').value = bookData.notes;
    if (bookData.rating) {
      enableRating();
      document.querySelector(`input[value="${bookData.rating}"`).checked = true;
      checkStars();
    } else {
      rating.style.visibility = 'hidden';
      checkStars();
    }
  }
}

function display(book) {
  const bookCard = document.createElement('article');
  if (!book.rating) {
    bookCard.innerHTML = `
      <section><h2>${book.title}</h2>by <h4>${book.author}</h4></section>
      <section><h3>Status:</h3> ${book.readStatus}</section>
      <section><h3>Rating:</h3> n/a</section>
      <section><h3>Notes:</h3> ${book.notes}</section>
      <div class="buttons"><button class="edit"><span class="material-icons-sharp edit">edit</span> Edit</button><button class="delete"><span class="material-icons-sharp delete">delete</span> Delete</button></div>
      `;
  } else {
    const star = `<span class="material-icons-sharp colored">star_rate</span>`;
    const emptyStar = `<span class="material-icons-sharp uncolored">star_rate</span>`;
    bookCard.innerHTML = `
      <section><h2>${book.title}</h2>by <h4>${book.author}</h4></section>
      <section><h3>Status:</h3> ${book.readStatus}</section>
      <section><h3>Rating:</h3> ${star.repeat(book.rating)}${emptyStar.repeat(5 - book.rating)}</section>
      <section><h3>Notes:</h3> ${book.notes}</section>
      <div class="buttons"><button class="edit"><span class="material-icons-sharp edit">edit</span> Edit</button><button class="delete"><span class="material-icons-sharp delete">delete</span> Delete</button></div>
      `;
  }
  bookList.appendChild(bookCard);
  bookCard.setAttribute('num', document.querySelectorAll('article').length - 1);
}

myLibrary.forEach((book) => display(book));

function showForm() {
  if (formDialog.open) {
    formDialog.close();
    document.getElementById('new-edit-book').reset();
    myLibrary.forEach((book) => (book.edit = false));
  } else {
    formDialog.showModal();
    document.querySelector('#add-head').style.display = 'block';
    document.querySelector('#edit-head').style.display = 'none';
  }
  enableRating();
}

function enableRating() {
  if (readButton.checked) {
    rating.style.visibility = 'visible';
    document.getElementById('1').setAttribute('required', '');
  } else {
    rating.style.visibility = 'hidden';
    stars.forEach((star) => (star.style.color = '#BAB0A1'));
    document.getElementById('1').removeAttribute('required', '');
    for (i = 0; i < 5; i++) {
      document.getElementsByName('rating')[i].checked = false;
    }
  }
}

function addStars() {
  stars.forEach((star) => {
    if (Number(star.getAttribute('for')) <= Number(this.getAttribute('for'))) {
      star.style.color = '#4DB6AC';
    } else {
      star.style.color = '#BAB0A1';
    }
  });
}

function checkStars() {
  if (!rating.querySelector('input:checked')) {
    stars.forEach((star) => (star.style.color = '#BAB0A1'));
  } else {
    stars.forEach((star) => {
      // When user removes mouse from stars, stars revert to displaying the rating which was last selected with a click
      // So an accidental mouse in/out can't appear to change the rating
      if (
        Number(star.getAttribute('for')) <=
        Number(rating.querySelector('input:checked').getAttribute('id'))
      ) {
        star.style.color = '#4DB6AC';
      } else {
        star.style.color = '#BAB0A1';
      }
    });
  }
}

function deleteBook(e) {
  if (e.target.classList.contains('delete')) {
    const bookIndex = e.target.parentNode.parentNode.getAttribute('num');
    myLibrary.splice(bookIndex, 1);
    bookList.innerHTML = ``;
    myLibrary.forEach((book) => display(book));
  }
}
