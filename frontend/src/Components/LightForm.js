import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import { useState } from "react";
import Stack from '@mui/material/Stack';

const LightForm = (props) => {
    const [selectedOption, setSelectedOption] = useState('');
    // const [client, setClient] = useState('');
    const validationSchema = Yup.object().shape({
        project: Yup.string()
        // .email("You have enter an invalid email address")
        .required("Required"),
        vendor: Yup.string(),
        CLIENT_ID: Yup.string(),
        SERVER_ADDRESS: Yup.string()
        // .positive("Invalid roll number")
        // .integer("Invalid roll number")
        .required("Required"),
        SERVER_MQTT_PORT: Yup.string()
        .required("Required"),
        SERVER_MQTT_USER: Yup.string()
        .required("Required"),
        SERVER_MQTT_PASS: Yup.string()
        .required("Required"),
        CSE_ID: Yup.string()
        .required("Required"),
        CSE_NAME: Yup.string()
        .required("Required"),
        FROM_ID: Yup.string()
        .required("Required"),
        APP_ID: Yup.string()
        .required("Required"),
        MAC: Yup.string()
        .required("Required")
    });
    // const getVnptClient = () => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };
        
    //     fetch("http://103.116.8.27:5001/lights/signinvnpt", requestOptions)
    //     .then(response => response.json())
    //     .then(result => setClient(result.clientId))
    //     .catch(error => console.log('error', error));
    // }

    // React.useEffect(() => {
    //     getVnptClient();
    // })
console.log(props);
const options = [
    { value: "0", label: "Rạng Đông" },
    { value: "1", label: "VNPT" },
    { value: "2", label: "Viettel" },
];
const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    return selectedOption
};
return (
	<div className="form-wrapper">
	<Formik {...props} validationSchema={validationSchema}>
		<Form>
            <FormGroup>
                Dự án 
                <Field name="project" type="text"
                    className="form-control" />
                <ErrorMessage
                name="project"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup>
            <FormGroup>
                Thuộc công ty (*VendorId)
                {/* <Field name="vendor" type="select"
                    className="form-control" /> */}
                <Field as="select" name="vendor" className='form-control' disabled>
                    <option value=""> </option> 
                    {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </Field>
                <ErrorMessage
                    name="vendor"
                    className="d-block invalid-feedback"
                    component="span"
                />
            </FormGroup>
            <FormGroup>
                Client Id
                <Stack direction="row" spacing={2}>
                    {/* {selectedOption !== '1' && */}
                     <Field name="CLIENT_ID" type="text" className="form-control" disabled/>
                    {/* selectedOption === '1' &&
                        <>
                            <Field name="CLIENT_ID" type="text" className="form-control" value={client}/> 
                            <Button variant="success" size="lg" block="block" type="submit" onClick={() => {}}>{props.CLIENT_ID}</Button>
                        </>
                     */}
                </Stack>
                <ErrorMessage
                name="CLIENT_ID"
                className="d-block invalid-feedback"
                component="span"
            />
            </FormGroup>
            <FormGroup>
                Địa chỉ server
                <Field name="SERVER_ADDRESS" type="text"
                    className="form-control" />
                <ErrorMessage
                name="SERVER_ADDRESS"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup>
            <FormGroup>
                Port mqtt
                <Field name="SERVER_MQTT_PORT" type="text"
                    className="form-control" />
                <ErrorMessage
                name="SERVER_MQTT_PORT"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup>
            <FormGroup>
                Tài khoản mqtt 
                <Field name="SERVER_MQTT_USER" type="text"
                    className="form-control" />
                <ErrorMessage
                name="SERVER_MQTT_USER"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup>
            <FormGroup>
                Mật khẩu mqtt
                <Field name="SERVER_MQTT_PASS" type="text"
                    className="form-control" />
                <ErrorMessage
                name="SERVER_MQTT_PASS"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup>
            <FormGroup>
                CSE_ID
                <Field name="CSE_ID" type="text"
                    className="form-control" />
                <ErrorMessage
                name="CSE_ID"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup>
            <FormGroup>
                CSE_NAME
                <Field name="CSE_NAME" type="text"
                    className="form-control" />
                <ErrorMessage
                name="CSE_NAME"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup>
            <FormGroup>
                FROM_ID
                <Field name="FROM_ID" type="text"
                    className="form-control" />
                <ErrorMessage
                name="FROM_ID"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup>
            <FormGroup>
                APP_ID
                <Field name="APP_ID" type="text"
                    className="form-control" />
                <ErrorMessage
                name="APP_ID"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup>
            <FormGroup>
                MAC
                <Field name="MAC" type="text"
                    className="form-control" />
                <ErrorMessage
                name="MAC"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup>
            <Button variant="danger" size="lg"
                block="block" type="submit" >
                {props.children}
            </Button>
		</Form>
	</Formik>
	</div>
);
};

export default LightForm;
