
import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save
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
                    const bookPrice = amount
                    return bookPrice
                })

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

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function _setNextPrevCarId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextbook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevbook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextbookId = nextbook.id
        book.prevbookId = prevbook.id
        return book
    })
}

function _createBook(title, price, isOnSale, currencyCode, idx) {

    const book = {
        id: utilService.makeId(),
        title,
        description: utilService.makeLorem(10),
        thumbnail: `BooksImages/${idx}.jpg`,
        listPrice: {
            amount: currencyCode === 'USD' ? price + '$' : price + '€',
            currencyCode,
            isOnSale
        }
    }
    return book
}

function _createBooks() {
    let bookList = utilService.loadFromStorage(BOOK_KEY)
    if (!bookList || bookList.length === 0) {
        bookList = []


        bookList.push(_createBook('Gwent', 50, true, 'EUR', 1),
            _createBook('Between Here And Gone', 30, false, 'USD', 2),
            _createBook('Magic Lantern', 25, true, 'EUR', 3))


        utilService.saveToStorage(BOOK_KEY, bookList)
    }

}



