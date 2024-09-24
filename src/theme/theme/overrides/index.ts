// ** MUI Imports
import { Theme } from "@mui/material/styles";

// ** Overrides Imports

import MuiButton from "./button";
import MuiTooltip from "./tooltip";
import MuiInput from "./input";
import MuiChip from "./chip";
import MuiTypography from "./typography";
import MuiForm from "./form";
import MuiDataGrid from "./dataGrid";
import MuiTabs from "./tabs";
import MuiTextField from "./textField";

const Overrides = (theme: Theme) => {
  const button = MuiButton(theme);
  const tooltip = MuiTooltip(theme);
  const input = MuiInput(theme);
  const chip = MuiChip();
  const typography = MuiTypography();
  const form = MuiForm();
  const dataGrid = MuiDataGrid();
  const tabs = MuiTabs();
  const textField = MuiTextField(theme);

  return Object.assign(
    button,
    tooltip,
    input,
    chip,
    typography,
    form,
    dataGrid,
    tabs,
    textField
  );
};

export default Overrides;
