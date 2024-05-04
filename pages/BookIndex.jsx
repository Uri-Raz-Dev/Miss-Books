import { bookService } from "../services/book.service.js"

const { useState, useEffect, useRef } = React
bookService

export function BookIndex() {
    useEffect(() => {
        console.log(bookService._createBooks());
    }, []);
    return <h1>book</h1>
}