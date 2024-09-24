import React from "react";
import { Table, GridColDef } from "../../../components/table";
import { i18n, useTranslation } from "../../../utils/translation/i18n";
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { fakeData } from "./Table.utils";
import { HeaderLayoutProvider } from "../../..";

const TranslationTableTemplate = () => {
  const { t } = useTranslation();
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: t("name"),
      flex: 1,
      editable: true,
    },
    {
      field: "description",
      headerName: t("description"),
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
  ];
  return (
    <>
      <ButtonChangeLanguage />
      <Table rows={fakeData()} columns={columns} />
    </>
  );
};

const WrapperTranslationTableTemplate = () => {
  return (
    <HeaderLayoutProvider>
      <TranslationTableTemplate />
    </HeaderLayoutProvider>
  );
};

export default WrapperTranslationTableTemplate;

const ButtonChangeLanguage = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{t("Language")}</FormLabel>
      <RadioGroup
        row
        onChange={(e) => {
          setLanguage(e.target.value);
          i18n.changeLanguage(e.target.value);
        }}
        aria-labelledby="demo-radio-buttons-group-label"
        value={language}
        name="radio-buttons-group"
      >
        <FormControlLabel value="en" control={<Radio />} label="en" />
        <FormControlLabel value="no" control={<Radio />} label="no" />
        <FormControlLabel value="sv" control={<Radio />} label="sv" />
      </RadioGroup>
    </FormControl>
  );
};
