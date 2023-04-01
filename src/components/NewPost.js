import React from "react";
import { articlesURL } from "../utils/constant";
import withRouter from "../utils/withRouter";

class NewPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            body: "",
            tagList: "",
            errors: {
                title: "",
                description: "",
                body: "",
                tagList: "",
            }
        }
    }


    handleChange = ({ target }) => {
        let { name, value } = target
        let errors = this.state.errors;
        this.setState({ [name]: value, errors });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { title, description, body, tagList } = this.state;
        let navigate = this.props;
        fetch(articlesURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${this.props.user.token}`
            },
            body: JSON.stringify({
                article: {
                    title,
                    description,
                    body,
                    tagList: tagList.split(',').map(tag => tag.trim())
                },
            })
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Can not create article!')
            }
            return res.json()
        })
            .then(({ article }) => {
                navigate('/');
                this.setState({
                    title: '',
                    description: '',
                    body: '',
                    tagList: ''
                })
            })
            .catch((errors) => this.setState({ errors }))
    }

    render() {
        let { title, description, body, tagList } = this.state;

        return (
            <div>
                <form className="newpost">
                    <input
                        value={title}
                        name="title"
                        type="text"
                        placeholder="Article Title"
                        onChange={this.handleChange}
                    />
                    <input
                        value={description}
                        name="description"
                        type="text"
                        placeholder="What's this article is all about?"
                        onChange={this.handleChange}
                    />
                    <textarea
                        value={body}
                        name="body"
                        placeholder="Write your article(In markdown formate)"
                        rows={10}
                        onChange={this.handleChange}
                    />
                    <input
                        value={tagList}
                        name="tagList"
                        type="text"
                        placeholder="Enter Tags"
                        onChange={this.handleChange}
                    />
                    <input
                        type="submit"
                        className="btn"
                        value="Publish Article"
                        onClick={this.handleSubmit}
                    />
                </form>
            </div>
        )
    }
}
export default withRouter(NewPost);




// switch (name) {
//     case "username":
//         errors.username = value.length < 6
//             ? "username can not be less then 6 characters"
//             : "";
//         break;
//     case "email":
//         errors.email = this.validEmail(value) ? "" : "Email is not valid!"
//         break;
//     case "password":
//         let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/;

//         errors.password = !re.test(value)
//             ? "password must contain a character and a number"
//             : "";
//         break;
//     default:
//         break;
// }

// function NewPost() {
//     return (
//         <div>
//             <form className="newpost">
//                 <input
//                     type="text"
//                     placeholder="Article Title" />
//                 <input
//                     type="text"
//                     placeholder="What's this article is all about?" />
//                 <textarea
//                     placeholder="Write your article(In markdown formate)"
//                     rows={10} />
//                 <input
//                     type="text"
//                     placeholder="Enter Tags" />
//                 <input
//                     type="submit"
//                     className="btn"
//                     value="Publish Article" />
//             </form>
//         </div>
//     )
// }

// export default NewPost;


