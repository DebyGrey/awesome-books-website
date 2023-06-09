/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.addBookBtn = document.querySelector('#add-book-btn');
    this.addBookForm = document.querySelector('form');
    this.titleField = document.querySelector('#title');
    this.authorField = document.querySelector('#author');
    this.bookList = document.querySelector('.book-list');
    this.addBookForm.addEventListener('submit', (event) => this.addBookToCollection(event));
    // this.addBookBtn.addEventListener('click', (event) => this.addBookToCollection(event));
    this.titleField.addEventListener('change', () => this.updateInputFields());
    this.authorField.addEventListener('change', () => this.updateInputFields());

    // Check if form data exists in local storage on page load
    window.addEventListener('load', () => {
      const storedFormData = localStorage.getItem('formData');
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
    localStorage.setItem('formData', JSON.stringify(formData));
  }

  // Function to add a new book object to the collection
  addBookToCollection(event) {
    event.preventDefault();
    const title = this.titleField.value;
    const author = this.authorField.value;

    if (title === '') {
      this.titleField.focus();
      return;
    }

    if (author === '') {
      this.authorField.focus();
      return;
    }

    const book = new Book(title, author);
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
    this.addBookForm.reset();
    localStorage.removeItem('formData');
  }

  // Function to remove a book object from the collection
  removeBookFromCollection(title) {
    this.books = this.books.filter((book) => book.title !== title);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  // Function to display all books
  displayBooks() {
    if (this.books.length === 0) {
      this.bookList.innerHTML = 'No books added!';
      this.bookList.classList.add('book-list-error-msg');
    } else {
      this.bookList.classList.remove('book-list-error-msg');
      this.bookList.innerHTML = '';
      this.books.forEach((book) => {
        const bookListItem = document.createElement('div');
        bookListItem.classList.add('book-list-item');
        bookListItem.innerHTML = `"${book.title}" by ${book.author}`;
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
          this.removeBookFromCollection(book.title);
          this.displayBooks();
        });
        bookListItem.appendChild(removeBtn);
        this.bookList.appendChild(bookListItem);
      });
    }
  }
}

/* eslint-disable no-new */
new BookCollection();
