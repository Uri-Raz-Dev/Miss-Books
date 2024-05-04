
export function BookPreview({ book }) {
    const { title, description, listPrice: { amount, isOnSale }, thumbnail } = book
    return <section className="book-preview grid">
        <img src={thumbnail} alt="book tumbnail" />

        <h2>{title}</h2>
        <p>{description}</p>
        <span className="price">{amount}</span>
        {isOnSale && <span className="sale">On Sale!</span>}

    </section>
}