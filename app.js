/* eslint-disable max-classes-per-file */
// Book class: Represents a book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Store: Handles storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    let books = Store.getBooks();
    books = books.filter((book) => book.title !== title);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class Router {
  static currentSection() {
    const currentSection = localStorage.getItem('currentSection');
    if (currentSection === 'list') {
      Router.showListSection();
    } else if (currentSection === 'add-new') {
      Router.showAddNewBookSection();
    } else if (currentSection === 'contact') {
      Router.showContactSection();
    }
  }

  static getSectionID(e) {
    e.preventDefault();
    const currentSection = e.target.id;
    localStorage.setItem('currentSection', currentSection);
    Router.currentSection();
  }

  static showListSection() {
    const listSection = document.querySelector('.book-list-section');
    const addNewBookSection = document.querySelector('.add-new-book-section');
    const contactSection = document.querySelector('.contact-section');
    const contactLink = document.querySelector('#contact');
    const addNewLink = document.querySelector('#add-new');
    const listLink = document.querySelector('#list');
    listSection.classList.remove('hide-section');
    addNewBookSection.classList.add('hide-section');
    contactSection.classList.add('hide-section');
    listLink.classList.add('active');
    contactLink.classList.remove('active');
    addNewLink.classList.remove('active');
  }

  static showAddNewBookSection() {
    const listSection = document.querySelector('.book-list-section');
    const addNewBookSection = document.querySelector('.add-new-book-section');
    const contactSection = document.querySelector('.contact-section');
    const contactLink = document.querySelector('#contact');
    const addNewLink = document.querySelector('#add-new');
    const listLink = document.querySelector('#list');
    listSection.classList.add('hide-section');
    addNewBookSection.classList.remove('hide-section');
    contactSection.classList.add('hide-section');
    listLink.classList.remove('active');
    contactLink.classList.remove('active');
    addNewLink.classList.add('active');
  }

  static showContactSection() {
    const listSection = document.querySelector('.book-list-section');
    const addNewBookSection = document.querySelector('.add-new-book-section');
    const contactSection = document.querySelector('.contact-section');
    const contactLink = document.querySelector('#contact');
    const addNewLink = document.querySelector('#add-new');
    const listLink = document.querySelector('#list');
    listSection.classList.add('hide-section');
    addNewBookSection.classList.add('hide-section');
    contactSection.classList.remove('hide-section');
    listLink.classList.remove('active');
    contactLink.classList.add('active');
    addNewLink.classList.remove('active');
  }
}

// UI class: Handles UI tasks
class UI {
  static storedBooks = Store.getBooks();

  static displayBooks() {
    const bookList = document.querySelector('.book-list');
    if (UI.storedBooks.length === 0) {
      bookList.innerHTML = 'No books added!';
      bookList.classList.add('book-list-error-msg');
    } else {
      bookList.classList.remove('book-list-error-msg');
      bookList.innerHTML = '';
      UI.storedBooks.forEach((book) => {
        const bookListItem = document.createElement('div');
        bookListItem.classList.add('book-list-item');
        bookListItem.innerHTML = `"${book.title}" by ${book.author}`;
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        const removeBookWithTitle = book.title;
        removeBtn.addEventListener('click', () => {
          UI.removeBookFromCollection(removeBookWithTitle);
        });
        bookListItem.appendChild(removeBtn);
        bookList.appendChild(bookListItem);
      });
    }
  }

  static addBookToCollection(e) {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    if (title === '' || author === '') {
      UI.showAlert('please fill all fields', 'danger');
    } else {
      const book = new Book(title, author);
      Store.addBook(book);
      UI.storedBooks = Store.getBooks();
      UI.showAlert('Book added successfully!', 'success');
      UI.displayBooks();
      UI.clearFields();
    }
  }

  static removeBookFromCollection(removeBookWithTitle) {
    if (removeBookWithTitle) {
      Store.removeBook(removeBookWithTitle);
      UI.storedBooks = Store.getBooks();
      UI.showAlert('Book deleted successfully!', 'success');
      UI.displayBooks();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  static updateInputFields() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const formData = { title, author };
    localStorage.setItem('formData', JSON.stringify(formData));
  }

  static showAlert(message, className) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${className}`;
    alertDiv.appendChild(document.createTextNode(message));
    const header = document.querySelector(
      'header',
    );
    header.insertAdjacentElement('afterend', alertDiv);

    setTimeout(() => alertDiv.remove(), 3000);
  }
}
// Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => UI.addBookToCollection(e));
// Event: Input onchange save data to localstorage
document.querySelector('#title').addEventListener('change', UI.updateInputFields);
document.querySelector('#author').addEventListener('change', UI.updateInputFields);
// Event: show list section
document.querySelector('#list').addEventListener('click', (e) => Router.getSectionID(e));
// Event: show add new book section
document
  .querySelector('#add-new')
  .addEventListener('click', (e) => Router.getSectionID(e));
// Event: show list section
document
  .querySelector('#contact')
  .addEventListener('click', (e) => Router.getSectionID(e));
