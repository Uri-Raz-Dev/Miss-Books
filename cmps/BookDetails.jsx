
const { useState, useEffect, useRef } = React

export function BookDetails({ book, onClose }) {
    const { title, description, listPrice: { amount, isOnSale }, thumbnail } = book

    return <section className="BookDetails">
        <img src={thumbnail} alt="book tumbnail" />

        <h2>{title}</h2>
        <p>{description}</p>
        <span className="price">{amount}</span>
        {isOnSale && <span className="sale">On Sale!</span>}
        <button onClick={onClose}>close</button>

    </section>
}