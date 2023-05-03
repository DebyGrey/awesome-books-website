let bookCollection = JSON.parse(localStorage.getItem('books')) || [];

// Function to add a new book object to the collection
function addBookToCollection(newBook) {
  bookCollection.push(newBook);
  localStorage.setItem('books', JSON.stringify(bookCollection));
}

// Function to remove a book object from the collection
function removeBookFromCollection(title) {
  bookCollection = bookCollection.filter((book) => book.title !== title);
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

const addBookBtn = document.querySelector('#add-book-btn');
const titleField = document.querySelector('#title');
const authorField = document.querySelector('#author');
addBookBtn.addEventListener('click', (event) => {
  event.preventDefault();

  if (titleField.value === '') {
    titleField.focus();
    return;
  }

  if (authorField.value === '') {
    authorField.focus();
    return;
  }

  const newBook = {
    title: titleField.value,
    author: authorField.value,
  };

  addBookToCollection(newBook);
  displayBooks();
});

addBookBtn.querySelectorAll('input').forEach((input) => {
  input.addEventListener('change', () => {
    const formData = {
      title: addBookBtn.title.value,
      author: addBookBtn.author.value,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
  });
});

// Check if form data exists in local storage on page load
