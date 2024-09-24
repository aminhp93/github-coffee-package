import React from "react";
import { Table, GridColDef } from "../../../components/table";
import { useTranslation } from "../../../utils/translation/i18n";
import { fakeData, MEDIUM_COLUMNS, SMALL_COLUMNS } from "./Table.utils";
import { Theme, useMediaQuery } from "../../../theme";
import { HeaderLayoutProvider } from "../../..";

const DefaultTableTemplate = () => {
  const smSize = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const columns: GridColDef[] = smSize ? SMALL_COLUMNS(t) : MEDIUM_COLUMNS(t);

  return <Table rows={fakeData()} columns={columns} />;
};

const WrapperDefaultTableTemplate = () => {
  return (
    <HeaderLayoutProvider>
      <DefaultTableTemplate />
    </HeaderLayoutProvider>
  );
};

export default WrapperDefaultTableTemplate;
