import React from "react";
// import Debug from './Debug';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from './component/MyTextInput';
import MyCheckbox from './component/MyCheckbox';
import FormikSelect from "./component/FormikSelect";
import {Button} from "@material-ui/core";

type Props = {
  firstName: string
  lastName: string
  email: string
  acceptedTerms: boolean
  jobType: string
}

const jobTypesItems = [
  {
    label: "Select a job type",
    value: ""
  },
  {
    label: "Designer",
    value: "designer"
  },
  {
    label: "Developer",
    value: "development"
  },
  {
    label: "Product Manager",
    value: "product"
  },
  {
    label: "Other",
    value: "other"
  },
];

const SignupForm: React.FC<Props> = (initialValues) => {
  return (
    <>
      <h2>Subscribe!</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          jobType: Yup.string()
            .oneOf(
              ['designer', 'development', 'product', 'other'],
              'Invalid Job Type'
            )
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >

        {({
            values,
            isValid,
            /* and other goodies; i.e. errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, */
          }) => {

          return <Form style={{width: 347}}>
            <MyTextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Jane"
            />
            <MyTextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Doe"
            />
            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />

            <FormikSelect
              name="jobType"
              items={jobTypesItems}
              label={`Job Type *`}
            />

            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>

            <Button type="submit" variant="contained" color="primary" disabled={!isValid || !values.acceptedTerms}>
              Submit
            </Button>
            {/*<Debug />*/}
          </Form>
        }}
      </Formik>
    </>

  );
};

export default SignupForm;
