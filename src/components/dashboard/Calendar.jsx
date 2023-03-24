import * as React from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const StyleProvider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(30vh - 3.3rem);
  }
`;
export default function FirstComponent() {
  return (
    <StyleProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker defaultValue={dayjs(Date.now())} />
      </LocalizationProvider>
    </StyleProvider>
  );
}


