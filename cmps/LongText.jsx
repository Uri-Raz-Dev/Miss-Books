

const { useState, useEffect, useRef } = React

export function LongText({ book }) {

    const { description } = book
    const [read, setRead] = useState(false)

    function readMore() {
        return setRead(prevRead => !prevRead)
    }

    return (<React.Fragment>
        <p>{read ? description : description.slice(description.length / 2, description.length)}<span className="read-more" onClick={() => readMore()}>{read ? ' Read Less...' : ' Read More...'}</span></p>
    </React.Fragment>
    )
}