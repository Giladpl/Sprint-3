import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';
import { booksObj } from './books-obj.service.js';

export const bookService = {
    query,
    getById,
    addReview,
    removeReview,
    saveBook,
    put,
    getBook,
    getOptions,
    getNextBookId,
    getPrevBookId
}

const BOOKS_KEY = 'books';

let gBooks = booksObj.getBooksJason();

function query() {
    return storageService.query(BOOKS_KEY)
        .then(books => {
        if (!books.length) {
            _initReviews();
            utilService.saveToStorage(BOOKS_KEY, gBooks);
            books = gBooks
        }
        return books;
    })
}

function addReview(bookId, review) {
    getById(bookId)
        .then(book => {
            book.reviews.push(review);
            return storageService.put(BOOKS_KEY, book);
        })
}

function removeReview(bookId) {
    return storageService.remove(BOOKS_KEY, bookId);
  }
  
function saveBook(book) {
    if (book.id) {
      return storageService.put(BOOKS_KEY, book);
    } else {
      return storageService.post(BOOKS_KEY, book);
    }
}

function getById(id) {
    return storageService.get(BOOKS_KEY, id);
}

function put(book) {
    return storageService.put(BOOKS_KEY, book);
}

function _initReviews() {
    gBooks.forEach(book => {
        book.reviews = [];
    });
}

const GOOGLE_BOOK_KEY = 'googleBooks';
const OPTIONS_KEY = 'addOptions';

function getOptions(val = 'harry potter') {
    let options = utilService.loadFromStorage(OPTIONS_KEY);
    if (options) return Promise.resolve(options);

    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${val}`)
        .then(res => {
            options = [];
            res.data.items.forEach(item => {
                options.push(item.volumeInfo.title)
            })
            utilService.saveToStorage(OPTIONS_KEY, options)
            return Promise.resolve(options);
        })
}

function getBook(val) {
    let book = utilService.loadFromStorage(`${GOOGLE_BOOK_KEY}_${val}`);
	if (book) return storageService.post(BOOKS_KEY, book);

    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${val}`)
        .then(res => {
            const book = addGoogleBook(res.data.items[0])
            utilService.saveToStorage(`${GOOGLE_BOOK_KEY}_${val}`, book);
            return storageService.post(BOOKS_KEY, book);
        })
}

function addGoogleBook(googleBook) {
    return {
        id: googleBook.id,
        title: googleBook.volumeInfo.title,
        subtitle: googleBook.searchInfo.textSnippet,
        authors: googleBook.volumeInfo.authors,
        publishedDate: googleBook.volumeInfo.publishedDate,
        description: googleBook.volumeInfo.description,
        pageCount: googleBook.volumeInfo.pageCount,
        categories: googleBook.volumeInfo.categories,
        thumbnail: googleBook.volumeInfo.imageLinks.thumbnail,
        language: googleBook.volumeInfo.language,
        listPrice: {
            amount: utilService.getRandomInt(0, 200),
            currencyCode: googleBook.saleInfo.country,
            isOnSale: Math.random() < 0.5
        }
    }
}

function getNextBookId(bookId) {
    const books = utilService.loadFromStorage(BOOKS_KEY)
    const idx = books.findIndex(book => book.id === bookId);
    if (idx + 1 >= books.length) return books[0].id
    return books[idx + 1].id
}

function getPrevBookId(bookId) {
    const books = utilService.loadFromStorage(BOOKS_KEY)
    const idx = books.findIndex(book => book.id === bookId);
    if (idx - 1 < 0) return books[books.length - 1].id
    return books[idx - 1].id
}
