import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useField, useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const CheckboxWrapper = ({ name, label, options, legend, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setFieldValue(name, value);
  };
  const { embed } = useSelector((state) => state.users);

  const configCheckbox = {
    ...field,
    onChange: handleChange,
  };

  const configFormControl = {
    ...otherProps,
  };
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl
      {...configFormControl}
      sx={{
        display: "block",
        pb: 1,
        ...(!embed && {
          pb: 3,
        }),
        "& .MuiFormGroup-root": {
          flexDirection: "row",
        },
      }}
    >
      <FormLabel component="legend">{legend}</FormLabel>
      <RadioGroup name="title" onChange={handleChange}>
        {options.map((option) => {
          return (
            <FormControlLabel
              key={option.value}
              control={<Radio {...configCheckbox} value={option.value} />}
              label={option.key}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
