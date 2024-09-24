import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import {
  FAKE_DATA,
  getDefaultOption,
} from "../../../components/plot/Plot.constants";
import {
  getOptionsFromData,
  getValidatedOptions,
} from "../../../components/plot/Plot.utils";
import { useDialogsStore } from "../../../stores";
import { Plot } from "../../../components";

const defaultValue = {
  x: 0,
  y: 0,
  width: 1000,
  height: 850,
};

const DialogContainerUpdateTemplate = () => {
  const addDialog = useDialogsStore((state) => state.addDialog);
  const [options, setOptions] = React.useState(getDefaultOption());
  const [count, setCount] = React.useState(1);

  const idRef = "chart-dialog";

  useEffect(() => {
    const array = [];
    for (let i = 0; i < count; i++) {
      if (i >= FAKE_DATA.length) break;
      array.push(FAKE_DATA[i]);
    }
    const dataTag = getOptionsFromData(array);

    setOptions((prev) => {
      const newOptions = {
        ...dataTag,
        navigator: {
          enabled: true,
        },
      };

      return getValidatedOptions(newOptions, prev);
    });
  }, [count]);

  const handleAddDialog = () => {
    setCount(1);

    addDialog({
      idRef,
      component: Plot,
      propsComponent: { options, showTable: true },
      default: defaultValue,
    });
  };

  const handleUpdatedDialog = () => {
    setCount((pre) => pre + 1);

    addDialog({
      idRef,
      component: Plot,
      propsComponent: { options, showTable: true },
      default: defaultValue,
    });
  };

  return (
    <Box sx={{ width: "300px" }}>
      <Button onClick={handleAddDialog}>{`Create Dialog`}</Button>
      <Button onClick={handleUpdatedDialog}>{`Add tag`}</Button>
    </Box>
  );
};

export default DialogContainerUpdateTemplate;
