import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" />
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    {/* User Layout */}
                    <Route index element={<Home />} />
                </Route>

                <Route>{/* Admin Layout */}</Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
