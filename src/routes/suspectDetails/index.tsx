import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import GenericTable from "../../components/Table/Table";
import { GenericData, HeadCell } from "../../interface/table/tableInterface";

interface Email extends GenericData {
  email: string;
  insertDate: string;
  insertBy: string;
}
interface Phone extends GenericData {
  phone: string;
  insertDate: string;
  insertBy: string;
}
interface Ips extends GenericData {
  ips: string;
  date: string;
}

const SuspectsDetails = () => {
  const EmailHeaderCells: readonly HeadCell<Email>[] = [
    {
      id: "email",
      label: "Email",
    },
    {
      id: "insertDate",
      label: "Data de Inserção",
    },
    {
      id: "insertBy",
      label: "Inserido por",
    },
    {
      id: "edit",
      label: "",
      iconAction: {
        icon: <EditIcon sx={{ fontSize: "1.2rem" }} />,
        onClick: () => {
          console.log("editar");
        },
      },
    },
  ];

  const PhoneHeaderCells: readonly HeadCell<Phone>[] = [
    {
      id: "phone",
      label: "Celular",
    },
    {
      id: "insertDate",
      label: "Data de Inserção",
    },
    {
      id: "insertBy",
      label: "Inserido por",
    },
    {
      id: "edit",
      label: "",
      iconAction: {
        icon: <EditIcon sx={{ fontSize: "1.2rem" }} />,
        onClick: () => {
          console.log("editar");
        },
      },
    },
  ];
  const IPsHeaderCells: readonly HeadCell<Ips>[] = [
    {
      id: "ips",
      label: "IPs",
    },
    {
      id: "date",
      label: "Data",
    },
  ];
  return (
    <>
      <Box
        bgcolor={"customBackground.secondary"}
        sx={{
          pt: "clamp(1rem, 3vh, 3rem)",
          pb: "clamp(1rem, 2vh, 3rem)",
          px: "clamp(1rem, 3.5vw, 4rem)",
          display: "flex",
          gap: 2,
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          sx={{
            mb: 1,
            fontSize: "1.125rem",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => window.history.back()}
        >
          <ArrowBackIosIcon
            sx={{
              fontSize: "1.125rem",
            }}
          />
          Voltar
        </Typography>

        <Typography
          variant="h5"
          color="#000000"
          fontWeight={700}
          sx={{ fontFamily: "Inter, sans-serif" }}
        >
          Informações do Alvo
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "36%",
              flex: 1,
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Typography variant="subtitle2" fontWeight={600}>
                Apelido
              </Typography>
              <Box display={"flex"} flexDirection={"row"}>
                <TextField
                  variant="outlined"
                  placeholder="Zé pequeno"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.313rem 0 0 0.313rem",
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
                <Button
                  variant="outlined"
                  size="small"
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
                  <EditIcon
                    sx={{
                      fontSize: "1rem",
                      color: "customText.white",
                    }}
                    htmlColor="white"
                  />
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Typography variant="subtitle2" fontWeight={600}>
                Nome
              </Typography>
              <Box display={"flex"} flexDirection={"row"}>
                <TextField
                  variant="outlined"
                  placeholder="Leonardo"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.313rem 0 0 0.313rem",
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
                <Button
                  variant="outlined"
                  size="small"
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
                  <EditIcon
                    sx={{
                      fontSize: "1rem",
                      color: "customText.white",
                    }}
                    htmlColor="white"
                  />
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Typography variant="subtitle2" margin={0} fontWeight={600}>
                CPF
              </Typography>
              <Box display={"flex"} flexDirection={"row"}>
                <TextField
                  placeholder="000.000.000-00"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.313rem 0 0 0.313rem",
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
                <Button
                  variant="outlined"
                  size="small"
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
                  <EditIcon
                    sx={{
                      fontSize: "1rem",
                      color: "customText.white",
                    }}
                    htmlColor="white"
                  />
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              Anotações
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={8}
              sx={{
                width: "100%",
                height: "13.625rem",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "1rem",
                  backgroundColor: "white",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "customButton.gold",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                },
                "& label.Mui-focused": {
                  color: "customButton.gold",
                },
              }}
            />
          </Box>
        </Box>
        <Box
          width={"100%"}
          align="center"
          alignItems={"center"}
          display={"flex"}
          justifyContent={"flex-start"}
        >
          <Box
            width={"10rem"}
            height={"80%"}
            alignItems={"center"}
            display={"flex"}
            sx={{
              border: "1px solid",
              borderRadius: "0.5rem",
              bgcolor: "customButton.white",
              borderColor: "customButton.gray",
            }}
          >
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "customButton.gold",
                },
                "&.MuiCheckbox-indeterminate": {
                  color: "customButton.gold",
                },
              }}
            />
            <Typography
              color="customText.gold"
              fontFamily={"Inter, sans-serif"}
              fontWeight={600}
            >
              Relevante
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection={"column"} gap="1rem">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span">IPs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {" "}
              <GenericTable
                rows={[
                  {
                    ips: "192.168.1.1",
                    date: "2024-01-01",
                    id: 0,
                  },
                ]}
                addButton={false}
                onAdd={() => {}}
                singleSelect={true}
                headCells={IPsHeaderCells}
                title=""
                defaultOrderBy="date"
                onSelectionChange={() => {}}
                initialSelected={[]}
                noDataMessage="Nenhum IP encontrado para este suspeito"
                onDelete={() => {}}
                allowSelection={false}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span">Celulars</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GenericTable
                rows={[
                  {
                    phone: "(54) 99999-9999",
                    insertDate: "2024-01-01",
                    insertBy: "Policial 1",
                    id: 0,
                  },
                ]}
                addButton={true}
                onAdd={() => {}}
                singleSelect={true}
                headCells={PhoneHeaderCells}
                title=""
                defaultOrderBy="insertDate"
                onSelectionChange={() => {}}
                initialSelected={[]}
                noDataMessage="Nenhum celular encontrado para este suspeito"
                onDelete={() => {}}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span">Emails</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GenericTable
                rows={[
                  {
                    email: "test@gmail.com",
                    insertDate: "2024-01-01",
                    insertBy: "Policial 1",
                    id: 0,
                  },
                ]}
                addButton={true}
                onAdd={() => {}}
                singleSelect={true}
                headCells={EmailHeaderCells}
                title=""
                defaultOrderBy="insertDate"
                onSelectionChange={() => {}}
                initialSelected={[]}
                noDataMessage="Nenhum email encontrado para este suspeito"
                onDelete={() => {}}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};
export default SuspectsDetails;
