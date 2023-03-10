import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function DateCalendarValue() {
    const [value, setValue] = React.useState(dayjs(Date.now()));

    return (
        <LocalizationProvider Style="width: 30%;" dateAdapter={AdapterDayjs}>
            <DemoContainer Style="width: 30%;" components={['DateCalendar', 'DateCalendar']}>
                <DemoItem Style="width: 30%;" label="Calendar">
                    <DateCalendar Style="width: 30%;" defaultValue={dayjs(Date.now())} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}
