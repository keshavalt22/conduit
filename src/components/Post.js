import React from "react";
import { Link } from "react-router-dom";

function Post(props) {

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
                    <span>&hearts;</span>
                    <span>{favoritesCount}</span>
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