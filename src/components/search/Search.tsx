// Import MUI & lodash
import { Search as SearchIcon } from "@mui/icons-material";
import { InputAdornment, TextField, TextFieldProps, styled } from "@mui/material";
import { debounce } from "lodash";
import React from "react";
import { useTranslation } from "../../utils/translation/i18n";
import { useIsMobile } from "../../hooks";
import { useTheme } from "../../theme";

type Props = Omit<TextFieldProps, "onChange"> & {
  delay?: number;
  onChange?: (keyword: string) => void;
};

const Search = ({ value, onChange, delay = 500, placeholder, ...props }: Props) => {
  const textFieldRef = React.useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = React.useState(false);
  const theme = useTheme();

  const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  }, delay);

  const getDynamicStyles = (isMobile: boolean, isFocused: boolean) => ({
    width: isMobile ? "40px" : "100%",
    ...(isMobile &&
      isFocused && {
        position: "absolute",
        right: theme.spacing(2),
        top: 0,
        width: "300px",
        zIndex: 100,
        backgroundColor: "white",
      }),
    "& .MuiInputBase-root": {
      cursor: "pointer",
      paddingLeft: isMobile ? "8px" : "14px",
    },
  });

  const handleIconClick = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus(); // Focus the text field when the icon is clicked
    }
  };

  return (
    <StyledTextField
      size="small"
      sx={getDynamicStyles(isMobile, isFocused)}
      placeholder={placeholder ?? `${t("search")}...`}
      onChange={handleSearch}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      value={value}
      inputRef={textFieldRef}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon onClick={handleIconClick} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    "::placeholder": {
      textTransform: "capitalize",
    },
  },
}));

export { Search };
