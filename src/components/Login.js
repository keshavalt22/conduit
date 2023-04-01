import React from "react";
import { loginURL } from "../utils/constant";
import withRouter from "../utils/withRouter";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "user185@gmail.com",
            password: "User@185",
            errors: {
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

        let { name, value } = target;
        let errors = { ...this.state.errors };

        switch (name) {
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
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let { navigate } = this.props;
        const { email, password } = this.state;
        fetch(loginURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: { email, password }
            })
        }).then((res) => {
            if (!res.ok) {
                res.json().then(({ errors }) => {
                    return Promise.reject(errors);
                })
                throw new Error("Login is not successful");
            }
            return res.json()
        })
            .then(({ user }) => {
                this.props.updateUser(user);
                this.setState({ email: "", password: "" });
                navigate('/');
            })
            .catch((errors) => this.setState({ errors }))
    }

    render() {

        let { email, password, errors } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    value={email}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={this.handleInput}
                    className={errors.email && "error"}
                ></input>
                <span className="errormsg">{errors.email}</span>
                <input
                    value={password}
                    onChange={this.handleInput}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={errors.password && "error"}
                ></input>
                <span className="errormsg">{errors.password}</span>
                <input
                    className="btn"
                    disabled={errors.email || errors.password}
                    type="submit"
                    value="submit"
                />
            </form>
        )
    }
}

export default withRouter(Login);