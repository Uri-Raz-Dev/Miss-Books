

export function BookAddPreview({ book, onAddBook }) {
    const { id, title } = book
    return <li>
        <h2>{title}</h2>
        <button className="save-google-book" onClick={() => onAddBook(id)}>+</button>
    </li>
}