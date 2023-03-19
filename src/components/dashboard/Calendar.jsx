import * as React from "react";
import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FirstComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker style={{ width: "20rem", border: "solid blue 2px" }}
        defaultValue={dayjs(Date.now())}
      />
    </LocalizationProvider>
  );
}

// export default function DateCalendarValue() {
//   const [value, setValue] = React.useState(dayjs(Date.now()));

//   return (

//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["DateCalendar", "DateCalendar"]}>
//         <DemoItem label="Calendar">
//           <DateCalendar
//             style={{ width: "20rem", border: "solid blue 2px" }}
//             defaultValue={dayjs(Date.now())}
//           />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
