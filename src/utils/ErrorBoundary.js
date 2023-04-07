import React from "react";
import { Link } from "react-router-dom";


export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null
        }
    }

    // static getDerivedStateFromError(error) {
    //     return { hasError: true };
    // }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error,
            info
        })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong!</h1>
                    <h2>{this.state.info}</h2>
                    <Link to='/'>Reload</Link>
                </div>
            )
        }
        return this.props.children;
    }
}