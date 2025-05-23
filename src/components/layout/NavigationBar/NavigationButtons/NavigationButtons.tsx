import { Box } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import MediationIcon from "@mui/icons-material/Mediation";
import TargetIcon from "@mui/icons-material/AdsClickOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Groups2Icon from "@mui/icons-material/Groups2";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NavigationButton from "./NavigationButton/NavigationButton";
import ToggleButton from "../ToggleButton/ToggleButton";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

interface NavigationButtonsProps {
  isCollapsed: boolean;
  onToggle: () => void;
  logout: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  isCollapsed,
  onToggle,
  logout,
}) => {
  const location = useLocation();
  const isOperationsPage = location.pathname === "/operacoes";
  const isSuspectsPage = location.pathname === "/alvos";
  const isWorksheetPage = location.pathname === "/planilhas";

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <Box
      mt={!isCollapsed ? 0 : 6}
      py={2}
      px={isCollapsed ? 1 : 2}
      display="flex"
      flexDirection="column"
      height="100%"
    >
      <Box flex={1}>
        <ToggleButton
          icon={isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          isCollapsed={isCollapsed}
          onClick={onToggle}
        />

        <NavigationButton
          to="/planilhas"
          icon={<DriveFolderUploadIcon />}
          label="Planilhas"
          isCollapsed={isCollapsed}
          isActive={isActive("/planilhas")}
        />

        <NavigationButton
          to="/operacoes"
          icon={<TargetIcon />}
          label="Operações"
          isCollapsed={isCollapsed}
          isActive={isActive("/operacoes")}
        />

        <NavigationButton
          to="/alvos"
          icon={<Groups2Icon />}
          label="Alvos"
          isCollapsed={isCollapsed}
          isActive={isActive("/alvos")}
        />

        {!isOperationsPage && !isSuspectsPage && !isWorksheetPage && (
          <>
            <NavigationButton
              to="/dashboard"
              icon={<AssessmentIcon />}
              label="Dashboard"
              isCollapsed={isCollapsed}
              isActive={isActive("/dashboard")}
            />

            <NavigationButton
              to="/teia"
              icon={<MediationIcon />}
              label="Teia"
              isCollapsed={isCollapsed}
              isActive={isActive("/teia")}
            />

            <NavigationButton
              icon={<TableChartIcon />}
              label="Tabelas"
              isCollapsed={isCollapsed}
              isActive={isActive("/tabelas")}
              onClick={(e) => e.preventDefault()}
            />
          </>
        )}
      </Box>

      <Box>
        <NavigationButton
          icon={<LogoutIcon />}
          label="Logout"
          isCollapsed={isCollapsed}
          isActive={false}
          onClick={logout}
        />
      </Box>
    </Box>
  );
};

export default NavigationButtons;
