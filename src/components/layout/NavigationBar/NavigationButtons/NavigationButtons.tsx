import { Box, Typography } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import MediationIcon from "@mui/icons-material/Mediation";
import TargetIcon from "@mui/icons-material/AdsClickOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Groups2Icon from "@mui/icons-material/Groups2";
import { textStyles } from "../../../../theme/typography";
import { Link, useLocation } from "react-router-dom";

const NavigationButtons: React.FC = () => {
  const location = useLocation();
  const isOperationsPage = location.pathname === "/operacoes";
  const isSuspectsPage = location.pathname === "/alvos";
  const isWebChart = location.pathname === "/teia";

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <Box p={2} flex={1}>
      <Link to="/operacoes" style={{ textDecoration: "none", color: "white" }}>
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          gap={2}
          p={1.5}
          borderRadius="8px"
          sx={{
            background: isActive("/operacoes")
              ? "#9E833B"
              : "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: isActive("/operacoes")
                ? "#9E833B"
                : "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
              transform: "translateX(5px)",
            },
          }}
        >
          <TargetIcon />
          <Typography sx={{ ...textStyles.navigationBarTitle }}>
            Operações
          </Typography>
        </Box>
      </Link>
      <Link to="/alvos" style={{ textDecoration: "none", color: "white" }}>
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          gap={2}
          p={1.5}
          borderRadius="8px"
          sx={{
            background: isActive("/alvos")
              ? "#9E833B"
              : "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: isActive("/alvos")
                ? "#9E833B"
                : "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
              transform: "translateX(5px)",
            },
          }}
        >
          <Groups2Icon />

          <Typography sx={{ ...textStyles.navigationBarTitle }}>
            Alvos
          </Typography>
        </Box>
      </Link>

      {!isOperationsPage && !isSuspectsPage && !isWebChart && (
        <>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              gap={2}
              p={1.5}
              borderRadius="8px"
              sx={{
                background: isActive("/dashboard")
                  ? "#9E833B"
                  : "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: isActive("/operacoes")
                    ? "#9E833B"
                    : "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                  transform: "translateX(5px)",
                },
              }}
            >
              <AssessmentIcon />
              <Typography sx={{ ...textStyles.navigationBarTitle }}>
                Dashboard
              </Typography>
            </Box>
          </Link>
          <Link to="/teia" style={{ textDecoration: "none", color: "white" }}>
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              gap={2}
              p={1.5}
              borderRadius="8px"
              sx={{
                background: isActive("/teia")
                  ? "#9E833B"
                  : "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: isActive("/teia")
                    ? "#9E833B"
                    : "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                  transform: "translateX(5px)",
                },
              }}
            >
              <MediationIcon />
              <Typography sx={{ ...textStyles.navigationBarTitle }}>
                Teia
              </Typography>
            </Box>
          </Link>

          <Box
            onClick={(e) => e.preventDefault()}
            sx={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              gap={2}
              p={1.5}
              borderRadius="8px"
              sx={{
                background: isActive("/tabelas")
                  ? "#9E833B"
                  : "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: isActive("/operacoes")
                    ? "#9E833B"
                    : "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                  transform: "translateX(5px)",
                },
              }}
            >
              <TableChartIcon />
              <Typography sx={{ ...textStyles.navigationBarTitle }}>
                Tabelas
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default NavigationButtons;
