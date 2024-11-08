import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers"; // Якщо ви маєте reducers, переконайтесь, що вони правильно експортуються

const store = configureStore({
  reducer: rootReducer,  // Ваш комбінований ред'юсер
  devtools: true,         // Включаємо DevTools
});

export default store;  // Експортуємо store як дефолтний експорт
