import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface EditableFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (newValue: string) => void;
}

const EditableField = ({ label, placeholder, value, onChange }: EditableFieldProps) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleConfirm = () => {
    onChange(tempValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setEditing(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Typography variant="subtitle2" fontWeight={600}>
        {label}
      </Typography>
      <Box 
        display="flex" 
        flexDirection="row"
      sx={{ gap: editing ? 1 : 0 }}
      >
        <TextField
          variant="outlined"
          placeholder={placeholder}
          value={editing ? tempValue : value}
          onChange={(e) => setTempValue(e.target.value)}
          InputProps={{ readOnly: !editing }}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: editing ? "0.313rem" : "0.313rem 0 0 0.313rem",
              backgroundColor: "white",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "customButton.gold",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "0.625rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
            },
            "& label.Mui-focused": {
              color: "customButton.gold",
            },
          }}
        />
        {editing ? (
          <>
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{
                bgcolor: "customButton.gold",
                color: "white",
                minWidth: "45px",
                padding: "6px",
              }}
            >
              <CheckIcon fontSize="small" />
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                color: "gray",
                minWidth: "45px",
                padding: "6px",
                borderColor: "gray",
              }}
            >
              <CloseIcon fontSize="small" />
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            onClick={() => setEditing(true)}
            sx={{
              bgcolor: "customButton.gold",
              borderColor: "transparent",
              borderRadius: "0 0.313rem 0.313rem 0",
              color: "customText.white",
              textTransform: "none",
              fontWeight: 400,
              minWidth: "45px",
            }}
          >
            <EditIcon sx={{ fontSize: "1rem" }} />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EditableField;
