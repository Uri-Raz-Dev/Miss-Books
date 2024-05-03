const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
import { AppHeader } from "./cmps/AppHeader.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"
export function RootCmp() {

    return (

        <Router>
            <section className="app main-layout grid">
                <AppHeader>AppHeader</AppHeader>
                <main>
                    <Routes>

                        <Route path="/" element={<HomePage />}></Route>

                        <Route path="/about" element={<AboutUs />}></Route>

                        <Route path="/books" element={<BookIndex />}></Route>

                    </Routes>
                </main>
            </section>

        </Router>

    )
}