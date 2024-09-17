// from 01/01/2023 to 31/12/2023, interval 1 day,
const LIST_DATE_DAY = () => {
  const listDate = [];
  for (let i = 1; i <= 365; i++) {
    const date = new Date(2023, 0, i);
    listDate.push(date.getTime());
  }
  return listDate;
};

// from 01/01/2023 to 31/12/2023, interval 1 month
const LIST_DATE_MONTH = () => {
  const listDate = [];
  for (let i = 1; i <= 12; i++) {
    const date = new Date(2023, i, 1);
    listDate.push(date.getTime());
  }
  return listDate;
};

const getNumberFromPostion = (ts: number, pos1: number, pos2?: number) => {
  const num1 = String(ts)[pos1];
  if (!pos2) {
    return Number(num1);
  }
  const num2 = String(ts)[pos2];
  return Number(num1 + num2);
};

const getNumberFromEnum = (ts: number, pos: number, max: number) => {
  const num = String(ts)[pos];
  // if num > max, re-count from start
  if (Number(num) > max) {
    return Number(num) - max;
  }
  return Number(num);
};

export const ServerCpuUsage = {
  name: "ServerCpuUsage",
  dataType: "number",
  dataUnit: "%",
  data: {
    // second item in array is postion 5, 7 of first item in array
    "1d": LIST_DATE_DAY().map((ts) => [ts, getNumberFromPostion(ts, 5, 7)]),
    "1m": LIST_DATE_MONTH().map((ts) => [ts, getNumberFromPostion(ts, 5, 7)]),
  },
};

export const ServerMemoryUsage = {
  name: "ServerMemoryUsage",
  dataType: "number",
  dataUnit: "%",
  data: {
    // second item in array is postion 5, 7 of first item in array
    "1d": LIST_DATE_DAY().map((ts) => [ts, getNumberFromPostion(ts, 7, 5)]),
    "1m": LIST_DATE_MONTH().map((ts) => [ts, getNumberFromPostion(ts, 7, 5)]),
  },
};

export const totalAlarmCount = {
  name: "totalAlarmCount",
  dataType: "number",
  dataUnit: "",
  data: {
    // second item in array is postion 5, 7 of first item in array
    "1d": LIST_DATE_DAY().map((ts) => [ts, getNumberFromPostion(ts, 4, 5)]),
    "1m": LIST_DATE_MONTH().map((ts) => [ts, getNumberFromPostion(ts, 4, 5)]),
  },
};

export const AlarmManager_SYS_mqttEvents = {
  name: "AlarmManager_SYS_mqttEvents",
  dataType: "enum",
  dataUnit: "",
  data: {
    // second item in array is postion 5, 7 of first item in array
    "1d": LIST_DATE_DAY().map((ts) => [ts, getNumberFromEnum(ts, 5, 5)]),
    "1m": LIST_DATE_MONTH().map((ts) => [ts, getNumberFromEnum(ts, 5, 5)]),
  },
  customUnit: {
    0: "Connected (session NOT present)",
    1: "Connected (session present)",
    2: "Connecting...",
    3: "An error occured",
    4: "Unexpected disconnect",
  },
};
