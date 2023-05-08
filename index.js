const form = document.querySelector('#add-book-form');
const bookList = document.querySelector('#book-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const title = titleInput.value;
  const author = authorInput.value;

  const bookItem = document.createElement('li');
  const bookInfo = document.createElement('span');
  const deleteButton = document.createElement('button');

  bookInfo.textContent = `${title}  ${author}`;
  deleteButton.textContent = 'Remove';

  bookItem.appendChild(bookInfo);
  bookItem.appendChild(deleteButton);

  bookList.appendChild(bookItem);

  titleInput.value = '';
  authorInput.value = '';
});

bookList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const bookItem = event.target.parentElement;
    bookList.removeChild(bookItem);
  }
});
