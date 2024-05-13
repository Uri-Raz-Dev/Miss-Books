
import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    createBook,
    addReview,
    emptyReview,
    removeReview
}
window.bs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')

                books = books.filter(book => regExp.test(book.title))

            }

            if (filterBy.price) {
                books = books.filter((book) => {
                    const { listPrice: { amount } } = book
                    const bookPrice = parseFloat(amount)
                    return bookPrice <= filterBy.price
                })

            }
            if (filterBy.date) {
                books = books.filter((book) => {
                    const { publishedDate } = book
                    const bookDate = parseFloat(publishedDate)
                    return bookDate <= filterBy.date
                })

            }

            if (filterBy.authors) {
                const regExp = new RegExp(filterBy.authors, 'i')

                books = books.filter(book => regExp.test(book.authors))
            }
            return books
        })
}


function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevCarId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}


export function createBook() {
    const emptyBook = {
        title: '',
        subtitle: '',
        authors: [''],
        publishedDate: 0,
        description: '',
        pageCount: 0,
        categories: [''],
        thumbnail: '',
        language: 'en',
        listPrice: {
            amount: 0,
            currencyCode: '',
            isOnSale: false
        }
    };

    return emptyBook
}



function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}


function getDefaultFilter(filterBy = { title: '', price: 0, date: 0, authors: '' }) {
    return {
        title: filterBy.title, price: filterBy.price,
        date: filterBy.date, authors: filterBy.authors
    }
}

function _setNextPrevCarId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}


function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const currencies = ['EUR', 'USD']
    let bookList = utilService.loadFromStorage(BOOK_KEY)
    if (!bookList || bookList.length === 0) {
        bookList = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1), utilService.makeLorem(1)
                ],
                reviews: [],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(100),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `BooksImages/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: currencies[utilService.getRandomIntInclusive(0, currencies.length - 1)] === 'USD' ? utilService.getRandomIntInclusive(80, 500) + '$' : utilService.getRandomIntInclusive(80, 500) + '€',
                    currencyCode: [currencies[utilService.getRandomIntInclusive(0, currencies.length - 1)]],
                    isOnSale: Math.random() > 0.7
                }
            }
            bookList.push(book)
            utilService.saveToStorage(BOOK_KEY, bookList)
        }
        console.log('books', bookList)
    }
}

function addReview(bookId, newReview) {
    const books = utilService.loadFromStorage(BOOK_KEY)
    const book = books.find(book => book.id === bookId)
    const review = newReview
    book.reviews.unshift(review)
    utilService.saveToStorage(BOOK_KEY, books)
    return Promise.resolve(review)
}
// function addReview(bookId, newReview) {
//     return storageService.get(BOOK_KEY, bookId)
//         .then(book => book.reviews.unshift(newReview))
// }

function removeReview(bookId, reviewId) {
    let books = utilService.loadFromStorage(BOOK_KEY)
    let book = books.find((book) => book.id === bookId)
    const newReviews = book.reviews.filter((review) => review.id !== reviewId)
    book.reviews = newReviews
    utilService.saveToStorage(BOOK_KEY, books)
    return Promise.resolve()
}

function emptyReview(id = utilService.makeId(),
    fullName = 'book fan', readAt = new Date().toJSON().slice(0, 10), rating = 0, txt = '') {
    return { id, fullName, readAt, rating, txt }
}