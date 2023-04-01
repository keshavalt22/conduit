import { NavLink } from "react-router-dom"

function Header(props) {
    return (
        <div className="header flex">
            <NavLink to='/' activeClassName="active" exact>
                <p className="logo">CONDUIT</p>
            </NavLink>
            <nav className="nav">
                {
                    props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />
                }
            </nav>
        </div>
    )
}


function NonAuthHeader() {
    return (
        <>
            <NavLink to='/' activeClassName="active" exact>
                <p>Home</p>
            </NavLink>
            <NavLink to='/login' activeClassName="active">
                <p>Log in</p>
            </NavLink>
            <NavLink to='/signup' activeClassName="active">
                <p>Sign up</p>
            </NavLink>
        </>
    )
}

function AuthHeader() {
    return (
        <>
            <NavLink to='/' activeClassName="active" exact>
                <p>Home</p>
            </NavLink>
            <NavLink to='/new_post' activeClassName="active">
                <p>New Article</p>
            </NavLink>
            <NavLink to='/settings' activeClassName="active">
                <p>Setting</p>
            </NavLink>
            <NavLink to='/profile' activeClassName="active">
                <p>Profile</p>
            </NavLink>
        </>
    )
}

export default Header;