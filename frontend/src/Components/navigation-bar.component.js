import Createlight from "./create-light.component";
import Editlight from "./edit-light.component";
import Lightlist from "./light-list.component";
import Login from "./sign-in.component";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navbar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import  Avatar from "@mui/material/Avatar";
import { useAuth0 } from '@auth0/auth0-react';

function NavigationBar() {
    const { user } = useAuth0();

    return (
            <Navbar bg ="dark" variant = "dark">
                <Container>
                    <Navbar.Brand>
                        <Link to={"/create-light"} className="nav-link">
                            <img src="http://14.225.13.96:5555/assets/images/logo.png" alt="" width="40" height="44" />
                            NB-IOT MAC
                        </Link>                   
                    </Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Nav>
                        <Link to={"/create-light"}
                            className="nav-link">
                            Create Light
                        </Link>
                        </Nav>

                        <Nav>
                        <Link to={"/light-list"}
                            className="nav-link">
                            Light List
                        </Link>
                        </Nav>                        
                        <Nav>
                            <Link to={"/login"}
                            className="nav-link"
                            >
                                <LogoutIcon />
                                Log Out from <span>{user.nickname}</span>
                            </Link>
                        </Nav>
                        
                    </Nav>
                </Container>
            </Navbar>
    );
}

export default NavigationBar;