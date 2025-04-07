import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

interface ToggleButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isCollapsed,
  onToggle,
}) => {
  return (
    <IconButton
      onClick={onToggle}
      sx={{
        position: "fixed",
        left: isCollapsed ? "17px" : "20.75rem",
        top: "50%",
        transform: "translateX(-50%)",
        bgcolor: "customBackground.darkGray",
        color: "white",
        padding: "6px",
        "&:hover": {
          bgcolor: "customBackground.darkGray",
        },
        zIndex: 2,
        transition: "left 0.7s ease-in-out",
        boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "0px 8px 8px 0px",
        "@media (max-width: 1024px)": {
          left: isCollapsed ? "17px" : "16rem",
        },
      }}
    >
      {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
    </IconButton>
  );
};

export default ToggleButton;
