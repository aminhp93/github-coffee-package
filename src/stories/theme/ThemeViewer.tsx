/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import clsx from "clsx";
import { styled, alpha, lighten } from "@mui/material/styles";
import { Box } from "@mui/material";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { TreeItem as MuiTreeItem, treeItemClasses, TreeView } from "@mui/x-tree-view";
import { v4 as uuidv4 } from "uuid";

const blue = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0f1924",
};

const blueDark = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0f1924",
};

function getType(value: any) {
  if (Array.isArray(value)) {
    return "array";
  }

  if (value === null) {
    return "null";
  }

  if (/^(#|rgb|rgba|hsl|hsla)/.test(value)) {
    return "color";
  }

  return typeof value;
}
/**
 * @param {unknown} value
 * @param {ReturnType<typeof getType>} type
 */
function getLabel(value: any, type: string) {
  switch (type) {
    case "array":
      return `Array(${value.length})`;
    case "null":
      return "null";
    case "undefined":
      return "undefined";
    case "function":
      return `f ${value.name}()`;
    case "object":
      return "Object";
    case "string":
      return `"${value}"`;
    case "symbol":
      return `Symbol(${String(value)})`;
    case "bigint":
    case "boolean":
    case "number":
    default:
      return String(value);
  }
}

function getTokenType(type: string) {
  switch (type) {
    case "color":
      return "string";
    case "object":
    case "array":
      return "comment";
    default:
      return type;
  }
}

const Color = styled("span")(({ theme }) => ({
  backgroundColor: "#fff",
  display: "inline-block",
  marginBottom: -1,
  marginRight: theme.spacing(0.5),
  border: "1px solid",
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M1%202V0h1v1H0v1z%22%20fill-opacity%3D%22.2%22%2F%3E%3C%2Fsvg%3E")',
}));

function ObjectEntryLabel(props: { readonly objectKey: string; readonly objectValue: any }) {
  const { objectKey, objectValue } = props;
  const type = getType(objectValue);
  const label = getLabel(objectValue, type);
  const tokenType = getTokenType(type);

  return (
    <React.Fragment>
      {`${objectKey}: `}
      {type === "color" ? (
        <Color style={{ borderColor: lighten(label, 0.7) }}>
          <Box
            component="span"
            sx={{ display: "block", width: 11, height: 11 }}
            style={{ backgroundColor: label }}
          />
        </Color>
      ) : null}
      <span className={clsx("token", tokenType)}>{label}</span>
    </React.Fragment>
  );
}

const TreeItem = styled(MuiTreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: 4,
    borderRadius: 8,
    "&:hover": {
      backgroundColor: alpha(blueDark[600], 0.2),
    },
    "&:focus": {
      [`& .${treeItemClasses.content}`]: {
        backgroundColor: lighten(blue[900], 0.05),
        outline: `2px dashed ${lighten(blue[900], 0.3)}`,
      },
    },
    [`& .${treeItemClasses.label}`]: {
      fontFamily: "Menlo, Consolas, Droid Sans Mono, monospace",
      fontSize: theme.typography.pxToRem(13),
    },
  },
}));

function ObjectEntry(props: {
  readonly nodeId: string;
  readonly objectKey: string;
  readonly objectValue: any;
}) {
  const { nodeId, objectKey, objectValue } = props;
  const keyPrefix = nodeId;
  let children = null;

  if (
    (objectValue !== null && typeof objectValue === "object") ||
    typeof objectValue === "function"
  ) {
    children =
      Object.keys(objectValue).length === 0
        ? undefined
        : Object.keys(objectValue).map((key) => {
            return (
              <ObjectEntry
                key={key}
                nodeId={`${keyPrefix}.${key}`}
                objectKey={key}
                objectValue={objectValue[key]}
              />
            );
          });
  }

  return (
    <TreeItem
      nodeId={nodeId}
      label={<ObjectEntryLabel objectKey={objectKey} objectValue={objectValue} />}
    >
      {children}
    </TreeItem>
  );
}

function computeNodeIds(object: Record<string, any>, prefix: string) {
  if ((object !== null && typeof object === "object") || typeof object === "function") {
    const ids: Array<string> = [];
    Object.keys(object).forEach((key) => {
      ids.push(`${prefix}${key}`, ...computeNodeIds(object[key], `${prefix}${key}.`));
    });

    return ids;
  }
  return [];
}

export function useNodeIdsLazy(object: Record<string, any>) {
  const [allNodeIds, setAllNodeIds] = React.useState<Array<string>>([]);
  // technically we want to compute them lazily until we need them (expand all)
  // yielding is good enough. technically we want to schedule the computation
  // with low pri  and upgrade the priority later
  React.useEffect(() => {
    setAllNodeIds(computeNodeIds(object, ""));
  }, [object]);

  return allNodeIds;
}

const keyPrefix = "$ROOT";

type ThemeViewrProps = {
  data: Record<string, any>;
  expandPaths: Array<string> | null;
  [key: string]: any;
};

export default function ThemeViewer({
  data,
  expandPaths = [],
  ...other
}: Readonly<ThemeViewrProps>) {
  const defaultExpanded = React.useMemo(
    () =>
      Array.isArray(expandPaths)
        ? expandPaths.map((expandPath) => `${keyPrefix}.${expandPath}`)
        : [],
    [expandPaths]
  );
  // for default*  to take effect we need to remount
  const key = React.useMemo(() => defaultExpanded.join(""), [defaultExpanded]);
  return (
    <TreeView
      key={key}
      defaultCollapseIcon={<ExpandMore />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      defaultExpanded={defaultExpanded}
      defaultExpandIcon={<ChevronRight />}
      {...other}
    >
      {Object.keys(data).map((objectKey) => {
        return (
          <ObjectEntry
            key={uuidv4()}
            nodeId={`${keyPrefix}.${objectKey}`}
            objectKey={objectKey}
            objectValue={data[objectKey]}
          />
        );
      })}
    </TreeView>
  );
}
