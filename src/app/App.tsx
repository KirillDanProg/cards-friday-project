import React, { useEffect, useRef } from "react";
import { serverErrorHandler } from "common/utils";
import { useAppSelector } from "common/hooks";
import { selectCurrentError, selectCurrentStatus } from "features/auth/authSlice";
import { useAuthMeMutation } from "features/auth/authApi";
import CssBaseline from "@mui/material/CssBaseline";
import { ErrorSnackbar, Preloader } from "common/components";
import { AppRoutes, Header, ColorModelContextProvider } from "layout";
import "./App.css";
import { PreloaderContainer } from "../common/components/preloader/PreloaderContainer";

function App() {

    const firstMount = useRef(true);

    const error = useAppSelector(selectCurrentError);

    const status = useAppSelector(selectCurrentStatus);

    const [authMe] = useAuthMeMutation();

    useEffect(() => {
        //todo: how to use async await with useEffect
        authMe("").then(() => {
            firstMount.current = false;
        });
    }, []);

    return (
        <ColorModelContextProvider>
            <CssBaseline />
            {
                error && <ErrorSnackbar errorMessage={serverErrorHandler(error)} />
            }
            <PreloaderContainer
                condition={firstMount.current && status === "loading"}
                loader={<Preloader />}
            >
                <Header />
                <AppRoutes />
            </PreloaderContainer>

        </ColorModelContextProvider>
    );
}

export default App;
