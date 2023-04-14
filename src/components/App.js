import React, { useState, useEffect } from "react";
import Header from './Header';
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import NoMatch from "./NoMatch";
import SinglePost from "./SinglePost";
import { Route, Routes } from "react-router-dom";
import { localStorageKey } from "../utils/constant";
import withRouter from "../utils/withRouter";
import { userVerifyURL } from "../utils/constant";
import FullPageSpinner from "./FullPageSpinner";
import NewPost from "./NewPost";
import Setting from "./Setting";
import Profile from "./Profile";
import EditPost from "./EditPost";
import ErrorBoundary from "../utils/ErrorBoundary";
import UserContext from "../utils/UserContext";



function App(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isVerifying, setIsVerifying] = useState(true);


    useEffect(() => {
        let storageKey = localStorage[localStorageKey];

        if (storageKey) {
            fetch(userVerifyURL, {
                method: "GET",
                headers: {
                    "authorization": `Token ${storageKey}`
                }
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return res.json().then(({ errors }) => {
                        return Promise.reject(errors);
                    })
                })
                .then(({ user }) => updateUser(user))
                .catch((errors) => console.log({ errors }))
        } else {
            setIsVerifying(false)
        }
    }, [isLoggedIn, isVerifying]);



    function updateUser(user) {
        setIsLoggedIn(true)
        setUser(user)
        setIsVerifying(false)
        localStorage.setItem(localStorageKey, user.token)
    };

    function handleLogout() {
        const { navigate } = props;
        setIsLoggedIn(false)
        setUser(null)
        navigate('/');
        localStorage.clear();
    }

    let data = { isLoggedIn, isVerifying, user }

    if (isVerifying) {
        return <FullPageSpinner />
    }
    return (
        <div className="container">
            <ErrorBoundary>
                <UserContext.Provider value={{ data, handleLogout, updateUser }}>
                    <Header isLoggedIn={isLoggedIn} user={user} />
                    {
                        isLoggedIn
                            ? <AuthenticatedApp
                                isLoggedIn={isLoggedIn}
                                user={user}
                                handleLogout={handleLogout}
                            />
                            : <UnauthenticatedApp
                                isLoggedIn={isLoggedIn}
                                updateUser={updateUser}
                                user={user} />
                    }
                </UserContext.Provider>
            </ErrorBoundary>
        </div>
    )
}

function AuthenticatedApp(props) {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home user={props.user} isLoggedIn={props.isLoggedIn} />}
            />
            <Route
                path="/new_post"
                element={<NewPost user={props.user} />}
            />
            <Route
                path="/editor/:slug"
                element={
                    <EditPost
                        user={props.user}
                    />
                }
            />
            <Route
                path="/settings"
                element={<Setting />}
            />
            <Route
                path="/profile"
                element={<Profile />}
            />
            <Route
                path="/article/:slug"
                element={<SinglePost />}
            />
            <Route
                path="*"
                element={<NoMatch />}
            />
        </Routes>
    )
}

function UnauthenticatedApp(props) {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home user={props.user} isLoggedIn={props.isLoggedIn} />}
            />
            <Route
                path="/login"
                element={<Login updateUser={props.updateUser} />}
            />
            <Route
                path="/signup"
                element={<Signup updateUser={props.updateUser} />}
            />
            <Route
                path="/article/:slug"
                element={<SinglePost user={props.user} />}
            />
            <Route
                path="*"
                element={<NoMatch />}
            />
        </Routes>
    )
}

export default withRouter(App);

