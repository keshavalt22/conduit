import React from "react";
import { Link } from "react-router-dom";


function FeedNav(props) {
    return (
        <nav>
            <ul className="flex width-200px feed-nav">
                <li onClick={props.removeTab}>
                    <Link to='/' className={!props.activeTab ? "active" : ""}>
                        Global Feed
                    </Link>
                </li>
                {
                    props.activeTab && (
                        <li>
                            <Link to='/' className={props.activeTab ? "active" : ""}>
                                #{props.activeTab}
                            </Link>
                        </li>
                    )
                }
            </ul>
            <hr></hr>
        </nav>
    )
}

export default FeedNav;