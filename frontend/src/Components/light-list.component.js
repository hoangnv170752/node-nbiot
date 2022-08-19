import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import LightTableRow from "./LightTableRow";
import Footer from './footer.component';
import './light.css';

const Lightlist = () => {
    const [lights, setLights] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:5000/lights/")
        .then(({ data }) => {
            setLights(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const DataTable = () => {
        return lights.map((res, i) => {
        return <LightTableRow obj={res} key={i} />;
        });
    };

    return (
        <div className = "page-container">
            <div className="content-wrap">
                <div className="table-wrapper">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Address</th>
                                <th>MQTT Port</th>
                                <th>MQTT User</th>
                                <th>MQTT Pass</th>
                                <th>CSE_ID</th>
                                <th>CSE_NAME</th>
                                <th>FROM_ID</th>
                                <th>APP_ID</th>
                                <th>MAC</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{DataTable()}</tbody>
                    </Table>
                </div>
            </div>          
            <Footer />  
        </div>
    );
};

export default Lightlist;
