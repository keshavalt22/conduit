import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { articlesURL } from "../utils/constant";
import Comments from './Comments';
import withRouter from "../utils/withRouter";


function CommentBox(props) {

    let info = useContext(UserContext);
    // console.log(info);

    let [inputText, setInputText] = useState("");
    let [comments, setComments] = useState("");

    // console.log(inputText);

    useEffect(() => {
        getComments();
    })

    function handleChange(event) {
        setInputText(event.target.value)
    }

    function getComments() {
        let slug = props.params.slug;
        fetch(articlesURL + "/" + slug + "/comments")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Something went wrong!")
                }
                return res.json();
            })
            .then(({ comments }) => {
                setComments(comments);
            })
            .catch((err) => console.log(err));
    }


    function handleSubmit(event) {
        event.preventDefault();
        let slug = props.params.slug;
        if (inputText) {
            fetch(articlesURL + "/" + slug + "/comments", {
                method: "POST",
                body: JSON.stringify({ comment: { body: inputText } }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${info.data.user.token}`
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then(({ errors }) => {
                            return Promise.reject(errors);
                        })
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setInputText("");
                    setComments("");
                    getComments();
                })
                .catch((err) => console.log(err));
        }
    }

    const handleDelete = (event) => {
        let { id } = event.target.dataset;
        let slug = props.params.slug;

        fetch(articlesURL + "/" + slug + "/comments/" + id, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${info.data.user.token}`
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(({ errors }) => {
                        return Promise.reject(errors);
                    });
                }
                setComments("");
                getComments();
            })
            .catch((err) => console.log(err));
    }


    let { image, username } = info.data.user;

    // console.log(info);
    // console.log(comments)
    return (
        <>
            {
                !info.data.user ? (
                    <div>
                        <div>
                            <Comments comments={comments} handleDelete={handleDelete} />
                            <hr></hr>
                        </div>
                        <div className="footer">
                            <p>
                                <Link to="/login" style={{ color: 'rgb(92, 184, 92)' }}>Log in</Link> or <Link to="/signup" style={{ color: 'rgb(92, 184, 92)' }}>Sign up</Link> to add comments on article.
                            </p>
                        </div>
                    </div>

                ) : (
                    <section className="addcomments">
                        <div>
                            <Comments comments={comments} handleDelete={handleDelete} />
                            <hr></hr>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={inputText}
                                    placeholder="Write Comment"
                                    rows="5"
                                    onChange={handleChange}
                                />
                                <div className="user-info">
                                    <div className="flex width-180px">
                                        <img src={image} alt="img" />
                                        <strong>{username}</strong>
                                    </div>
                                </div>
                                <input
                                    type="submit"
                                    className="btn"
                                />
                            </form>
                        </div>
                    </section>
                )
            }
        </>
    )
}


export default withRouter(CommentBox);