import React, { useState } from "react";
import { signupURL } from "../utils/constant";
import withRouter from "../utils/withRouter";

function Signup(props) {
    const [formvalue, setFormvalue] = useState({
        username: "",
        email: "",
        password: "",
        errors: {
            username: "",
            email: "",
            password: "",
        }
    })

    const validEmail = (email) => {
        var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return String(email).search(filter) !== -1;
    }

    const handleInput = ({ target }) => {
        let { name, value } = target
        let errors = { ...formvalue.errors };


        switch (name) {
            case "username":
                errors.username = value.length < 6
                    ? "username can not be less then 6 characters"
                    : "";
                break;
            case "email":
                errors.email = validEmail(value) ? "" : "Email is not valid!"
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

        setFormvalue({ ...formvalue, [name]: value, errors });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password } = formvalue;
        let { navigate } = props;
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
            .catch((errors) => setFormvalue({ errors }))
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                value={formvalue.email}
                onChange={handleInput}
                name="email"
                type="email"
                placeholder="Enter your email"
                className={formvalue.errors.email && "error"}
            ></input>
            <span className="errormsg">{formvalue.errors.email}</span>
            <input
                value={formvalue.username}
                onChange={handleInput}
                name="username"
                type="text"
                placeholder="Enter your username"
                className={formvalue.errors.username && "error"}
            ></input>
            <span className="errormsg">{formvalue.errors.username}</span>
            <input
                value={formvalue.password}
                onChange={handleInput}
                name="password"
                type="password"
                placeholder="Enter your password"
                className={formvalue.errors.password && "error"}
            ></input>
            <span className="errormsg">{formvalue.errors.password}</span>
            <input
                className="btn"
                disabled={formvalue.errors.email || formvalue.errors.password || formvalue.errors.username}
                type="submit"
                value="submit"
            />
        </form>
    )
}
export default withRouter(Signup);