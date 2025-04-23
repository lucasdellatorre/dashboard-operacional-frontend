import React from "react";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Controller, Control } from "react-hook-form";

type MultiSelectProps = {
  name: string;
  label: string;
  options: string[];
  control: Control<any>;
  required?: boolean;
  multiSelect: boolean;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  label,
  options,
  control,
  required,
  multiSelect,
}) => {
  function renderValue(selected: any) {
    if (multiSelect) {
      return (selected: string[]) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={value} />
          ))}
        </Box>
      );
    }
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel
            sx={{
              "&.Mui-focused": {
                color: "#221F1F",
              },
            }}
          >
            {label}
          </InputLabel>
          <Select
            required={required}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D9D9D9",
              },
            }}
            multiple={multiSelect}
            value={field.value}
            onChange={field.onChange}
            input={<OutlinedInput label={label} />}
            renderValue={renderValue(field.value)}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {multiSelect && (
                  <Checkbox
                    checked={field.value?.includes(option)} 
                    sx={{
                      color: "#9E833B",
                      "&.Mui-checked": {
                        color: "#9E833B",
                      },
                    }}
                  />
                )}
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
export default MultiSelect;
