import React, { useState, useContext } from "react";
import { articlesURL } from "../utils/constant";
import withRouter from "../utils/withRouter";
import UserContext from "../utils/UserContext";

function NewPost(props) {
    let info = useContext(UserContext);
    const [formvalue, setFormvalue] = useState({
        title: "",
        description: "",
        body: "",
        tagList: "",
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
        const { title, description, body, tagList } = formvalue
        let { navigate } = props;
        fetch(articlesURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${info.data.user.token}`
            },
            body: JSON.stringify({
                article: {
                    title,
                    description,
                    body,
                    tagList: tagList.split(',').map(tag => tag.trim())
                },
            })
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Can not create article!')
            }
            return res.json()
        })
            .then(({ article }) => {
                navigate('/');
                setFormvalue({
                    title: '',
                    description: '',
                    body: '',
                    tagList: ''
                })
            })
            .catch((errors) => setFormvalue({ errors }))
    }

    let { title, description, body, tagList } = formvalue;

    return (
        <div>
            <form className="newpost">
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
                    onClick={handleSubmit}
                />
            </form>
        </div>
    )
}
export default withRouter(NewPost);


