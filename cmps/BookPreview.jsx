
export function BookPreview({ book }) {
    const { title, subtitle, listPrice: { amount, isOnSale }, thumbnail, authors, publishedDate } = book
    console.log(book);
    return <section className="book-preview grid">
        <img src={thumbnail} alt="book tumbnail" />

        <h2>{`${title} (${subtitle})`}</h2>
        <h3>{`by ${[authors]}`}</h3>
        <p>{`Published ${publishedDate}`}</p>
        <span className="price">{amount}</span>
        {isOnSale && <span className="sale">On Sale!</span>}

    </section>
}