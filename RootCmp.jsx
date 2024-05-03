const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
                <main>
                    <Routes>

                    </Routes>
                </main>
            </section>

        </Router>
    )
}