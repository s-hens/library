// Book list

let myLibrary = [
    {
        title: "Norse Mythology",
        author: "Neil Gaiman",
        readStatus: "Read",
        rating: "5",
        notes: "One of my favourites from Gaiman"
    },
    {
        title: "Gone Girl",
        author: "Gillian Flynn",
        readStatus: "Read",
        rating: "4",
        notes: "Wish I hadn't seen the movie first so I could have been really surprised by the twist"
    }
];


// Display "new book" form

let openForm = document.getElementById("open-form");
openForm.addEventListener("click", showForm);

let closeForm = document.getElementById("close-form");
closeForm.addEventListener("click", showForm);

let newBookDiv = document.getElementById("new-book-form1");

function showForm() {
    if (newBookDiv.style.display == "block") {
        newBookDiv.style.display = "none";
    } else {
        newBookDiv.style.display = "block";
    }
}


// Add book to list

function Book(title, author, readStatus, rating, notes) {
    this.title = title;
    this.author = author;
    this.readStatus = readStatus;
    this.rating = rating;
    this.notes = notes;
}

function addBook() {
    //Prevent page refresh on form submission
    event.preventDefault();
    //Get title
    let title = document.getElementById("title").value;
    //Get author
    let author = document.getElementById("author").value;
    //Get status
    let readStatus;
    for (i = 0; i < 3; i++) {
        if (document.getElementsByName("read")[i].checked) {
            readStatus = document.getElementsByName("read")[i].value;
        }
    }
    //Get rating
    let rating;
    for (i = 0; i < 5; i++) {
        if (document.getElementsByName("rating")[i].checked) {
            rating = document.getElementsByName("rating")[i].value;
        }
    }
    //Get notes
    let notes = document.getElementById("notes").value;
    if (!notes) {
        notes = "n/a";
    };
    //Make a new book object and add it to library array
    let myBook = new Book(title, author, readStatus, rating, notes);
    myLibrary.push(myBook);
    //Display new book on page
    display(myBook);
    showForm();
    document.getElementById("new-book-form").reset();
}

let submit = document.getElementById("submit");
submit.addEventListener("click", addBook);


// Enable rating if book is marked as read

readButton = document.getElementById("read");

readButtons = document.getElementsByName("read");
readButtons.forEach (button => button.addEventListener("change", enableRating));

let ratingDiv = document.getElementById("rating");

function enableRating() {
    if (readButton.checked) {
        ratingDiv.style.display = "block";
    } else {
        ratingDiv.style.display = "none";
        for (i = 0; i < 5; i++) {
            document.getElementsByName("rating")[i].checked = false;
        }
    }
}


// Display book list

function display(book) {
    let div = document.createElement("div");
    if (!book.rating) {
        div.innerHTML = `
        <div class="cardinfo"><span class="title">${book.title}</span>by <span class="author">${book.author}</span></div>
        <div class="cardinfo"><h3>Status:</h3> ${book.readStatus}</div>
        <div class="cardinfo"><h3>Rating:</h3> n/a</div>
        <div class="cardinfo"><h3>Notes:</h3> ${book.notes}</div>
        <div class="buttons"><button class="edit"><span class="material-icons-sharp">edit</span> Edit</button><button class="delete"><span class="material-icons-sharp">delete</span> Delete</button></div>
        `;
    } else {
        let star = `<span class="material-icons-sharp">star_rate</span>`;
        let emptyStar = `<span class="material-icons-sharp">star_outline</span>`;
        div.innerHTML = `
        <div class="cardinfo"><span class="title">${book.title}</span>by <span class="author">${book.author}</span></div>
        <div class="cardinfo"><h3>Status:</h3> ${book.readStatus}</div>
        <div class="cardinfo"><h3>Rating:</h3> ${star.repeat(book.rating)}${emptyStar.repeat(5 - book.rating)} </div>
        <div class="cardinfo"><h3>Notes:</h3> ${book.notes}</div>
        <div class="buttons"><button class="edit"><span class="material-icons-sharp">edit</span> Edit</button><button class="delete"><span class="material-icons-sharp">delete</span> Delete</button></div>
        `;
    }
    div.classList.add("card");
    document.getElementById("booklist").appendChild(div);
}

myLibrary.forEach(book => display(book));