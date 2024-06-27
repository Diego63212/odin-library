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
    showBooks()
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
    bookGrid.innerHTML = ''
    myLibrary.forEach((element, index) => {
        const bookContainer = document.createElement('div');
        bookContainer.classList.toggle('book-container')
        for (const property in element) {
            if (element.hasOwnProperty(property)) {
                const newDiv = document.createElement('div');
                newDiv.textContent = element[property];
                bookContainer.appendChild(newDiv)
            }
        }
        const removeBookBtn = document.createElement('button')
        removeBookBtn.textContent = 'Remove'
        bookContainer.appendChild(removeBookBtn)
        bookContainer.dataset.index = index;
        bookGrid.appendChild(bookContainer)
    })
}

/* function addBook() {} */

// Remove book from array and html
containerDiv.addEventListener('click', (e) => {
    const element = e.target.parentElement;
    if (element.dataset.index) {
        myLibrary.splice(element.dataset.index, 1)
        bookGrid.removeChild(e.target.parentElement)
    }
})