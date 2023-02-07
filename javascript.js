// Book list

let myLibrary = [
    {
        title: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        readStatus: "Currently reading",
        notes: "Several hours in. Maybe soon the boys will actually get out of the Shire."
    },
    {
        title: "Stardust",
        author: "Neil Gaiman",
        readStatus: "Read",
        rating: "5",
        notes: "My all-time favourite from Gaiman."
    },
    {
        title: "There's No Such Thing as an Easy Job",
        author: "Kikuko Tsumura",
        readStatus: "Read",
        rating: "4",
        notes: "This was really enjoyable. Eerie and otherworldly, yet funny and heartwarming at the same time."
    }
];

myLibrary.forEach(book => display(book));


// Display "new book" form

let openForm = document.getElementById("open-form");
openForm.addEventListener("click", showForm);

let closeForm = document.getElementById("close-form");
closeForm.addEventListener("click", showForm);

let newBookDiv = document.getElementById("new-book-form1");

function showForm() {
    //Reset stuff
    stars.forEach(star => star.style.color = "#E3E0DA");
    enableRating();
    if (newBookDiv.style.display == "block") {
        document.getElementById("new-book-form").reset();
        myLibrary.forEach(book => book.edit = "");
        newBookDiv.style.display = "none";
    } else {
        newBookDiv.style.display = "block";
        //Show correct header
        document.querySelector(".h2add").style.display = "block";
        document.querySelector(".h2edit").style.display = "none";
    }
}


// Enable rating only if book is marked as read

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


// Style rating input

stars = ratingDiv.querySelectorAll("label");

stars.forEach (star => star.addEventListener("click", addStars));
stars.forEach (star => star.addEventListener("mouseover", addStars));
stars.forEach (star => star.addEventListener("mouseout", checkStars));

function addStars() {
    stars.forEach((star) => {
        if (Number(star.getAttribute("for")) <= Number(this.getAttribute("for"))) {
            star.style.color = "#4DB6AC";
        } else {
            star.style.color = "#E3E0DA";
        }
    })
}

function checkStars() {
    if (!ratingDiv.querySelector("input:checked")) {
        stars.forEach(star => star.style.color = "#E3E0DA");
        return;
    } else {
    stars.forEach((star) => {
        //When user removes mouse from stars, stars revert to displaying the rating which was selected with a click
        //So an accidental mouse in/mouse out can't appear to change the rating
        if (Number(star.getAttribute("for")) <= Number((ratingDiv.querySelector("input:checked")).getAttribute("id"))) {
            star.style.color = "#4DB6AC";
        } else {
            star.style.color = "#E3E0DA";
        }
    })
}}



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
    //Validate required fields
    if (document.getElementById("title").value == "") {
        document.getElementById("title").classList.add("required");
        document.querySelector(".titlerequired").style.display = "block";
    }
    if (document.getElementById("author").value == "") {
        document.getElementById("author").classList.add("required");
        document.querySelector(".authorrequired").style.display = "block";
    }
    if (document.getElementById("title").value == "" || document.getElementById("author").value == "") {
        return;
    }
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
    //Make a new book object
    let myBook = new Book(title, author, readStatus, rating, notes);
    //Determine if this is a new book or an edit of an existing book
    let editIndex = myLibrary.findIndex(book => book.edit == true);
    if (editIndex == -1) {
        //If new book, push to myLibrary array
        myLibrary.push(myBook);
    } else {
        //If edit of existing book, replace existing entry with the new data
        myLibrary.splice(editIndex, 1, myBook);
    }
    //Display on page
    document.getElementById("booklist").innerHTML = ``;
    myLibrary.forEach(book => display(book));
    //Reset edit flag
    myBook.edit = "";
    //Reset form
    showForm();
    myLibrary.forEach(book => book.edit = "");
    //document.getElementById("new-book-form").reset();
    stars.forEach(star => star.style.color = "#E3E0DA");
    enableRating();
}

let submit = document.getElementById("submit");
submit.addEventListener("click", addBook);


// More validating required fields

document.getElementById("title").addEventListener("click", activeTitle)
document.getElementById("author").addEventListener("click", activeTitle)

function activeTitle() {
    this.classList.remove("required");
    document.querySelector(`.${this.id}required`).style.display = "none";
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
        let star = `<span class="material-icons-sharp colored">star_rate</span>`;
        let emptyStar = `<span class="material-icons-sharp uncolored">star_rate</span>`;
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
    div.setAttribute("num", (document.querySelectorAll(".card")).length - 1);
}

// Delete book

document.getElementById("booklist").addEventListener("click", deleteBook);

function deleteBook(e) {
    if (e.target.classList.contains("delete")) {
        let bookIndex = ((e.target.parentNode.parentNode).getAttribute("num"));
        myLibrary.splice(bookIndex, 1);
        document.getElementById("booklist").innerHTML = ``;
        myLibrary.forEach(book => display(book));
    } else {
        return;
    }
}


// Edit book

document.getElementById("booklist").addEventListener("click", editBook);

function editBook(e) {
    if (e.target.classList.contains("edit")) {
        //Show correct header
        document.querySelector(".h2add").style.display = "none";
        document.querySelector(".h2edit").style.display = "block";
        //Find the book in the array
        let bookIndex = ((e.target.parentNode.parentNode).getAttribute("num"));
        let bookData = myLibrary.at(bookIndex)
        //Flag as editing
        bookData.edit = true;
        //Get title
        document.getElementById("title").value = bookData.title;
        //Get author
        document.getElementById("author").value = bookData.author;
        //Get status
        document.querySelector(`input[value="${bookData.readStatus}"`).checked = true;
        //Get rating
        if (bookData.rating) {
            enableRating();
            document.querySelector(`input[value="${bookData.rating}"`).checked = true;
            checkStars();
        } else {
            ratingDiv.style.display = "none";
            checkStars();
        }
        //Get notes
        document.getElementById("notes").value = bookData.notes;
        //Diplay "edit book" form
        if (newBookDiv.style.display == "block") {
            newBookDiv.style.display = "none";
        } else {
            newBookDiv.style.display = "block";
        }
    } else {
        return;
    }
}