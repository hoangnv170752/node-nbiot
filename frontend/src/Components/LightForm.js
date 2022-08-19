import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const LightForm = (props) => {
    const validationSchema = Yup.object().shape({
        project: Yup.string()
        // .email("You have enter an invalid email address")
        .required("Required"),
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
console.log(props);
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
            {/* <FormGroup>
                Project
                <Field name="project" type="text"
                    className="form-control" />
                <ErrorMessage
                name="project"
                className="d-block invalid-feedback"
                component="span"
                />
            </FormGroup> */}
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
