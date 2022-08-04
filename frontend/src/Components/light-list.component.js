import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import LightTableRow from "./LightTableRow";

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
        <div className="table-wrapper">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>MAC</th>
                    <th>PROJECT</th>
                    <th>IP </th>
                    <th>PORT</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>{DataTable()}</tbody>
        </Table>
        </div>
    );
};

export default Lightlist;
