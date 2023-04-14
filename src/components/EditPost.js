import React, { useState, useContext } from "react";
import withRouter from "../utils/withRouter";
import { articlesURL } from "../utils/constant";
import UserContext from "../utils/UserContext";

function EditPost(props) {

    let info = useContext(UserContext);
    let article = props.location.state.article.article;
    // console.log(article)

    const [formvalue, setFormvalue] = useState({
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
    })

    const handleChange = ({ target }) => {
        let { name, value } = target
        let errors = { ...formvalue.errors };
        setFormvalue({ ...formvalue, [name]: value, errors });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { title, description, body, tagList } = formvalue;
        let slug = props.params.slug;
        let { navigate } = props;
        fetch(articlesURL, {
            method: "PUT",
            headers: {
                "Content=Type": "application/json",
                authorization: `Token ${info.data.user.token}`
            },
            body: JSON.stringify({
                article: {
                    title,
                    description,
                    body,
                    tagList: tagList.split(',').map(tag => tag.trim()),
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
                setFormvalue({ errors })
            })
    }

    const { title, description, body, tagList } = formvalue;
    return (
        <div>
            <form className="newpost"
                onSubmit={handleSubmit}
            >
                <input
                    value={title}
                    name="title"
                    type="text"
                    placeholder="Article Title"
                    onChange={handleChange}
                />
                <input
                    value={description}
                    name="description"
                    type="text"
                    placeholder="What's this article is all about?"
                    onChange={handleChange}
                />
                <textarea
                    value={body}
                    name="body"
                    placeholder="Write your article(In markdown formate)"
                    rows={10}
                    onChange={handleChange}
                />
                <input
                    value={tagList}
                    name="tagList"
                    type="text"
                    placeholder="Enter Tags"
                    onChange={handleChange}
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


export default withRouter(EditPost);