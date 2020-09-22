import {useField} from 'formik';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 0 12px;
  div {
    width: 100%;
  }
`;

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <Container>
      <TextField
        required
        id="outlined-required"
        label={label}
        variant="outlined"
        {...field} {...props}
        error={meta.touched && meta.error}
        helperText={meta.touched && meta.error}
      />
    </Container>
  );
};

export default MyTextInput;
