
export function BookPublishedDate({ book }) {
    const { publishedDate, language } = book
    const date = publishedDate
    switch (true) {
        case date >= 10:
            return <span>{`First published ${publishedDate}, Vintage, ${language}`}</span>
        case date < 10:
            return <span>{`First published ${publishedDate}, New, ${language}`}</span>



    }
}