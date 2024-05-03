const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
import { AppHeader } from "./cmps/AppHeader.jsx"
export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout grid">
                <AppHeader>AppHeader</AppHeader>
                <main>
                    <Routes>

                    </Routes>
                </main>
            </section>

        </Router>
    )
}