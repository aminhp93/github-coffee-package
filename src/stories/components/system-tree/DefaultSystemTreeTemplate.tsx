// Import libraries
import React from "react";
import { TreeMethods } from "@minoru/react-dnd-treeview";

// Import local files: relative path
import { SystemTree } from "@/components/system-tree";
// import SampleData from "./sample_data.json";
import SampleData from "./data2.json";

const DefaultSystemTreeWithPathTemplate = () => {
  const ref = React.useRef<TreeMethods | null>(null);

  return <SystemTree tree={SampleData} ref={ref} />;
};

export default DefaultSystemTreeWithPathTemplate;
