const containerDiv = document.querySelector('.container')
const dialogBtn = document.querySelector('.dialog-btn')
const dialog = document.querySelector('.dialog')
const bookForm = document.querySelector('.book-form')
const inputName = document.querySelector('#book-name')
const inputAuthor = document.querySelector('#book-author')
const inputPages = document.querySelector('#book-pages')
const inputRead = document.querySelector('#book-read')
const bookGrid = document.querySelector('.book-grid')
const myLibrary = [];

dialogBtn.addEventListener('click', () => {
    dialog.showModal()
})

bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const submittedBook = new Book (inputName.value, inputAuthor.value, inputPages.valueAsNumber, inputRead.checked)
    myLibrary.push(submittedBook)
    /* showBooks() */
    dialog.close()
})

function Book (name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  let newBook = new Book('Hello2', 'Me', 20, false)
  myLibrary.push(newBook);
}
// Add books from the library to the html
function showBooks() {
    /* bookGrid.innerHTML = '' */
    myLibrary.forEach((element, index) => {
        // Create the container
        const bookContainer = document.createElement('div');
        bookContainer.classList.toggle('book-container')
        bookContainer.dataset.index = index;

        // Create remove button
        const removeBookBtn = document.createElement('button')
        removeBookBtn.setAttribute(alt, "Remove this book")
        bookContainer.appendChild(removeBookBtn)

        bookGrid.appendChild(bookContainer)
    })
}

// Remove book from array and html
containerDiv.addEventListener('click', (e) => {
    const elementParent = e.target.parentElement;
    if (elementParent.dataset.index) {
        myLibrary.splice(elementParent.dataset.index, 1)
        bookGrid.removeChild(e.target.parentElement)
    }
})