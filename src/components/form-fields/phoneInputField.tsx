import React from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import { MuiTelInput, MuiTelInputProps } from "mui-tel-input";

type FormMobileInputProps = MuiTelInputProps & {
  name: string;
  id?: string;
  control: Control<FieldValues, object> | any;
  rules?: any;
  country?: string;
  label?: string;
  defaultValue: string;
  size?: "small" | "medium";
  showErrorMessage?: boolean;
};
const FormMobileInput: React.FC<FormMobileInputProps> = ({
  name,
  control,
  rules,
  label,
  size = "small",
  showErrorMessage = true,
  defaultValue,
  ...props
}) => {
  return (
    <div className="phone-input">
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, value }, fieldState }) => (
          <MuiTelInput
            value={value}
            onChange={onChange}
            label={label}
            defaultCountry="IN"
            focusOnSelectCountry
            variant="outlined"
            size={size}
            style={{ width: "100%" }}
            error={fieldState.invalid}
            helperText={
              showErrorMessage && fieldState.invalid
                ? "Mobile number is invalid"
                : ""
            }
            {...props}
          />
        )}
      />
    </div>
  );
};

export default FormMobileInput;
