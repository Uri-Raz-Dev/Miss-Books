
export function BookReadingDifficulty({ book }) {
    const { pageCount } = book

    const numOfPages = pageCount
    switch (true) {
        case numOfPages > 500:
            return <span>{`${pageCount} pages , Serious Reading`}</span>
        case numOfPages > 200:
            return <span>{`${pageCount} pages , Decent Reading`}</span>
        case numOfPages < 100:
            return <span>{`${pageCount} pages ,Light Reading
 `}</span>

    }
}