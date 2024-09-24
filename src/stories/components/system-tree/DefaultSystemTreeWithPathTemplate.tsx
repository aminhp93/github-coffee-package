// Import libraries
import React from "react";

// Import local files: relative path
import SampleData from "./sample_data.json";
import { SystemTreePath } from "../../../components/system-tree/system-tree-path";

const DefaultSystemTreeTemplate = () => {
  return <SystemTreePath initTreeValue={SampleData} selectedNodeId={"1"} />;
};

export default DefaultSystemTreeTemplate;
