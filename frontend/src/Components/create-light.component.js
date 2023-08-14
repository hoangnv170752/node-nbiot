import React, { useState, useEffect } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LightForm from "./LightForm";
import Form from "react-bootstrap/Form";
import { FormControl, InputGroup } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "react-bootstrap";

// Createlight Component
const Createlight = () => {
    const { user } = useAuth0();
    const [client, setClient] = useState('');
    const [clientRal, setClientRal] = useState('');
    const [companyCode, setCompanyCode] = useState(0);
    const getVnptClient = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch("http://localhost:5001/lights/signinvnpt", requestOptions)
        .then(response => response.json())
        .then(result => setClient(result.clientId))
        .catch(error => console.log('error', error));
    }
    const getRangDong = () => {
        setClientRal(uuidv4())
    }
    const [formValues, setFormValues] =
        // useState({ Dev: '', project : '', SERVER_ADDRESS: '', SERVER_MQTT_PORT: '', SERVER_MQTT_USER: '', SERVER_MQTT_PASS:'' })
        useState({ project : '', vendor: '', CLIENT_ID: '' ,SERVER_ADDRESS: '', SERVER_MQTT_PORT: '', SERVER_MQTT_USER: '', SERVER_MQTT_PASS:'' , CSE_ID: '', CSE_NAME:'', FROM_ID: '', APP_ID: '' , MAC: '' })
        // onSubmit handler
    const onSubmit = async lightObject => {
        if (companyCode === 0) {
            lightObject.vendor = '0'
            lightObject.CLIENT_ID = clientRal;
        } else if (companyCode === 1) {
            lightObject.vendor = '1'
            lightObject.CLIENT_ID = client;
        } else {
            lightObject.vendor = '0'
            lightObject.CLIENT_ID = clientRal;
        }
        console.log(lightObject)

        await Axios.post(
        'http://localhost:5001/lights/create-light',
        lightObject)
        .then(res => {
            console.log(lightObject)

            if (res.status === 200) {
                console.log(lightObject)
                alert('Light successfully created') 
                toast.success("Successful adding light !", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else {
                alert('Tạo đèn có vấn đề') 
                Promise.reject()
            }
        })
        .catch(err => alert('Lỗi khi tạo đèn, có thể mac đã có trên hệ thống hoặc backend bị lỗi nha'))
    }
    // let formData = new FormData();
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${light}`)
    }
    // const onFileChange = (e) => {
    //     console.log(e.target.files[0])
    //     if(e.target && e.target.files[0]) {
    //         formData.append('file', e.target.files[0]);
    //     }
    // }
    const setCompany = (code) => {
        setCompanyCode(code);
    }
    const [light, setLight] = useState("");
    useEffect(() => {
        getVnptClient();
        getRangDong();
    }, [])
	const onSubmitfile = () => {
        if(light != null) {
            Axios.post(
                'http://103.160.2.183:5000/lights/create-light', light, {
                    headers: {
                      // Overwrite Axios's automatically set Content-Type
                      'Content-Type': 'application/json'
                    }
                  })
        
                .then(res => {
                    if (res.status === 200) {
                        // alert('Add file lights successfully')
                        toast.success("Add light successfully", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        setTimeout(function(){
                            window.location.reload(1);
                         }, 5000);
                    }
                    else
                    Promise.reject()
                })
                .catch(err => alert('Something went wrong'))
        }
    }
    
    
    return(
        <div className="container" >
            <div className="content-wrap">
                <div className="row ">                 
                    <div className="col mt-100">
                        <LightForm 
                            initialValues={formValues}
                            onSubmit={onSubmit }
                            enableReinitialize>
                            Thêm 1 đèn vào dự án
                        </LightForm>
                    </div>
            
                    <div className="col mt-200 md-50">
                        <div className="col ml-100">
                            Lựa chọn dự án {companyCode === 0 ? "Rạng Đông" : "VNPT"}
                            <Button  onClick={() => setCompany(0)} size="sm" variant="success">
                                Rang Dong
                            </Button>
                            <Button  onClick={() => setCompany(1)} size="sm" variant="primary">
                                VNPT
                            </Button>
                        </div> 
                        <Form onSubmit={handleSubmit}>
                            Nhập dữ liệu nhiều đèn dưới dạng JSON
                            <FormControl
                                type="text" name="myFile" onChange={(e) => setLight(e.target.value)} />
                            
                            <FormControl
                                type="submit" value="Thêm nhiều đèn" onClick={() => onSubmitfile()}
                            />
                        </Form> 
                    </div> 
                </div> 
            </div>
        </div>
        
    );
}
export default Createlight
