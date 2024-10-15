import React, { useState, useEffect } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LightForm from "./LightForm";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Createlight = () => {
    const { user } = useAuth0();
    const [client, setClient] = useState('');
    const [clientRal, setClientRal] = useState('');
    const [companyCode, setCompanyCode] = useState(0);
    const [light, setLight] = useState("");
    const [formValues, setFormValues] = useState({
        project: '',
        vendor: '',
        CLIENT_ID: '',
        SERVER_ADDRESS: '',
        SERVER_MQTT_PORT: '',
        SERVER_MQTT_USER: '',
        SERVER_MQTT_PASS: '',
        CSE_ID: '',
        CSE_NAME: '',
        FROM_ID: '',
        APP_ID: '',
        MAC: ''
    });

    useEffect(() => {
        getVnptClient();
        getRangDong();
    }, []);

    const getVnptClient = () => {
        fetch("https://node-nbiot.onrender.com/lights/signinvnpt")
            .then(response => response.json())
            .then(result => setClient(result.clientId))
            .catch(error => console.error('Error:', error));
    }

    const getRangDong = () => {
        setClientRal(uuidv4());
    }

    const onSubmit = async (lightObject) => {
        lightObject.vendor = companyCode === 1 ? '1' : '0';
        lightObject.CLIENT_ID = companyCode === 1 ? client : clientRal;

        try {
            const res = await Axios.post('https://node-nbiot.onrender.com/lights/create-light', lightObject);
            if (res.status === 200) {
                toast.success("Light successfully created!", { position: toast.POSITION.TOP_CENTER });
            } else {
                throw new Error();
            }
        } catch (error) {
            alert('Error while creating light. MAC might already exist or backend issue.');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${light}`);
    }

    const onSubmitFile = () => {
        if (light) {
            Axios.post('https://node-nbiot.onrender.com/lights/create-light', light, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    if (res.status === 200) {
                        toast.success("Added lights successfully!", { position: toast.POSITION.TOP_CENTER });
                        setTimeout(() => window.location.reload(), 5000);
                    } else {
                        throw new Error();
                    }
                })
                .catch(() => alert('Something went wrong'));
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <LightForm
                        initialValues={formValues}
                        onSubmit={onSubmit}
                        enableReinitialize
                    >
                        Thêm 1 đèn vào dự án
                    </LightForm>
                </div>

                <div className="col-md-6">
                    <div className="mb-3">
                        <h5>Lựa chọn dự án {companyCode === 0 ? "Rạng Đông" : "VNPT"}</h5>
                        <Button variant="success" size="sm" onClick={() => setCompanyCode(0)} className="mr-2">
                            Rang Dong
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => setCompanyCode(1)}>
                            VNPT
                        </Button>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="jsonData">
                            <Form.Label>Nhập dữ liệu nhiều đèn dưới dạng JSON</Form.Label>
                            <FormControl
                                as="textarea"
                                rows={5}
                                placeholder="Enter JSON data here"
                                value={light}
                                onChange={(e) => setLight(e.target.value)}
                            />
                        </Form.Group>

                        <Button type="button" variant="primary" onClick={onSubmitFile}>
                            Thêm nhiều đèn
                        </Button>
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Createlight;
