import React from "react";
import { Table, GridColDef } from "@/components/table";
import { useTranslation } from "@/utils/translation";
import { fakeData, MEDIUM_COLUMNS, SMALL_COLUMNS } from "./Table.utils";
import { Theme, useMediaQuery } from "@/theme";
import { HeaderLayoutProvider } from "@/components/header-layout";

const CheckboxSelectionTableTemplate = () => {
  const smSize = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const columns: GridColDef[] = smSize ? SMALL_COLUMNS(t) : MEDIUM_COLUMNS(t);

  return <Table checkboxSelection rows={fakeData()} columns={columns} />;
};

const WrapperCheckboxSelectionTableTemplate = () => {
  return (
    <HeaderLayoutProvider>
      <CheckboxSelectionTableTemplate />
    </HeaderLayoutProvider>
  );
};

export default WrapperCheckboxSelectionTableTemplate;
