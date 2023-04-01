import React from "react";
import { articlesURL } from "../utils/constant";


class AddComments extends React.Component {

    state = {
        body: null,
    }

    handleChange = (event) => {
        this.setState({
            body: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let slug = this.props.slug
        let { body } = this.state
        fetch(articlesURL + "/" + slug + "/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${this.props.user.token}`
            },
            body: JSON.stringify({
                commets: {
                    body,
                }
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("cannot comment");
                } else {
                    return res.json();
                }
            })
            .then(({ comments }) => {
                this.setState({
                    body: "",
                })
            })
            .catch((error) => this.setState({ error }));
    }


    render() {
        const { body } = this.state;
        const { username, image } = this.props.user;

        return (
            <section className="addcomments">
                <form>
                    <textarea
                        value={body}
                        placeholder="Write Comment"
                        rows="5"
                        onChange={this.handleChange}
                    />
                    <div className="user-info">
                        <div className="flex width-180px">
                            <img src={image} />
                            <strong>{username}</strong>
                        </div>
                    </div>
                    <input
                        type="submit"
                        className="btn"
                        onClick={this.handleSubmit}
                    />
                </form>
            </section>
        )
    }

}


export default AddComments;