import React from "react";
import { Link } from "react-router-dom";
import { articlesURL } from "../utils/constant";
import withRouter from "../utils/withRouter";
import Loader from "./Loader";
import Comments from "./Comments";
import AddComments from "./AddComments";
import UserContext from "../utils/UserContext";


class SinglePost extends React.Component {

    state = {
        article: null,
        error: null,
        comments: null,
    }

    componentDidMount() {

        let slug = this.props.params.slug;

        fetch(articlesURL + '/' + slug)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong!")
                }
                return res.json();
            })
            .then(data => this.setState({
                article: data.article,
                error: "",
            }))
            .catch(err => {
                this.setState({ error: "Not able to fetch articles!" })
            })
        fetch(articlesURL + '/' + slug + '/comments')
            .then((res) => res.json())
            .then((data) => this.setState({ comments: data.comments }))

    }


    handleDelete = () => {
        let slug = this.props.params.slug;
        const { navigate } = this.props;
        fetch(articlesURL + "/" + slug, {
            method: "DELETE",
            headers: {
                authorization: `Token ${this.props.user.token}`
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

    static contextType = UserContext;

    render() {
        let info = this.context;
        const { article, error, comments } = this.state;
        let slug = this.props.params.slug;

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
                        <h3>{article.title}</h3>
                        <div className="flex width-180px">
                            <img src={article.author.image} alt={article.author.username}></img>
                            <div className="description">
                                <p>{article.author.username}</p>
                                <time dateTime="">
                                    <p>{article.createdAt}</p>
                                </time>
                            </div>
                        </div>
                    </div>
                    <div className="article-body">
                        <p>{article.body}</p>
                    </div>
                    <div>
                        {
                            this.props.user === null ? ""
                                :
                                <div>
                                    <button
                                        className="delete-btn"
                                        onClick={this.handleDelete}>
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
                    <div>
                        <Comments
                            comments={comments}
                            slug={slug}
                            user={this.props.user}
                        />
                    </div>
                    <hr></hr>
                    {
                        this.props.user === null ? (
                            <div className="footer">
                                <p>
                                    <Link to="/login" style={{ color: 'rgb(92, 184, 92)' }}>Log in</Link> or <Link to="/signup" style={{ color: 'rgb(92, 184, 92)' }}>Sign up</Link> to add comments on article.
                                </p>
                            </div>
                        ) : (
                            <AddComments
                                user={info.data.user}
                                slug={slug}
                            />
                        )
                    }
                </div>
            </div>
        )
    }

}

export default withRouter(SinglePost);