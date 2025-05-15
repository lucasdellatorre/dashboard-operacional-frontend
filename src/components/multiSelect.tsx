import {
  Autocomplete,
  Checkbox,
  Chip,
  TextField,
  Box,
  ListItemText,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { red } from "@mui/material/colors";


type Style = "white" | "gray";

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  height?: string;
  placeholder: string;
  style: Style;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
  style,
  height = "auto",
  placeholder,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Autocomplete
        multiple
        disableCloseOnSelect
        options={options}
        value={selectedOptions}
        onChange={(_, value) => onChange(value)}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              size="small"
              sx={{
                backgroundColor: style == "white" ? "white" : "#F1F1F1",
                color: style == "white" ? "black" : "customText.black",
                fontWeight: 500,
                fontFamily: "Inter",
                border: "1px solid #c8c8c8",
                borderRadius: "10px",
                flexShrink: 0,
              }}
              deleteIcon={
                <CloseIcon
                  sx={{
                    fontSize: 20,
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                />
              }
            />
          ))
        }
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              checked={selected}
              size="small"
              sx={{
                padding: "4px 8px 4px 0",
                color: "customButton.gold",
                "&.Mui-checked": {
                  color: "customButton.gold",
                },
              }}
            />
            <ListItemText
              primary={option}
              primaryTypographyProps={{
                sx: { fontSize: "0.875rem" },
              }}
            />
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "8px 14px",
                minHeight: height,
                display: "flex",
                alignItems: "center",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "& .MuiInputBase-input::placeholder": {
                color: style === "white" ? "#a2a2a2" : "black",
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default MultiSelect;
