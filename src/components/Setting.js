import React, { useState, useContext } from "react";
import { userVerifyURL } from "../utils/constant";
import withRouter from "../utils/withRouter";
import UserContext from "../utils/UserContext";

function Setting(props) {
    let info = useContext(UserContext);

    const [formvalue, setFormvalue] = useState({
        username: '',
        bio: '',
        image: '',
        email: '',
        password: '',
        errors: {
            username: '',
            bio: '',
            image: '',
            email: '',
            password: '',
        }
    })


    const handleChange = ({ target }) => {
        let { name, value } = target
        let errors = { ...formvalue.errors };
        setFormvalue({ ...formvalue, [name]: value, errors });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let { navigate } = props;
        const { username, bio, image, email, password } = formvalue;
        fetch(userVerifyURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${info.data.user.token}`
            },
            body: JSON.stringify({
                user: {
                    username,
                    bio,
                    image,
                    email,
                    password
                },
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
                props.updateUser(user);
                navigate(`/`);
            })
            .catch((errors) => setFormvalue({ errors }))
    }



    let { username, bio, image, email, password } = formvalue;
    let handleLogout = info.handleLogout;


    return (
        <div>
            <form className="newpost" onSubmit={handleSubmit}>
                <input
                    value={username}
                    name="username"
                    type="text"
                    placeholder={info.data.user.username}
                    onChange={handleChange}
                />
                <input
                    value={email}
                    name="email"
                    type="email"
                    placeholder={info.data.user.email}
                    onChange={handleChange}
                />
                <textarea
                    value={bio}
                    name="bio"
                    placeholder="Bio"
                    rows={10}
                    onChange={handleChange}
                />
                <input
                    className="block w-full border px-4 py-3 rounded-sm"
                    type="text"
                    placeholder="URL of profile picture"
                    value={image}
                    name="image"
                    onChange={handleChange}
                />
                <input
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    className="btn"
                />
                <input
                    type="submit"
                    value="Log-Out"
                    className="btn"
                    onClick={handleLogout}
                />
            </form>
        </div>
    )
}
export default withRouter(Setting);
