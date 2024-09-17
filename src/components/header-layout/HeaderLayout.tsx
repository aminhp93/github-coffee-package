import React, { createContext, useContext, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { styled } from "../../theme";
import { DEFAULT_HEIGHT } from "../../theme/theme/constants";

export type HeaderLayoutProps = {
  infoList?: {
    value: string;
    label: string;
  }[];
  infoNode?: React.ReactNode;
  actionNode?: React.ReactNode;
  actionListNodes?: React.ReactNode[];
  priorityActionListNodes?: React.ReactNode[];
  detailActionNode?: React.ReactNode;
  quickActionListNodes?: React.ReactNode[];
  customToolbarNode?: React.ReactNode;
};

const HeaderLayout = (props: HeaderLayoutProps) => {
  const { selectedInfo, setSelectedInfo, showDetailAction } = useHeaderLayout();

  const renderInfo = () => {
    if (props.priorityActionListNodes) {
      return props.priorityActionListNodes.map((action, index) => {
        return <Box key={index}>{action}</Box>;
      });
    }

    if (props.infoNode) {
      return props.infoNode;
    }

    if (props.infoList) {
      return (
        <Box>
          <Tabs
            value={selectedInfo}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            onChange={(_, newValue) => setSelectedInfo(newValue)}
            sx={{
              "& .MuiButtonBase-root.MuiTab-root": {
                // Custom styles here
                height: DEFAULT_HEIGHT,
                minHeight: DEFAULT_HEIGHT,
              },
            }}
          >
            {props.infoList.map((info) => {
              return <Tab label={info.label} key={info.value} value={info.value} />;
            })}
          </Tabs>
        </Box>
      );
    }

    return null;
  };

  const renderAction = () => {
    if (props.actionNode) {
      return props.actionNode;
    }

    if (props.actionListNodes) {
      return props.actionListNodes.map((action, index) => {
        return <Box key={index}>{action}</Box>;
      });
    }

    return null;
  };

  const renderQuickAction = () => {
    if (props.quickActionListNodes) {
      return props.quickActionListNodes.map((action, index) => {
        return <Box key={index}>{action}</Box>;
      });
    }

    return null;
  };

  const renderDetailAction = () => {
    if (showDetailAction && (props.detailActionNode || props.customToolbarNode)) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: (theme) => theme.spacing(2),
            mt: (theme) => theme.spacing(2),
          }}
        >
          {props.detailActionNode && (
            <StyledBoxInfo
              sx={{
                alignItems: "center",
              }}
            >
              {props.detailActionNode}
            </StyledBoxInfo>
          )}
          {props.customToolbarNode && <StyledBoxAction>{props.customToolbarNode}</StyledBoxAction>}
        </Box>
      );
    }

    return null;
  };

  return (
    <>
      <StyledBoxRoot>
        <StyledBoxInfo>{renderInfo()}</StyledBoxInfo>
        <StyledBoxAction>
          {renderQuickAction()}
          {renderAction()}
        </StyledBoxAction>
      </StyledBoxRoot>
      {renderDetailAction()}
    </>
  );
};

export { HeaderLayout };

const StyledBoxRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(2),
}));

const StyledBoxInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  minWidth: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  gap: theme.spacing(2),
}));

const StyledBoxAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  minWidth: "max-content", // This ensures the width is based on the content
  overflowX: "auto", //
  gap: theme.spacing(2),
}));

// Define the shape of the context
interface HeaderLayoutContextType {
  selectedInfo: string;
  setSelectedInfo: (info: string) => void;
  showDetailAction: boolean;
  setShowDetailAction: (show: boolean) => void;
}

// Create the context with a default undefined value
const HeaderLayoutContext = createContext<HeaderLayoutContextType | undefined>(undefined);

// Create a provider component
export const HeaderLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedInfo, setSelectedInfo] = useState<string>("");
  const [showDetailAction, setShowDetailAction] = useState<boolean>(false);

  return (
    <HeaderLayoutContext.Provider
      value={{ selectedInfo, setSelectedInfo, showDetailAction, setShowDetailAction }}
    >
      {children}
    </HeaderLayoutContext.Provider>
  );
};

// Custom hook to use the context
export const useHeaderLayout = () => {
  const context = useContext(HeaderLayoutContext);
  if (context === undefined) {
    throw new Error("useHeaderLayout must be used within a HeaderLayoutProvider");
  }
  return context;
};
