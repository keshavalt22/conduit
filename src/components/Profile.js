import React from "react";
import Pagination from "./Pagination";
import ProfileBanner from "./ProfileBanner";
import { articlesURL } from "../utils/constant";
import Posts from "./Posts";


class Profile extends React.Component {
    state = {
        activeTab: "author",
        articles: null,
        articlesCount: 0,
        articlesPerPage: 10,
        activePage: 1,
    }


    fetchData = () => {
        fetch(articlesURL + `/?${this.state.activeTab}=${this.props.user.username}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong!")
                }
                return res.json();
            })
            .then(data => this.setState({
                articles: data.articles,
                articlesCount: data.articlesCount
            }))
            .catch(err => {
                this.setState({ error: "Not able to fetch articles!" })
            })
    }


    componentDidMount() {
        this.fetchData();
    }

    handleActive = (tab) => {
        this.setState({ activeTab: tab }, () => {
            this.fetchData()
        })
    }

    updateCurrentPageIndex = (index) => {
        this.setState({ activePage: index }, this.fetchData)
    }

    render() {
        let { articles, activeTab, articlesCount, articlesPerPage, activePage, } = this.state;
        let { user } = this.props;
        return (
            <section>
                <ProfileBanner user={user} />
                <nav>
                    <ul className="flex width-200px feed-nav">
                        <li>
                            <button
                                onClick={() => this.handleActive('author')}
                                className={activeTab === "author" && "active"}
                            >
                                My Article
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => this.handleActive('favrited')}
                                className={activeTab === "favrited" && "active"}
                            >
                                Favorite Article
                            </button>
                        </li>
                    </ul>
                    <hr></hr>
                </nav>
                <Posts articles={articles} />
                <Pagination
                    articlesCount={articlesCount}
                    articlesPerPage={articlesPerPage}
                    activePage={activePage}
                    updateCurrentPageIndex={this.updateCurrentPageIndex}
                />
            </section>
        )
    }
}

export default Profile;