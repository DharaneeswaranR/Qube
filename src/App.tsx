import Login from "./pages/Login";
import Home from "./pages/Home"
import { Route, Routes } from 'react-router-dom'
import AuthRequired from './components/AuthRequired'
import Layout from "./components/Layout"
import Profile from "./pages/Profile"
import PostPage from "./pages/PostPage";


function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
                <Route element={<AuthRequired />} >
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/post/:id' element={<PostPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
