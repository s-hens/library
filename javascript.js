let myLibrary = [
    {
        title: "Norse Mythology",
        author: "Neil Gaiman",
        read: "Yes",
        rating: "Great"
    },
    {
        title: "Gone Girl",
        author: "Gillian Flynn",
        read: "Yes",
        rating: "Good"
    }
];
let bookList = document.getElementById("booklist");

function Book(title, author, read, rating) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.rating = rating;
}

function display(book) {
    let div = document.createElement("div");
    div.innerHTML = `${book.title} by ${book.author}<br>Read? ${book.read}<br>Rated: ${book.rating}`;
    div.classList.add("card");
    bookList.appendChild(div);
}

myLibrary.forEach(book => display(book));

function addBook() {
    let title = prompt(`Title:`);
    let author = prompt(`Author:`);
    let read = prompt(`Have you read this book?`);
    let rating = prompt(`If you have read it, how do you rate it?`);
    let myBook = new Book(title, author, read, rating);
    myLibrary.push(myBook);
    display(myBook);
    //console.table(myLibrary);
}

addBook();