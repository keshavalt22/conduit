import React, { useState, useEffect } from "react";
import FeedNav from "./FeedNav";
import Hero from "./Hero";
import Posts from "./Posts";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import { articlesURL } from "../utils/constant";

function Home(props) {

    const [articles, setArticles] = useState(null);
    const [error, setError] = useState("");
    const [articlesCount, setArticlesCount] = useState(0);
    const [articlesPerPage, setArticlesPerPage] = useState(10);
    const [activePage, setActivePage] = useState(1);
    const [activeTab, setActiveTab] = useState("");

    const removeTab = () => {
        setActiveTab("")
    }

    const addTab = (value) => {
        setActiveTab(value)
    }

    useEffect(() => {
        fetchData()
    }, [activePage, activeTab])

    function fetchData() {

        let limit = articlesPerPage;
        let offset = (activePage - 1) * limit;
        let tag = activeTab;

        fetch(articlesURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`))
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong!");
                }
                return res.json();
            })
            .then((data) => {
                setArticles(data.articles);
                setError("");
                setArticlesCount(data.articlesCount);
            })
            .catch(err => {
                setError("Not able to fetch articles!");
            });
    }

    const updateCurrentPageIndex = (index) => {
        setActivePage(index)
    }

    return (
        <main>
            <Hero />
            <FeedNav activeTab={activeTab} removeTab={removeTab} />
            <div className="main-flex">
                <section className="articles">
                    <Posts
                        articles={articles}
                        error={error}
                        user={props.user}
                        isLoggedIn={props.isLoggedIn}
                    />
                    <Pagination
                        articlesCount={articlesCount}
                        articlesPerPage={articlesPerPage}
                        activePage={activePage}
                        updateCurrentPageIndex={updateCurrentPageIndex}
                    />
                </section>
                <Sidebar addTab={addTab} />
            </div>
        </main>
    )
}

export default Home;