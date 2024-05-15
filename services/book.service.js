
import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const BOOK_KEY = 'bookDB'
const GOOGLE_BOOK_KEY = 'googleBookDB'
const DEMO_KEY = 'demoDB'
_createBooks()
_demoBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    createBook,
    addReview,
    emptyReview,
    removeReview,
    queryDemoList,
    addDemoBook,
    saveDemoBook
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



function saveDemoBook(book) {
    return storageService.postGoogle(BOOK_KEY, book)
}

function addDemoBook(bookId) {
    return storageService.get(DEMO_KEY, bookId)
        .then((book) => saveDemoBook(book))
}


function queryDemoList(filterBy = {}) {
    return storageService.query(DEMO_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')

                books = books.filter(book => regExp.test(book.title))

            }
            return books
        })
}


// function addGoogleBooks(txt) {
//     let bookList = utilService.loadFromStorage(GOOGLE_BOOK_KEY)
//     if (bookList[txt]) {
//         return Promise.resolve(bookList[txt])
//     }

//     return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${txt}+intitle:keyes&key=AIzaSyARpbTsP-vfn4t0C0QJjNNpHGjZ3wqWkHI`
//     )
//     .then(book=>)
// }

function _demoBooks() {
    let bookList = utilService.loadFromStorage(DEMO_KEY)
    if (!bookList || bookList.length === 0) {
        bookList =
            [
                {
                    kind: "books#volume",
                    id: "nBuA0hmspdMC",
                    etag: "Y8Xn8UwxEJo",
                    selfLink: "https://www.googleapis.com/books/v1/volumes/nBuA0hmspdMC",
                    volumeInfo: {
                        title: "Return of The King",
                        authors: ["David Herman"],
                        publisher: "Addison-Wesley",
                        publishedDate: "2012-11-26",
                        description: "“It’s uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You’ll find when you finish the book that you’ve gained a strong and comprehensive sense of mastery.” —Paul Irish, developer advocate, Google Chrome “This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It’s one of the few books on JS that I’ll recommend without hesitation.” —Alex Russell, TC39 member, software engineer, Google In order to truly master JavaScript, you need to learn how to work effectively with the language’s flexible, expressive features and how to avoid its pitfalls. No matter how long you’ve been writing JavaScript code, Effective JavaScript will help deepen your understanding of this powerful language, so you can build more predictable, reliable, and maintainable programs. Author David Herman, with his years of experience on Ecma’s JavaScript standardization committee, illuminates the language’s inner workings as never before—helping you take full advantage of JavaScript’s expressiveness. Reflecting the latest versions of the JavaScript standard, the book offers well-proven techniques and best practices you’ll rely on for years to come. Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency. Key features include Better ways to use prototype-based object-oriented programming Subtleties and solutions for working with arrays and dictionary objects Precise and practical explanations of JavaScript’s functions and variable scoping semantics Useful JavaScript programming patterns and idioms, such as options objects and method chaining In-depth guidance on using JavaScript’s unique “run-to-completion” approach to concurrency",
                        industryIdentifiers: [{
                            type: "ISBN_13",
                            identifier: "9780132902250"
                        },
                        {
                            type: "ISBN_10",
                            identifier: "0132902257"
                        }
                        ],
                        readingModes: {
                            text: true,
                            image: true
                        },
                        pageCount: 231,
                        printType: "BOOK",
                        categories: ["Computers"],
                        averageRating: 5,
                        ratingsCount: 1,
                        maturityRating: "NOT_MATURE",
                        allowAnonLogging: true,
                        contentVersion: "2.13.10.0.preview.3",
                        panelizationSummary: {
                            containsEpubBubbles: false,
                            containsImageBubbles: false
                        },
                        imageLinks: {
                            smallThumbnail: "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                            thumbnail: "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        },
                        language: "en",
                        previewLink: "http://books.google.com/books?id=nBuA0hmspdMC&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
                        infoLink: "http://books.google.com/books?id=nBuA0hmspdMC&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        canonicalVolumeLink: "https://books.google.com/books/about/Effective_JavaScript.html?hl=&id=nBuA0hmspdMC"
                    },
                    saleInfo: {
                        country: "IL",
                        saleability: "NOT_FOR_SALE",
                        isEbook: false
                    },
                    accessInfo: {
                        country: "IL",
                        viewability: "PARTIAL",
                        embeddable: true,
                        publicDomain: false,
                        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
                        epub: {
                            isAvailable: false
                        },
                        pdf: {
                            isAvailable: false
                        },
                        webReaderLink: "http://play.google.com/books/reader?id=nBuA0hmspdMC&hl=&as_pt=BOOKS&source=gbs_api",
                        accessViewStatus: "SAMPLE",
                        quoteSharingAllowed: false
                    },
                    searchInfo: {
                        textSnippet: "You’ll find when you finish the book that you’ve gained a strong and comprehensive sense of mastery.” —Paul Irish, developer advocate, Google Chrome “This is not a book for those looking for shortcuts; rather it is hard-won ..."
                    }
                },
                {
                    kind: "books#volume",
                    id: "wVDCjwEACAAJ",
                    etag: "FCNZL+W/SnQ",
                    selfLink: "https://www.googleapis.com/books/v1/volumes/wVDCjwEACAAJ",
                    volumeInfo: {
                        title: "Effective Javascript",
                        subtitle: "68 Specific Ways to Harness the Power of Javascript",
                        authors: ["David Herman"],
                        publishedDate: "2016-03-08",
                        description: "\"It's uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You'll find when you finish the book that you've gained a strong and comprehensive sense of mastery.\"-Paul Irish, developer advocate, Google Chrome \"This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It's one of the few books on JS that I'll recommend without hesitation.\"-Alex Russell, TC39 member, software engineer, Google In order to truly master JavaScript, you need to learn how to work effectively with the language's flexible, expressive features and how to avoid its pitfalls. No matter how long you've been writing JavaScript code, Effective JavaScript will help deepen your understanding of this powerful language, so you can build more predictable, reliable, and maintainable programs. Author David Herman, with his years of experience on Ecma's JavaScript standardization committee, illuminates the language's inner workings as never before-helping you take full advantage of JavaScript's expressiveness. Reflecting the latest versions of the JavaScript standard, the book offers well-proven techniques and best practices you'll rely on for years to come. Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You'll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency. Key features include Better ways to use prototype-based object-oriented programming Subtleties and solutions for working with arrays and dictionary objects Precise and practical explanations of JavaScript's functions and variable scoping semantics Useful JavaScript programming patterns and idioms, such as options objects and method chaining In-depth guidance on using JavaScript's unique \"run-to-completion\" approach to concurrency",
                        industryIdentifiers: [{
                            type: "ISBN_10",
                            identifier: "1530427223"
                        },
                        {
                            type: "ISBN_13",
                            identifier: "9781530427222"
                        }
                        ],
                        readingModes: {
                            text: false,
                            image: false
                        },
                        pageCount: 228,
                        printType: "BOOK",
                        maturityRating: "NOT_MATURE",
                        allowAnonLogging: false,
                        contentVersion: "preview-1.0.0",
                        panelizationSummary: {
                            containsEpubBubbles: false,
                            containsImageBubbles: false
                        },
                        language: "en",
                        previewLink: "http://books.google.com/books?id=wVDCjwEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
                        infoLink: "http://books.google.com/books?id=wVDCjwEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        canonicalVolumeLink: "https://books.google.com/books/about/Effective_Javascript.html?hl=&id=wVDCjwEACAAJ"
                    },
                    saleInfo: {
                        country: "IL",
                        saleability: "NOT_FOR_SALE",
                        isEbook: false
                    },
                    accessInfo: {
                        country: "IL",
                        viewability: "NO_PAGES",
                        embeddable: false,
                        publicDomain: false,
                        textToSpeechPermission: "ALLOWED",
                        epub: {
                            isAvailable: false
                        },
                        pdf: {
                            isAvailable: false
                        },
                        webReaderLink: "http://play.google.com/books/reader?id=wVDCjwEACAAJ&hl=&as_pt=BOOKS&source=gbs_api",
                        accessViewStatus: "NONE",
                        quoteSharingAllowed: false
                    },
                    searchInfo: {
                        textSnippet: "&quot;-Paul Irish, developer advocate, Google Chrome &quot;This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It&#39;s one of the few books on JS that I&#39;ll recommend without hesitation."
                    }
                }
            ]
        const editBookList = bookList.map(book => {
            const { id } = book
            const { title, subtitle, publishedDate, description, pageCount, authors, language, imageLinks, categories } = book.volumeInfo
            const thumbnail = imageLinks && imageLinks.thumbnail

            const currencies = ['EUR', 'USD']

            const bookDetails = {
                id: id,
                title: title,
                subtitle: subtitle,
                authors: authors,
                reviews: [],
                publishedDate: publishedDate,
                description: description,
                pageCount: pageCount,
                categories: categories,
                thumbnail: thumbnail,
                language: language,
                listPrice: {
                    amount: currencies[utilService.getRandomIntInclusive(0, currencies.length - 1)] === 'USD' ? utilService.getRandomIntInclusive(80, 500) + '$' : utilService.getRandomIntInclusive(80, 500) + '€',
                    currencyCode: [currencies[utilService.getRandomIntInclusive(0, currencies.length - 1)]],
                    isOnSale: Math.random() > 0.7
                }
            }
            return bookDetails
        })
        utilService.saveToStorage(DEMO_KEY, editBookList)
        return editBookList
    }
}