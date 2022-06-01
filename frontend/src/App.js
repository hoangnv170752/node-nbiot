// Import React
import React from "react";
// Import Bootstrap
import { Nav, Navbar, Container, Row, Col }
		from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// Import Custom CSS
import "./App.css";
// Import from react-router-dom
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Import other React Component
import Createlight from "./Components/create-light.component";
import Editlight from "./Components/edit-light.component";
import Lightlist from "./Components/light-list.component";

// App Component
const App = () => {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>
          <Link to={"/create-light"}
          className="nav-link">
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
        </Nav>
        </Container>
      </Navbar>
      </header>

      <Container>
      <Row>
        <Col md={12}>
        <div className="wrapper">
          <Routes>
            <Route exact path="/"
              element={<Createlight />} />
            <Route path="/create-light"
              element={<Createlight />} />
            <Route path="/edit-light/:id"
              element={<Editlight />} />
            <Route path="/light-list"
              element={<Lightlist />} />
          </Routes>
        </div>
        </Col>
      </Row>
      </Container>
    </div>
    </Router>
  );
};

export default App;