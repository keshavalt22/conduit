import React from "react";
import withRouter from "../utils/withRouter";
import { articlesURL } from "../utils/constant";

class EditPost extends React.Component {
    constructor(props) {
        super(props);
        let article = this.props.location.state.article;

        this.state = {
            title: article.title,
            description: article.description,
            body: article.body,
            tagList: article.tagList,
            errors: {
                title: "",
                description: "",
                body: "",
                tagList: "",
            }
        }
    }


    handleChange = ({ target }) => {
        let { name, value } = target;
        let errors = this.state.errors;
        this.setState({ [name]: value, errors })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { title, description, body, tagList } = this.state;
        let slug = this.props.params.slug;
        let { navigate } = this.props;
        fetch(articlesURL, {
            method: "PUT",
            headers: {
                "Content=Type": "application/json",
                authorization: `Token ${this.props.user.token}`
            },
            body: JSON.stringify({
                article: {
                    title,
                    description,
                    body,
                    tagList,
                }
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("can not edit article")
                }
                return res.json();
            })
            .then(({ article }) => {
                navigate(`/articles/${slug}`);
            })
            .catch((errors) => {
                this.setState({ errors })
            })
    }

    render() {
        const { title, description, body, tagList } = this.state;
        return (
            <div>
                <form className="newpost"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        value={title}
                        name="title"
                        type="text"
                        placeholder="Article Title"
                        onChange={this.handleChange}
                    />
                    <input
                        value={description}
                        name="description"
                        type="text"
                        placeholder="What's this article is all about?"
                        onChange={this.handleChange}
                    />
                    <textarea
                        value={body}
                        name="body"
                        placeholder="Write your article(In markdown formate)"
                        rows={10}
                        onChange={this.handleChange}
                    />
                    <input
                        value={tagList}
                        name="tagList"
                        type="text"
                        placeholder="Enter Tags"
                        onChange={this.handleChange}
                    />
                    <input
                        type="submit"
                        className="btn"
                        value="Publish Article"
                    />
                </form>
            </div>
        )
    }
}


export default withRouter(EditPost);