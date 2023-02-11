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

const openForm = document.getElementById('open-form');
const closeForm = document.getElementById('close-form');

const form = document.getElementById("new-edit-dialog");

// Event listeners

openForm.addEventListener('click', showForm);
closeForm.addEventListener('click', showForm);

// Functions

function display(book) {
  const bookCard = document.createElement("article");
  if (!book.rating) {
    bookCard.innerHTML = `
      <section><h2>${book.title}</h2>by <h4>${book.author}</h4></section>
      <section><h3>Status:</h3> ${book.readStatus}</section>
      <section><h3>Rating:</h3> n/a</section>
      <section><h3>Notes:</h3> ${book.notes}</section>
      <div class="buttons"><button class="edit"><span class="material-icons-sharp">edit</span> Edit</button><button class="delete"><span class="material-icons-sharp">delete</span> Delete</button></div>
      `;
  } else {
    const star = `<span class="material-icons-sharp colored">star_rate</span>`;
    const emptyStar = `<span class="material-icons-sharp uncolored">star_rate</span>`;
    bookCard.innerHTML = `
      <section><h2>${book.title}</h2>by <h4>${book.author}</h4></section>
      <section><h3>Status:</h3> ${book.readStatus}</section>
      <section><h3>Rating:</h3> ${star.repeat(book.rating)}${emptyStar.repeat(5 - book.rating)}</section>
      <section><h3>Notes:</h3> ${book.notes}</section>
      <div class="buttons"><button class="edit"><span class="material-icons-sharp">edit</span> Edit</button><button class="delete"><span class="material-icons-sharp">delete</span> Delete</button></div>
        `;
  }
  document.querySelector("main").appendChild(bookCard);
  bookCard.setAttribute("num", document.querySelectorAll(".card").length - 1);
}
myLibrary.forEach((book) => display(book));


function showForm() {
  // Reset stuff
  //stars.forEach((star) => (star.style.color = '#E3E0DA'));
  //enableRating();

  // Show form
  form.showModal();
  // Show correct header
  document.querySelector('.add-head').style.display = 'block';
  document.querySelector('.edit-head').style.display = 'none';
}