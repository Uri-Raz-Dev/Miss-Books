
const { useState, useEffect, useRef } = React

export function BookFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)

    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, value } = target

        setFilterByToEdit(prevFilterBy => ({
            ...prevFilterBy,
            [name]: name === 'price' ? +value : value
        }))
    }

    return <section className="book-filter flex">
        <input onChange={handleChange} value={filterByToEdit.title} name="title" type="text" placeholder="Book Title" />
        <input onChange={handleChange} value={filterByToEdit.price === 0 ? '' : filterByToEdit.price} name="price" type="number" placeholder="Price" />
    </section>
}