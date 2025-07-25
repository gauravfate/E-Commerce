import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" />

            <Routes>
                <Route path="/" element={<UserLayout />}>
                    {/* User Layout */}
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile /> } />
                </Route>

                <Route>{/* Admin Layout */}</Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
