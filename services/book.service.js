
import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    _createBooks
}


function _createBook(title, price, isOnSale, currencyCode) {

    const book = {
        id: utilService.makeId(),
        title,
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


        bookList.push(_createBook('Gwent', 50, true, 'EUR'),
            _createBook('Between Here And Gone', 30, false, 'USD'),
            _createBook('Magic Lantern', 25, true, 'EUR'))


        utilService.saveToStorage(BOOK_KEY, bookList)
    }

}



