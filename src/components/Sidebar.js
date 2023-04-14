import React, { useState, useEffect } from "react";
import { tagsURL } from "../utils/constant";
import Loader from "./Loader";


function Sidebar(props) {
    const [tags, setTags] = useState(null);
    const [error, setError] = useState("");


    const fetchData = () => {
        fetch(tagsURL)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Something went wrong!");
                }
                return res.json();
            })
            .then((data) => {
                setTags(data.tags);
                setError(data.error);
            })
            .catch((err) => {
                setError("Not able to fetch tags!")
            });
    }

    useEffect(() => {
        fetchData()
    }, [tags])

    if (error) {
        return (
            <div className="center">
                <h2 className="nomatch">{error}</h2>
            </div>
        )
    }
    if (!tags) {
        return <Loader />
    }
    return (
        <aside className="aside">
            <h3>Popular Tags</h3>
            <div className="tags">
                {tags.map(tag =>
                    <span onClick={() => props.addTab(tag)} key={tag} className="tag">{tag}</span>)}
            </div>
        </aside>
    )
}


export default Sidebar;