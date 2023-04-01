import React from "react";
import { tagsURL } from "../utils/constant";
import Loader from "./Loader";


class Sidebar extends React.Component {
    state = {
        tags: null,
        error: ""
    }


    componentDidMount() {
        fetch(tagsURL)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Something went wrong!");
                }
                return res.json();
            })
            .then(({ tags }) => {
                this.setState({ tags, error: "" })
            })
            .catch((err) => {
                this.setState({ error: "Not able to fetch tags!" })
            });
    }

    render() {

        const { tags, error } = this.state;
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
                        <span onClick={() => this.props.addTab(tag)} key={tag} className="tag">{tag}</span>)}
                </div>
            </aside>
        )
    }
}


export default Sidebar;