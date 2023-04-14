import React, { useContext } from "react";
import { articlesURL } from "../utils/constant";
import UserContext from "../utils/UserContext";
import Loader from "./Loader";


function Comments(props) {
    let info = useContext(UserContext);
    // console.log(info);

    function getDate(date) {
        let newDate = new Date(date).toISOString().split('T')[0];
        return newDate;
    }

    const comments = props.comments;
    let isLoggedIn = info.data.isLoggedIn;
    let loggedInUser = info.data.user.username;


    if (!comments) {
        return < Loader />
    }

    return (
        <ul>
            {comments.length === 0 ? (
                <h2>No Comments</h2>
            ) : (
                comments.map((comment) => {
                    return (
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
                                    <button onClick={(e) => props.handleDelete(e)}>
                                        Delete
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </li>
                    )
                }))
            }
        </ul>
    )
}

export default Comments;