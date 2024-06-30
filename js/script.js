const myLibrary = [];
const containerDiv = document.querySelector('.container')
const bookGrid = document.querySelector('.book-grid')
const dialogBtn = document.querySelector('.dialog-btn')
const dialog = document.querySelector('.dialog')
const bookForm = document.querySelector('.book-form')
const inputName = document.querySelector('#book-name')
const inputAuthor = document.querySelector('#book-author')
const inputPages = document.querySelector('#book-pages')
const inputRead = document.querySelector('#book-read')

const debugBtn = document.querySelector('#debugBtn')

debugBtn.addEventListener('click', () => {
    addBookToLibrary()
    showBooks()
})

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

Book.prototype.getIndex = function () {
    myLibrary.indexOf(this);
}

function addBookToLibrary() {
  let newBook = new Book('Hello2', 'Me', ((Math.random() * 100) + 1).toFixed(0), false)
  myLibrary.push(newBook);
}
// Add books from the library to the html
function showBooks() {
    bookGrid.innerHTML = ''
    myLibrary.forEach((element) => {
        // Create the container
        const bookContainer = document.createElement('div');
        const bookName = document.createElement('div');
        const bookAuthor = document.createElement('div');
        const bookInfo = document.createElement('div');
        const bookRead = document.createElement('label');
        const readCheckbox = document.createElement('input');
        const removeBookBtn = document.createElement('button')
        
        bookName.textContent = element.name;
        bookAuthor.textContent = 'by ' + element.author;
        bookInfo.innerHTML =`<div>Pages: ${element.pages}</div>`;
        
        bookRead.textContent = 'Read:';
        readCheckbox.setAttribute('type', 'checkbox');
        if (element.read) readCheckbox.setAttribute('checked', true);
        
        // Add svg in remove btn
        removeBookBtn.innerHTML = '<img src="images/icons/remove.svg" alt="Remove">'
        // Add event to remove book
        removeBookBtn.addEventListener('click', () => {
            myLibrary.splice(element.getIndex(), 1)
            bookGrid.removeChild(bookContainer);
        })
        // Add event to toggle read status
        readCheckbox.addEventListener('change', () =>{
            element.read = readCheckbox.checked
        })
        
        bookContainer.classList.toggle('book-container')
        bookAuthor.classList.toggle('info-author')
        bookInfo.classList.toggle('info-data')
        
        bookInfo.appendChild(bookRead)
        bookRead.appendChild(readCheckbox)
        bookContainer.appendChild(bookName);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookInfo);
        bookContainer.appendChild(removeBookBtn);
        bookGrid.appendChild(bookContainer);
    })
}