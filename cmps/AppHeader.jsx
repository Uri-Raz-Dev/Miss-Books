const { NavLink } = ReactRouterDOM



export function AppHeader() {

    return (
        <header className="main-header full flex">
            <NavLink to="/" className="logo">Miss Books</NavLink>
            <nav className="links-container flex">

                <NavLink to="/">Home</NavLink>

                <NavLink to="/about">About</NavLink>

                <NavLink to="/book">Books</NavLink>
            </nav>
        </header>
    )
}