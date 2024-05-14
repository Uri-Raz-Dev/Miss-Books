const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { BookAdd } from "./pages/BookAdd.jsx"


export function RootCmp() {

    return (

        <Router>
            <section className="app main-layout grid">
                <AppHeader>AppHeader</AppHeader>
                <main>
                    <Routes>

                        <Route path="/" element={<HomePage />}></Route>

                        <Route path="/about" element={<AboutUs />}></Route>

                        <Route path="/book" element={<BookIndex />}></Route>

                        <Route path="/book/:bookId" element={<BookDetails />}></Route>

                        <Route path="/book/edit/" element={<BookEdit />}></Route>

                        <Route path="/book/edit/:bookId" element={<BookEdit />}></Route>

                        <Route path="/book/discover/" element={<BookAdd />}></Route>

                    </Routes>
                </main>
            </section>

        </Router>

    )
}