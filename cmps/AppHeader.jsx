const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header>
            <div className="logo">Miss Books</div>
            <nav className="links-container">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book">Book Index</NavLink>
            </nav>
        </header>
    )
}