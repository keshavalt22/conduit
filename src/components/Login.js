import React, { useState } from "react";
import { loginURL } from "../utils/constant";
import withRouter from "../utils/withRouter";

function Login(props) {

    const [formvalue, setFormvalue] = useState({
        email: "user185@gmail.com",
        password: "User@185",
        errors: {
            email: "",
            password: ""
        }
    })

    // console.log(formvalue);

    const validEmail = (email) => {
        var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return String(email).search(filter) !== -1;
    }
    const handleInput = ({ target }) => {

        let { name, value } = target;
        let errors = { ...formvalue.errors };

        switch (name) {
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
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let { navigate } = props;
        const { email, password } = formvalue;
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
                props.updateUser(user);
                setFormvalue({ email: "", password: "" });
                navigate('/');
            })
            .catch((errors) => setFormvalue({ errors }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={formvalue.email}
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleInput}
                className={formvalue.errors.email && "error"}
            ></input>
            <span className="errormsg">{formvalue.errors.email}</span>
            <input
                value={formvalue.password}
                onChange={handleInput}
                type="password"
                name="password"
                placeholder="Enter your password"
                className={formvalue.errors.password && "error"}
            ></input>
            <span className="errormsg">{formvalue.errors.password}</span>
            <input
                className="btn"
                disabled={formvalue.errors.email || formvalue.errors.password}
                type="submit"
                value="submit"
            />
        </form>
    )
}

export default withRouter(Login);