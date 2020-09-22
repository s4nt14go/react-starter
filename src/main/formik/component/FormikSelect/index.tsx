import React, { ReactNode } from 'react';
import {Field, ErrorMessage, FieldInputProps, FormikConsumer} from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './index.css';

export interface FormikSelectItem {
  label: string;
  value: string;
}

interface FormikSelectProps {
  name: string;
  items: FormikSelectItem[];
  label: string;
  required?: boolean;
}

interface MaterialUISelectFieldProps extends FieldInputProps<string> {
  errorString?: string;
  children: ReactNode;
  label: string;
  required: boolean;
}

const MaterialUISelectField: React.FC<MaterialUISelectFieldProps> = ({
                                                                       errorString,
                                                                       label,
                                                                       children,
                                                                       value,
                                                                       name,
                                                                       onChange,
                                                                       onBlur,
                                                                       required
                                                                     }) => {
  return (
    <FormControl fullWidth variant="outlined" required style={{margin: '0 0 12px'}}>
      <InputLabel required={required}>{label}</InputLabel>
      <Select name={name} onChange={onChange} onBlur={onBlur} value={value} label={label}>
        {children}
      </Select>
      <FormHelperText>{errorString}</FormHelperText>
    </FormControl>
  );
};

const FormikSelect: React.FC<FormikSelectProps> = ({ name, items, label, required = false }) => {
  return (
    <FormikConsumer>
      {({ errors, touched }) => {
        return <div className={errors.jobType && touched.jobType? 'red' : ''}>
          <Field variant="outlined"
                 name={name}
                 as={MaterialUISelectField}
                 label={label}
                 errorString={<ErrorMessage name={name} />}
                 required={required}
          >
            {items.map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Field>
        </div>
      }}
    </FormikConsumer>);
};

export default FormikSelect;
