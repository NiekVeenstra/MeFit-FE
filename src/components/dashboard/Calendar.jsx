import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FirstComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker style={{ width: "20rem", border: "solid blue 2px", borderRadius: "10px" ,  }} 
        defaultValue={dayjs(Date.now())}
      />
    </LocalizationProvider>
  );
}


