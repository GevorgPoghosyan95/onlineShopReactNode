import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {Context} from "../index";

const Auth = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const click = async ()=>{
        try{
            if(isLogin){
                const response = await login(email,password)
            }else{
                const response = await registration(email,password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        }catch (e) {
            console.log(e.message)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto"> {isLogin ? 'Login' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" type="email" placeholder="enter email" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <Form.Control className="mt-3" type="password" placeholder="enter password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <Row>
                        {isLogin ?
                            <div className="mt-3">
                                if you haven't account please <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
                            </div>:
                            <div className="mt-3">
                                if you have account please <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                            </div>
                        }
                    </Row>
                    <Button className="mt-3 align-self-end" variant={"outline-success"} onClick={e=>click()}>
                        {isLogin ? 'Login' : 'Registration'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;