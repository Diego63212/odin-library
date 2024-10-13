const myLibrary = [];
const containerDiv = document.querySelector('.container');
const bookGrid = document.querySelector('.book-grid');
const dialog = document.querySelector('.dialog');
const dialogClose = document.querySelector('#dialog-close');
const bookForm = document.querySelector('.book-form');
const inputName = document.querySelector('#book-name');
const inputAuthor = document.querySelector('#book-author');
const inputPages = document.querySelector('#book-pages');
const inputRead = document.querySelector('#book-read');
const newBookBtn = document.querySelector('.book-container-add');

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    static getIndex() {
        return myLibrary.indexOf(this);
    }
}

function addBookToLibrary() {
    myLibrary.push(new Book (inputName.value, inputAuthor.value, inputPages.valueAsNumber, inputRead.checked));
    dialog.close();
    showBooks();
}

function addBook() {
    const bookContainer = document.createElement('div');
    const bookName = document.createElement('div');
    const bookAuthor = document.createElement('div');
    const bookInfo = document.createElement('div');
    const bookRead = document.createElement('label');
    const readCheckbox = document.createElement('input');
    const removeBookBtn = document.createElement('button');
    
    bookName.textContent = this.name;
    bookAuthor.textContent = 'by ' + this.author;
    bookAuthor.classList.toggle('info-author');
    bookInfo.innerHTML =`<div>Pages: ${this.pages}</div>`;
    bookInfo.classList.toggle('info-data');
    
    bookRead.textContent = 'Read: ';
    readCheckbox.setAttribute('type', 'checkbox');
    if (this.read) readCheckbox.setAttribute('checked', true);
    
    // Add svg in remove btn
    removeBookBtn.innerHTML = '<img src="images/icons/remove.svg" alt="Remove">';
    // Add event to remove book
    removeBookBtn.addEventListener('click', () => {
        myLibrary.splice(Book.getIndex(), 1);
        bookGrid.removeChild(bookContainer);
    });
    // Add event to toggle read status
    readCheckbox.addEventListener('change', () => {
        this.read = readCheckbox.checked;
    });
    
    bookInfo.appendChild(bookRead);
    bookRead.appendChild(readCheckbox);
    bookContainer.appendChild(bookName);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookInfo);
    bookContainer.appendChild(removeBookBtn);
    bookContainer.classList.toggle('book-container');
    return bookContainer;
}

// Add books from the library to the html
function showBooks() {
    const fragment = document.createDocumentFragment();
    myLibrary.forEach((element) => {
        const createBook = addBook.call(element)
        fragment.appendChild(createBook);
    });
    fragment.appendChild(newBookBtn);
    bookGrid.replaceChildren(fragment);
}

newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
});

dialogClose.addEventListener('click', () => dialog.close());

myLibrary.push(new Book ('Think like a programmer', 'V. Anton Spraul', '256', false)); // Add default book

showBooks(); // Render default book