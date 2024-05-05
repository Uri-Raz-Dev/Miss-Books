
export function BookPublishedDate({ book }) {
    const { publishedDate } = book
    const date = publishedDate
    switch (true) {
        case date >= 10:
            return <span>{`First published ${publishedDate}, Vintage`}</span>
        case date < 10:
            return <span>{`First published ${publishedDate}, New`}</span>



    }
}