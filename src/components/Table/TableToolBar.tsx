import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React from "react";

interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
  onDelete?: () => void;
  onAdd?: () => void;
  addButton?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  headerCollor?: string;
  allowDelete?: boolean;
}

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = ({
  numSelected,
  title,
  onDelete,
  addButton = false,
  onAdd,
  collapsed,
  collapsible,
  onToggleCollapse,
  headerCollor,
  allowDelete = false
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleDeleteClick = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const handleConfirmDelete = () => {
    setOpenDialog(false);
    if (onDelete) onDelete();
  };
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        collapsed && headerCollor ?
          { bgcolor: headerCollor, }
          :
          numSelected > 0 ?
            { bgcolor: "table.grey" }
            :
            { bgcolor: "table.grey" },
      ]}
    >
      <Box
        sx={{ flex: "1 1 100%", display: "flex", alignItems: "center", cursor: collapsible ? "pointer" : "default" }}
        onClick={collapsible ? onToggleCollapse : undefined}
      >
        {collapsible && (
          <IconButton size="small">
            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        )}
        <Typography variant="h6" id="tableTitle" component="div">
          {numSelected > 0 ? `${numSelected} selecionado(s)` : title}
        </Typography>
      </Box>
      {allowDelete && typeof onDelete === 'function' && (
        <Box display="flex" alignItems="center" gap={1} sx={{ whiteSpace: 'nowrap', ml: 'auto', pr: 3 }}>
          <Tooltip title="Excluir todos">
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
            Excluir todos
          </Typography>
          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogContent>
              <Typography>
                Deseja realmente excluir todos?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="inherit">
                Cancelar
              </Button>
              <Button onClick={handleConfirmDelete} color="error" variant="contained">
                Excluir todos
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      {addButton && (
        <Button
          onClick={onAdd}
          sx={{
            bgcolor: "customButton.gold",
            color: "customText.white",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Adicionar
        </Button>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
