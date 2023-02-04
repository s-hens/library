let myLibrary = [];

function Book(title, author, read, rating) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.rating = rating;
}

function addBook() {
    let title = prompt(`Title:`);
    let author = prompt(`Author:`);
    let read = prompt(`Have you read this book?`);
    let rating = prompt(`If you have read it, how do you rate it?`);
    let myBook = new Book(title, author, read, rating);
    myLibrary.push(myBook);
    console.table(myLibrary);
}

addBook();

