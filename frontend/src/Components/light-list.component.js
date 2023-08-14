import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import LightTableRow from "./LightTableRow";
import Footer from './footer.component';
import './light.css';
import { TableHead, TableRow, TableContainer, Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import { CSVLink } from "react-csv";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import DownloadIcon from '@mui/icons-material/Download';

const Lightlist = () => {
    const [lights, setLights] = useState([]);

    useEffect(() => {
        axios
        .get("http://103.160.2.183:5000/lights/")
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
        <div>
            <div>
                <div className="">
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab variant="extended" size="small" color="primary" aria-label="add">
                            <DownloadIcon sx={{ mr: 1 }} />
                            <CSVLink data={lights} style={{color: "white"}}>Tải xuống dữ liệu đèn</CSVLink>
                        </Fab>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table striped bordered hover>
                            <TableHead>
                                <TableRow>
                                    <th>Project</th>
                                    <th>Address</th>
                                    <th>Client_Id</th>
                                    <th>MQTT Port</th>
                                    <th>MQTT User</th>
                                    <th>MQTT Pass</th>
                                    <th>CSE_ID</th>
                                    <th>CSE_NAME</th>
                                    <th>FROM_ID</th>
                                    <th>APP_ID</th>
                                    <th>MAC</th>
                                    <th>STATUS Light</th>
                                    <th>Action</th>
                                </TableRow>
                            </TableHead>
                            <tbody>{DataTable()}</tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>          
            <Footer />  
        </div>
    );
};

export default Lightlist;
