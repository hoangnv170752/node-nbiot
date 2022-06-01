import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const LightForm = (props) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        MAC: Yup.string()
        // .email("You have enter an invalid email address")
        .required("Required"),
        project: Yup.string()
        // .positive("Invalid roll number")
        // .integer("Invalid roll number")
        .required("Required"),
});
console.log(props);
return (
	<div className="form-wrapper">
	<Formik {...props} validationSchema={validationSchema}>
		<Form>
            <FormGroup>
                NAME
                <Field name="name" type="text"
                    className="form-control" />
                <ErrorMessage
                name="name"
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
            <FormGroup>
                PROJECT
                <Field name="project" type="text"
                    className="form-control" />
                <ErrorMessage
                name="project"
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
