import React from "react";
import { articlesURL } from "../utils/constant";
import UserContext from "../utils/UserContext";


class Comments extends React.Component {

    handleDelete = (id) => {
        const slug = this.props.slug;
        fetch(articlesURL + "/" + slug + "/commetns/" + id, {
            method: "DELETE",
            headers: {
                authorization: `Token ${this.props.user.token}`
            }
        }).then((res) => {
            if (!res) {
                throw new Error("cannot delete");
            } else {
                return res.json();
            }
        })
    }

    static contextType = UserContext;

    render() {

        let info = this.context;

        console.log(info.data.user.username);

        if (!this.props.comments) {
            return "";
        }

        const comments = this.props.comments;

        return (
            <ul>
                {
                    comments.map((comment) => {
                        <li className="border rounded-md mt-8" key={comment.id}>
                            <p className="p-4">{comment.body}</p>
                            <div className="flex items-center justify-between mt-6 p-4 bg-gray-100 bordet-t border-gray-500">
                                <div className="flex items-center">
                                    <img
                                        className="w-8 h-8 rounded-full object-cover"
                                        src={comment.author.image}
                                        alt={comment.author.username}
                                    />
                                    <strong className="font-normal text-green-500 inline-block mx-2">
                                        {comment.author.username}
                                    </strong>
                                    <span className="text-gray-400 text-sm">
                                        {comment.createdAt}
                                    </span>
                                </div>
                                {this.props.user === null ? (
                                    ""
                                ) : info.data.user.username === comment.author.username ? (
                                    <button onClick={() => this.handleDelete(comment.id)}>
                                        Delete
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </li>
                    })
                }
            </ul>
        )


    }


}

export default Comments;