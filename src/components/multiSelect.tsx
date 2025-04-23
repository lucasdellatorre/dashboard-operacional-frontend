import {
  Checkbox,
  Chip,
  ListItemText,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import React from "react";

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  height?: string;
  placeholder: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
  height = "auto",
  placeholder,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string[];
    onChange(value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        placeholder={placeholder}
        select
        value={selectedOptions}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: false }}
        SelectProps={{
          multiple: true,
          displayEmpty: true,
          renderValue: (selected) => {
            if ((selected as string[]).length === 0) {
              return (
                <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                  {placeholder}
                </span>
              );
            }
            return (
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "5px",
                  overflowX: "auto",
                  width: "100%",
                  padding: "4px 0",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
                className="hide-scrollbar"
              >
                {(selected as string[]).map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    sx={{
                      flexShrink: 0,
                      backgroundColor: "#f0f0f0",
                      borderRadius: "16px",
                    }}
                  />
                ))}
              </div>
            );
          },
          MenuProps: {
            PaperProps: {
              style: {
                maxHeight: 150,
                width: "auto",
                maxWidth: "100%",
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            marginThreshold: 8,
          },
        }}
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            width: "100%",
          },
          "& .MuiSelect-select": {
            width: "100%",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            minHeight: height !== "auto" ? height : "auto",
            "& .hide-scrollbar::-webkit-scrollbar": {
              display: "none",
            },
          },
        }}
        InputProps={{
          notched: false,
          sx: {
            height: height,
            width: "100%",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.23)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.23)",
              borderWidth: "1px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.23)",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            dense
            sx={{
              padding: "4px 16px",
              "&:hover": {
                backgroundColor: "rgba(158, 131, 59, 0.08)",
              },
              "&.Mui-selected": {
                backgroundColor: "transparent",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08)",
              },
            }}
          >
            <Checkbox
              size="small"
              sx={{
                padding: "4px 8px 4px 0",
                color: "customButton.gold",
                "&.Mui-checked": {
                  color: "customButton.gold",
                },
              }}
              checked={selectedOptions.indexOf(option) > -1}
            />
            <ListItemText
              primary={option}
              primaryTypographyProps={{
                sx: { fontSize: "0.875rem" },
              }}
            />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default MultiSelect;
