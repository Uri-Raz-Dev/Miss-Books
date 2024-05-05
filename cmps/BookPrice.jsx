

export function BookPrice({ book }) {
    const { listPrice: { amount } } = book
    const bookPrice = parseFloat(amount)
    switch (true) {
        case bookPrice > 300:
            return <span style={{ color: "red" }} className="price">{amount}</span>


        case bookPrice < 200:
            return <span style={{ color: "green" }} className="price">{amount}</span>

        default:
            return <span className="price">{amount}</span>
    }
}