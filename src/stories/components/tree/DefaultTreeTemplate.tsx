import React from "react";
import { Tree } from "../../../components/tree/Tree";
import SampleData from "./sample_data.json";
import { log } from "../../../utils/logger";

const TreeTemplate = () => {
  return (
    <Tree
      tree={SampleData}
      rootId={0}
      onDrop={() => {
        log(123);
      }}
      render={() => {
        return <div>{`123`}</div>;
      }}
    />
  );
};

export default TreeTemplate;
