import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { articlesURL } from "../utils/constant";
import UserContext from "../utils/UserContext";

function Post(props) {

    let info = useContext(UserContext);

    const handleFavourite = () => {
        let { favoritesCount, slug } = props;
        console.log(favoritesCount)
        fetch(articlesURL + "/" + slug + "/favorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${info.data.user.token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Cannot Favourite the article");
                }
                return res.json();
            })
            .then(({ article }) => favoritesCount + 1);
        fetch(articlesURL + "/" + slug + "/favorite", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${info.data.user.token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Cannot Favourite the article");
                }
                return res.json();
            })
            .then(({ article }) => favoritesCount - 1);
    }

    const { author, createdAt, favoritesCount, title, description, slug } = props;


    return (
        <div className="article">
            <div className="flex">
                <div className="flex">
                    {/* <Link> */}
                    <img src={author.image} alt={author.username}></img>
                    {/* </Link> */}
                    <div className="description">
                        {/* <Link> */}
                        <p>{author.username}</p>
                        {/* </Link> */}
                        <time dateTime="">
                            <p>{createdAt}</p>
                        </time>
                    </div>
                </div>
                <div className="likes">
                    {info.data.isLoggedIn ? (
                        <div>
                            <button
                                onClick={handleFavourite}
                            >
                                <span>&hearts;</span>{favoritesCount}
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button>
                                <span>&hearts;</span> {favoritesCount}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <Link to={`/article/${slug}`}>
                    <div>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                </Link>
                <Link to={`/article/${slug}`}>
                    <p className="readmore">Read more...</p>
                    <hr></hr>
                </Link>
            </div>
        </div>
    )
}


export default Post;