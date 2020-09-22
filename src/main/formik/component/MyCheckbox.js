import {useField} from 'formik';
import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styled from 'styled-components';

const Div = styled.div`
  color: #f44336 !important;
  margin-top: 0 !important;
  margin-bottom: 12px !important;
`;

const MyCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox {...field} />
        }
        label={children}
      />
      {meta.touched && meta.error ? (
        <Div className="MuiFormHelperText-contained MuiFormHelperText-root">{meta.error}</Div>
      ) : null}
    </>
  );
};

export default MyCheckbox;
