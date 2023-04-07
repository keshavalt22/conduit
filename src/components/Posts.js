import React from "react";
import Post from "./Post";
import Loader from "./Loader";


function Posts(props) {
    const { articles, error } = props;
    if (error) {
        return (
            <div className="center">
                <h2 className="nomatch">{error}</h2>
            </div>
        )
    }
    if (!articles) {
        return <Loader />
    }
    if (articles.length < 1) {
        return (
            <h2 className="nomatch">No articles found!</h2>
        )
    }
    return articles.map((article) => <Post
        key={article.slug}
        {...article}
    />)
}

export default Posts;