import React, { Suspense } from "react";
import "animate.css";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { SkeletonTheme } from "react-loading-skeleton";
import { createGlobalStyle } from "styled-components";
import AppRoutes from "routes/AppRoutes";
import { initializeApp } from "firebase/app";
import { Provider } from "react-redux";

// imported for redux toolkit
import { store } from "redux/store";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "library/utilities/i18next";
import "../node_modules/react-loading-skeleton/dist/skeleton.css";

//  imports for redux persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApH9v6okFejF8jSAEQJMXUcP5EijUhmDo",
  authDomain: "autoservice-chat-5bed0.firebaseapp.com",
  projectId: "autoservice-chat-5bed0",
  storageBucket: "autoservice-chat-5bed0.appspot.com",
  messagingSenderId: "150665737569",
  appId: "1:150665737569:web:8a8eb2c8f974cd0b04c120",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const GlobalStyles = createGlobalStyle`
        *{
          margin:0;
          padding:0;
        }

        :root{
          --primary-black: #000000;
          --primary-white: #ffffff;
          --primary-blue: #0f5288;
          --primary-grey: #dadbdf;
          --primary-db-bg: #EBF0F6;
 
        }
`;

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />

        <SkeletonTheme baseColor='#CED4DA' highlightColor='#F7F7F7'>
          <AppRoutes />
          <Suspense fallback={<div>Loading</div>}></Suspense>
          <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
        </SkeletonTheme>
      </PersistGate>
    </Provider>
  </>
);

/* Registering the service worker helps make app work offline & load faster */
serviceWorkerRegistration.register();
reportWebVitals();
