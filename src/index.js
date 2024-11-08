import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Імпортуємо BrowserRouter
import App from "./App";
import store from "./store";

const rootElement = document.getElementById("root");

// Використовуємо createRoot замість ReactDOM.render
const root = ReactDOM.createRoot(rootElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
