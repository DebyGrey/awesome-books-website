/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem("books")) || [];
    this.addBookBtn = document.querySelector("#add-book-btn");
    this.titleField = document.querySelector("#title");
    this.authorField = document.querySelector("#author");
    this.bookList = document.querySelector(".book-list");
    this.addBookBtn.addEventListener("click", (event) =>
      this.addBookToCollection(event)
    );
    this.titleField.addEventListener("change", () => this.updateInputFields());
    this.authorField.addEventListener("change", () => this.updateInputFields());

    // Check if form data exists in local storage on page load
    window.addEventListener("load", () => {
      const storedFormData = localStorage.getItem("formData");
      if (storedFormData) {
        const parsedFormData = JSON.parse(storedFormData);
        this.titleField.value = parsedFormData.title;
        this.authorField.value = parsedFormData.author;
      }
    });

    this.displayBooks();
  }

  // Update input fields
  updateInputFields() {
    const formData = {
      title: this.titleField.value,
      author: this.authorField.value,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }

  // Function to add a new book object to the collection
  addBookToCollection(event) {
    event.preventDefault();
    const title = this.titleField.value;
    const author = this.authorField.value;

    if (title === "") {
      this.titleField.focus();
      return;
    }

    if (author === "") {
      this.authorField.focus();
      return;
    }

    const book = new Book(title, author);
    this.books.push(book);
    localStorage.setItem("books", JSON.stringify(this.books));
    this.displayBooks();
  }

  // Function to remove a book object from the collection
  removeBookFromCollection(title) {
    this.books = this.books.filter((book) => book.title !== title);
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  // Function to display all books
  displayBooks() {
    this.bookList.innerHTML = "";
    this.books.forEach((book) => {
      const bookListItem = document.createElement("div");
      bookListItem.innerHTML = `${book.title} <br> ${book.author} <br> `;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        this.removeBookFromCollection(book.title);
        this.displayBooks();
      });
      const hr = document.createElement("hr");
      bookListItem.append(removeBtn, hr);
      this.bookList.appendChild(bookListItem);
    });
  }
}

/* eslint-disable no-new */
new BookCollection();
