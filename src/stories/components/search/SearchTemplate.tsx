// import Search from "@/@core/components/search";
import { useSearch } from "@/hooks/useSearch";
import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { Search } from "@/components/search";

const mockData = [
  {
    id: 0,
    status: "communication",
    name: "Manual API",
    type: "ModbusTCP",
  },
  {
    id: 1,
    status: "offline",
    name: "Manual API",
    type: "OPCUA",
  },
  {
    id: 2,
    status: "offline",
    name: "OPC_269",
    type: "OPCUA",
  },
  {
    id: 3,
    status: "online",
    name: "OPC_449",
    type: "BACnet",
  },
  {
    id: 4,
    status: "online",
    name: "Manual API",
    type: "OPCUA",
  },
  {
    id: 5,
    status: "online",
    name: "ModbusRTU",
    type: "ModbusRTU",
  },
  {
    id: 6,
    status: "online",
    name: "BACnet_Stage_980",
    type: "BACnet",
  },
  {
    id: 7,
    status: "offline",
    name: "OPC_147",
    type: "ModbusRTU",
  },
  {
    id: 8,
    status: "offline",
    name: "ModbusRTU",
    type: "ModbusRTU",
  },
  {
    id: 9,
    status: "offline",
    name: "BACnet_Stage_641",
    type: "ModbusRTU",
  },
];

const SearchTemplate = () => {
  return (
    <Box display={"flex"} justifyContent={"space-evenly"}>
      <SearchAll />
      <SearchByFields />
    </Box>
  );
};

const SearchAll = () => {
  const { data: searchedData, onChangeKeyword } = useSearch(mockData);

  return (
    <Box>
      <Search onChange={onChangeKeyword} />
      <List>
        {searchedData.map((i) => (
          <ListItem key={i.id} sx={{ background: "#ccc", marginTop: "10px" }}>
            {JSON.stringify(i)}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const SearchByFields = () => {
  const { data: searchedData, onChangeKeyword } = useSearch(mockData, {
    fields: ["id", "status"],
  });

  return (
    <Box>
      <Typography
        fontWeight={"bold"}
      >{`useSearch(data, {fields: ["id", "status"]})`}</Typography>
      <Search onChange={onChangeKeyword} />
      <List>
        {searchedData.map((i) => (
          <ListItem key={i.id} sx={{ background: "#ccc", marginTop: "10px" }}>
            {JSON.stringify(i)}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchTemplate;
