import React from "react";
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
import ErrorBoundary from "./errorBoundary/ErrorBoundary";



class App extends React.Component {

    state = {
        isLoggedIn: false,
        user: null,
        isVerifying: true,
    };

    componentDidMount() {

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
                .then(({ user }) => this.updateUser(user))
                .catch((errors) => console.log({ errors }))
        } else {
            this.setState({ isVerifying: false })
        }
    }

    updateUser = (user) => {
        this.setState({ isLoggedIn: true, user, isVerifying: false });
        localStorage.setItem(localStorageKey, user.token)
    };

    handleLogout = () => {
        const { navigate } = this.props;
        this.setState({
            isLoggedIn: false,
            user: null
        })
        navigate('/');
        localStorage.clear();
    }

    render() {
        if (this.state.isVerifying) {
            return <FullPageSpinner />
        }
        return (
            <div className="container">
                <ErrorBoundary>
                    <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
                    {
                        this.state.isLoggedIn
                            ? <AuthenticatedApp
                                isLoggedIn={this.state.isLoggedIn}
                                user={this.state.user}
                                handleLogout={this.handleLogout}
                            />
                            : <UnauthenticatedApp
                                isLoggedIn={this.state.isLoggedIn}
                                updateUser={this.updateUser}
                                user={this.state.user} />
                    }
                </ErrorBoundary>
            </div>
        )
    }
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
                element={<Setting
                    user={props.user}
                    updateUser={props.updateUser}
                    handleLogout={props.handleLogout}
                />}
            />
            <Route
                path="/profile"
                element={<Profile
                    user={props.user}
                />}
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