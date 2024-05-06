
const { useState, useEffect, useRef } = React

export function BookFilter({ filterBy, onFilter, selectedFilter, onSelectFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [selectedFilterToEdit, setSelectedFilterToEdit] = useState(selectedFilter)

    useEffect(() => {
        onFilter(filterByToEdit);
        onSelectFilter(selectedFilterToEdit)


    }, [filterByToEdit, selectedFilterToEdit])


    useEffect(() => {
        setFilterByToEdit(prevFilterBy => ({
            ...prevFilterBy,
            title: '',
            price: 0,
            authors: '',
            date: 0,
        }))
    }, [selectedFilterToEdit])


    function handleChange({ target }) {
        const { name, value } = target

        setFilterByToEdit(prevFilterBy => ({
            ...prevFilterBy,
            [name]: name === 'price' || name === 'date' ? +value : value
        }))
    }

    return <section className="book-filter flex">
        <label htmlFor="">
            <select value={selectedFilterToEdit} onChange={e => setSelectedFilterToEdit(e.target.value)}>

                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="authors">Authors</option>
                <option value="date">Published At</option>
            </select>
        </label>

        {selectedFilterToEdit === 'title' && <input onChange={handleChange} value={filterByToEdit.title} name="title" type="text" placeholder="Book Title" />}

        {selectedFilterToEdit === 'price' && <input onChange={handleChange} value={filterByToEdit.price === 0 ? '' : filterByToEdit.price} name="price" type="number" placeholder="Price" />}

        {selectedFilterToEdit === 'authors' && <input onChange={handleChange} value={filterByToEdit.authors === 0 ? '' : filterByToEdit.authors} name="authors" type="text" placeholder="Authors" />}

        {selectedFilterToEdit === 'date' && <input onChange={handleChange} value={filterByToEdit.date === 0 ? '' : filterByToEdit.date} name="date" type="number" placeholder="Book Publish Date" />}
    </section>
}