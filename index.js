// Collection of books using array of objects
// Initialize the book collection from local storage or an empty array
let bookCollection = JSON.parse(localStorage.getItem('books')) || [];

// Function to add a new book object to the collection
function addBookToCollection(newBook) {
  bookCollection.push(newBook);
  // update the local storage
  localStorage.setItem('books', JSON.stringify(bookCollection));
}

// Function to remove a book object from the collection
function removeBookFromCollection(title) {
  bookCollection = bookCollection.filter((book) => book.title !== title);
  // update the local storage
  localStorage.setItem('books', JSON.stringify(bookCollection));
}

// Function to display all books
const bookList = document.querySelector('.book-list');

function displayBooks() {
  bookList.innerHTML = '';
  bookCollection.forEach((book) => {
    const bookListItem = document.createElement('div');
    bookListItem.innerHTML = `${book.title} <br> ${book.author} <br> `;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeBookFromCollection(book.title);
      displayBooks();
    });
    const hr = document.createElement('hr');
    bookListItem.append(removeBtn, hr);
    bookList.appendChild(bookListItem);
  });
}

// Get all input and form ids
const addBookBtn = document.querySelector('#add-book-btn');
const titleField = document.querySelector('#title');
const authorField = document.querySelector('#author');
addBookBtn.addEventListener('click', (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Validate form data
  // Validate the title field
  if (titleField.value === '') {
    titleField.focus();
    return;
  }
  // Validate the author field
  if (authorField.value === '') {
    authorField.focus();
    return;
  }
  // Add a new book to the collection
  const newBook = {
    title: titleField.value,
    author: authorField.value,
  };
  // Prints the updated collection array with the new book object added
  addBookToCollection(newBook);
  displayBooks();
});

// Add event listener to form input fields' change event
addBookBtn.querySelectorAll('input').forEach((input) => {
  input.addEventListener('change', () => {
    // Store form data in object
    const formData = {
      title: addBookBtn.title.value,
      author: addBookBtn.author.value,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
  });
});

// Check if form data exists in local storage on page load
window.addEventListener('load', () => {
  const storedFormData = localStorage.getItem('formData');
  if (storedFormData) {
    // Parse stored form data into an object
    const parsedFormData = JSON.parse(storedFormData);

    // Populate form fields with stored data
    titleField.value = parsedFormData.title;
    authorField.value = parsedFormData.author;
  }
});
// Display the initial collection of books
displayBooks();