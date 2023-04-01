import React from "react";
import { userVerifyURL } from "../utils/constant";
import withRouter from "../utils/withRouter";

class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        }
    }


    handleChange = ({ target }) => {
        let { name, value } = target
        let errors = this.state.errors;
        this.setState({ [name]: value, errors });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let { navigate } = this.props;
        const { username, bio, image, email, password } = this.state;
        fetch(userVerifyURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${this.props.user.token}`
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
                this.props.updateUser(user);
                navigate(`/`);
                // this.props.history.push(`/${username}`);
            })
            .catch((errors) => this.setState({ errors }))
    }


    render() {
        let { username, bio, image, email, password } = this.state;
        let { handleLogout } = this.props;
        return (
            <div>
                <form className="newpost">
                    <input
                        value={username}
                        name="username"
                        type="text"
                        placeholder={this.props.user.username}
                        onChange={this.handleChange}
                    />
                    <input
                        value={email}
                        name="email"
                        type="email"
                        placeholder={this.props.user.email}
                        onChange={this.handleChange}
                    />
                    <textarea
                        value={bio}
                        name="bio"
                        placeholder="Bio"
                        rows={10}
                        onChange={this.handleChange}
                    />
                    <input
                        className="block w-full border px-4 py-3 rounded-sm"
                        type="text"
                        placeholder="URL of profile picture"
                        value={image}
                        name="image"
                        onChange={this.handleChange}
                    />
                    <input
                        value={password}
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                    <input
                        type="submit"
                        className="btn"
                        onClick={this.handleSubmit}
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
}
export default withRouter(Setting);



// function Setting() {
//     return <h2>Setting</h2>
// }

// export default Setting;