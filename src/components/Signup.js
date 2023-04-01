import React from "react";
import { signupURL } from "../utils/constant";
import withRouter from "../utils/withRouter";

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            errors: {
                username: "",
                email: "",
                password: "",
            }
        }
    }

    validEmail = (email) => {
        var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return String(email).search(filter) !== -1;
    }

    handleInput = ({ target }) => {
        let { name, value } = target
        let errors = this.state.errors;


        switch (name) {
            case "username":
                errors.username = value.length < 6
                    ? "username can not be less then 6 characters"
                    : "";
                break;
            case "email":
                errors.email = this.validEmail(value) ? "" : "Email is not valid!"
                break;
            case "password":
                let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/;

                errors.password = !re.test(value)
                    ? "password must contain a character and a number"
                    : "";
                break;
            default:
                break;
        }

        this.setState({ [name]: value, errors });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password } = this.state;
        let navigate = this.props;
        fetch(signupURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: { username, email, password }
            })
        }).then((res) => {
            if (!res.ok) {
                return res.json().then(({ errors }) => {
                    return Promise.reject(errors);
                })

            }
            return res.json()
        })
            .then(({ user }) => {
                this.props.updateUser(user);
                navigate('/');
            })
            .catch((errors) => this.setState({ errors }))
    }

    render() {
        let { email, username, password, errors } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    value={email}
                    onChange={this.handleInput}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={errors.email && "error"}
                ></input>
                <span className="errormsg">{errors.email}</span>
                <input
                    value={username}
                    onChange={this.handleInput}
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    className={errors.username && "error"}
                ></input>
                <span className="errormsg">{errors.username}</span>
                <input
                    value={password}
                    onChange={this.handleInput}
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className={errors.password && "error"}
                ></input>
                <span className="errormsg">{errors.password}</span>
                <input
                    className="btn"
                    disabled={errors.email || errors.password || errors.username}
                    type="submit"
                    value="submit"
                />
            </form>
        )
    }
}
export default withRouter(Signup);