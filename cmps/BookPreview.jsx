
export function BookPreview({ book }) {
    const { title, description, listPrice: { amount, isOnSale }, thumbnail } = book
    return <section className="book-preview">
        <img src={thumbnail} alt="book tumbnail" />
        <div className="book-details">
            <h2>{title}</h2>
            <p>{description}</p>
            <span>{amount}</span>
            {isOnSale && <span>On Sale!</span>}
        </div>
    </section>
}