

export function BookAddPreview({ book }) {
    const { title } = book.volumeInfo
    return <li>
        <h2>{title}</h2>
        <button className="save-google-book">+</button>
    </li>
}