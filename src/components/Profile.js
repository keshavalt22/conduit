import React, { useEffect, useState, useContext } from "react";
import Pagination from "./Pagination";
import ProfileBanner from "./ProfileBanner";
import { articlesURL } from "../utils/constant";
import Posts from "./Posts";
import UserContext from "../utils/UserContext";


function Profile(props) {
    let info = useContext(UserContext);

    const [activeTab, setActiveTab] = useState("author");
    const [error, setError] = useState("");
    const [articles, setArticles] = useState(null);
    const [articlesCount, setArticlesCount] = useState(0);
    const [articlesPerPage, setArticlesPerPage] = useState(10);
    const [activePage, setActivePage] = useState(1);


    const fetchData = () => {
        fetch(articlesURL + `/?${activeTab}=${info.data.user.username}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong!")
                }
                return res.json();
            })
            .then((data) => {
                setArticles(data.articles);
                setArticlesCount(data.articlesCount);
            })
            .catch(err => {
                setError("Not able to fetch articles!")
            })
    }

    useEffect(() => {
        fetchData()
    }, [activePage, activeTab])

    const handleActive = (tab) => {
        setActiveTab(tab)
    }

    const updateCurrentPageIndex = (index) => {
        setActivePage(index)
    }
    return (
        <section>
            <ProfileBanner />
            <nav>
                <ul className="flex width-200px feed-nav">
                    <li>
                        <button
                            onClick={() => handleActive('author')}
                            className={activeTab === "author" && "active"}
                        >
                            My Article
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleActive('favrited')}
                            className={activeTab === "favrited" && "active"}
                        >
                            Favorite Article
                        </button>
                    </li>
                </ul>
                <hr></hr>
            </nav>
            <Posts
                articles={articles}
                error={error}
            />
            <Pagination
                articlesCount={articlesCount}
                articlesPerPage={articlesPerPage}
                activePage={activePage}
                updateCurrentPageIndex={updateCurrentPageIndex}
            />
        </section>
    )
}

export default Profile;