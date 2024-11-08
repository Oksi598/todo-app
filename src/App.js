import React, { useEffect } from "react";
import MainPage from "./pages/mainPage/MainPage";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import { Route, Routes, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "./hooks/useAction";
import { Container, Grid, Button } from "@mui/material";

const App = () => {
    const { isAuth } = useSelector((store) => store.auth);
    const { signInByToken } = useAction();

    useEffect(() => {
        const token = localStorage.getItem("auth");

        if (token !== null && token !== undefined) {
            signInByToken(token);
        }
    }, [signInByToken]);

    return (
        <Container sx={{ pt: 3 }} fixed maxWidth="xl">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Container>
    );
};

export default App;
