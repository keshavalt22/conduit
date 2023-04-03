import React from "react";
import FeedNav from "./FeedNav";
import Hero from "./Hero";
import Posts from "./Posts";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import { articlesURL } from "../utils/constant";

class Home extends React.Component {

    state = {
        articles: null,
        error: "",
        articlesCount: 0,
        articlesPerPage: 10,
        activePage: 1,
        activeTab: "",
    }

    removeTab = () => {
        this.setState({ activeTab: "" })
    }

    addTab = (value) => {
        this.setState({ activeTab: value })
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState.activePage !== this.state.activePage ||
            prevState.activeTab !== this.state.activeTab) {
            this.fetchData()
        }
    }

    fetchData = () => {

        let limit = this.state.articlesPerPage;
        let offset = (this.state.activePage - 1) * limit;
        let tag = this.state.activeTab;

        fetch(articlesURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`))
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong!")
                }
                return res.json();
            })
            .then(data => this.setState({
                articles: data.articles,
                error: "",
                articlesCount: data.articlesCount
            }))
            .catch(err => {
                this.setState({ error: "Not able to fetch articles!" })
            })
    }

    updateCurrentPageIndex = (index) => {
        this.setState({ activePage: index }, this.fetchData)
    }

    render() {

        const { articles, error, articlesCount, articlesPerPage, activePage, activeTab } = this.state;
        return (
            <main>
                <Hero />
                <FeedNav activeTab={activeTab} removeTab={this.removeTab} />
                <div className="main-flex">
                    <section className="articles">
                        <Posts
                            articles={articles}
                            error={error}
                            user={this.props.user}
                            isLoggedIn={this.props.isLoggedIn}
                        />
                        <Pagination
                            articlesCount={articlesCount}
                            articlesPerPage={articlesPerPage}
                            activePage={activePage}
                            updateCurrentPageIndex={this.updateCurrentPageIndex}
                        />
                    </section>
                    <Sidebar addTab={this.addTab} />
                </div>
            </main>
        )
    }
}

export default Home;