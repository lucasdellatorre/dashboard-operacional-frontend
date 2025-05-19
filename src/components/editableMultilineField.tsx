import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface EditableMultilineFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  rows?: number;
}

const EditableMultilineField = ({
  label,
  value,
  onChange,
  rows = 8,
}: EditableMultilineFieldProps) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    if (!editing) {
      setTempValue(value);
    }
  }, [value, editing]);

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
      <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
        {label}
      </Typography>

      <Box sx={{ position: "relative", width: "100%" }}>
        <TextField
          multiline
          fullWidth
          rows={rows}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          InputProps={{ readOnly: !editing }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "1rem",
              backgroundColor: "white",
              paddingRight: "3rem", // espaço para os botões
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "customButton.gold",
              },
            },
            "& .MuiOutlinedInput-input": {
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              paddingRight: "3.5rem",
            },
            "& .MuiOutlinedInput-inputMultiline": {
              paddingRight: "3.5rem", // ⬅️ AQUI evita que o texto encoste no botão
            },
          }}
        />

        {/* Botões sobrepostos ao canto direito */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "flex",
            flexDirection: editing ? "row" : "column",
            gap: 1,
          }}
        >
          {editing ? (
            <>
              <Button
                onClick={handleConfirm}
                variant="contained"
                sx={{
                  bgcolor: "customButton.gold",
                  minWidth: "36px",
                  padding: 0,
                  height: "36px",
                  borderRadius: "0.5rem",
                  color: "white",
                }}
              >
                <CheckIcon fontSize="small" />
              </Button>
              <Button
                onClick={handleCancel}
                variant="outlined"
                sx={{
                  borderColor: "gray",
                  color: "gray",
                  minWidth: "36px",
                  padding: 0,
                  height: "36px",
                  borderRadius: "0.5rem",
                }}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setEditing(true)}
              variant="outlined"
              sx={{
                bgcolor: "customButton.gold",
                color: "white",
                minWidth: "36px",
                padding: 0,
                height: "36px",
                borderRadius: "0.5rem",
                borderColor: "transparent",
              }}
            >
              <EditIcon fontSize="small" />
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EditableMultilineField;
