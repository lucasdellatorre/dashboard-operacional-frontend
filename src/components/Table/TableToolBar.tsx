import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
  headerCollor
}) => {
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
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionado(s)
        </Typography>
      ) : (
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
            {title}
          </Typography>
        </Box>
      )}
      {numSelected > 0 && (
        <Tooltip title="Excluir">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
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
