import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { Search as SearchIcon } from "@mui/icons-material";

interface SearchBarProps {
  placeholder: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearchChange,
  ...rest
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#e3e3e3",
        borderRadius: 25,
        alignItems: "center",
        display: "flex",
        justifyItems: "center",
        width: "100%",
        padding: "0.25rem",
      }}
    >
      <InputBase
        {...rest}
        onChange={onSearchChange}
        placeholder={placeholder}
        inputProps={{ "aria-label": "search" }}
        sx={{
          width: "100%",
          paddingLeft: "1rem",
        }}
      ></InputBase>
      <SearchIcon
        sx={{
          marginRight: "0.5rem",
        }}
      />
    </Box>
  );
};

export default SearchBar;
