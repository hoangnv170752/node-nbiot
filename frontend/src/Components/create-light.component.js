import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LightForm from "./LightForm";
import Form from "react-bootstrap/Form";
import { FormControl, InputGroup } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';
// Createlight Component
const Createlight = () => {
    const { user } = useAuth0();
    const [formValues, setFormValues] =
        useState({ name: '', MAC: '', project: '' })
    // onSubmit handler
    const onSubmit = lightObject => {
        axios.post(
        'http://localhost:5000/lights/create-light',
        lightObject)
        .then(res => {
            if (res.status === 200)
            alert('Light successfully created')
            else
            Promise.reject()
        })
        .catch(err => alert('Something went wrong'))
    }
	const onSubmitfile = obj => {
        axios.post(
        'http://localhost:5000/lights/config-light',
        obj)
        .then(res => {
            if (res.status === 200)
            alert('Add file lights successfully')
            else
            Promise.reject()
        })
        .catch(err => alert('Something went wrong'))
    }

    return(
        <div className="container">
            <div className="row">
            <LightForm 
                initialValues={formValues}
                onSubmit={onSubmit}
                enableReinitialize>
                Add Light MAC
            </LightForm>
            </div>
            <div className="row">
            <Form>
                <InputGroup action="/config-light" enctype="multipart/form-data" method="POST">
                    <FormControl
                        type="file" name="myFile"       
                    />
                    <FormControl
                        type="submit" value="Upload a file" onClick={onSubmitfile}
                    />
                </InputGroup>
            </Form>
            <JSONPretty data={user} />
            </div>
        <div>

        </div>
        </div>
    )
}


export default Createlight
