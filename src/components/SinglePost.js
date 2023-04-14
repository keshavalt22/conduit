import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { articlesURL } from "../utils/constant";
import withRouter from "../utils/withRouter";
import Loader from "./Loader";
import CommentBox from "./CommentBox";


function SinglePost(props) {

    const [article, setArticle] = useState(null);
    const [error, setError] = useState("");


    useEffect(() => {
        let slug = props.params.slug;
        fetch(articlesURL + '/' + slug)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong!")
                }
                return res.json();
            })
            .then(data => setArticle({
                article: data.article
            }))
            .catch(err => {
                setError(err)
            })
    }, [props.params.slug])



    function handleDelete(props) {
        let slug = props.params.slug;
        const { navigate } = props;
        fetch(articlesURL + "/" + slug, {
            method: "DELETE",
            headers: {
                authorization: `Token ${props.user.token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("can not delete the article")
                }
                return res.json();
            })
            .then(navigate("/"))
    }
    let slug = props.params.slug;

    if (error) {
        return (
            <div className="center">
                <h2 className="nomatch">{error}</h2>
            </div>
        )
    }
    if (!article) {
        return <Loader />
    }
    return (
        <div className="container single-post">
            <div>
                <div className="article-head">
                    <h3>{article.article.title}</h3>
                    <div className="flex width-180px">
                        <img src={article.article.author.image} alt={article.article.author.username}></img>
                        <div className="description">
                            <p>{article.article.author.username}</p>
                            <time dateTime="">
                                <p>{article.article.createdAt}</p>
                            </time>
                        </div>
                    </div>
                </div>
                <div className="article-body">
                    <p>{article.article.body}</p>
                </div>
                <div>
                    {
                        props.user === null ? ""
                            :
                            <div>
                                <button
                                    className="delete-btn"
                                    onClick={handleDelete}>
                                    Delete
                                </button>
                                <Link
                                    to={`/editor/:${slug}`}
                                    state={{ article }}
                                    params={{ article }}
                                >
                                    <button
                                        className="edit-btn">
                                        Edit
                                    </button>
                                </Link>
                            </div>
                    }
                </div>
                <hr></hr>
                {
                    props.user === null ? (
                        <div className="footer">
                            <p>
                                <Link to="/login" style={{ color: 'rgb(92, 184, 92)' }}>Log in</Link> or <Link to="/signup" style={{ color: 'rgb(92, 184, 92)' }}>Sign up</Link> to add comments on article.
                            </p>
                        </div>
                    ) : (
                        <CommentBox
                            slug={props.params.slug}
                        />
                    )
                }
            </div>
        </div >
    )
}

export default withRouter(SinglePost);