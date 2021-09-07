import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink, Redirect, useHistory} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory();

    function login() {
        history.push('/login')
    }

    function logout() {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        history.push('/login')
    }

    return (
        <nav className="navbar bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={SHOP_ROUTE} style={{color:"white"}}>Navbar</NavLink>
                <div>
                    {user.isAuth ?
                        <button className={"btn btn-primary"} style={{marginLeft:"10px"}} onClick={()=>logout()} >Logout</button> :
                        <button className={"btn btn-primary"} onClick={login} >Login</button>
                    }
                </div>
            </div>
        </nav>
    );
});

export default NavBar;