import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

import "./CalendarView.css";

// Material UI
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

// Custom Day component with Badge
function CustomDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  // Check if the day is selected (has an event)
  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    // Badge for selected days
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <CheckIcon /> : undefined}
    >
      {/* PickersDay component with Badge */}
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



// Main component for the StaticDatePicker with Events
function CalanderView() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Fetch events from the Redux store on component mount
  React.useEffect(() => {
    dispatch({ type: "FETCH_EVENT" });
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [dispatch]);

  // Get events from the Redux store
  const events = useSelector((store) => store.event);

  // State for the currently selected date and its events
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [selectedEvents, setSelectedEvents] = React.useState([]);
  const [sortedEvents, setSortedEvents] = React.useState([]);

  // Handle date change event
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);

    // Filter events for the selected day, month, and year
    const eventsForDay = events.filter((event) =>
      dayjs(event.date).isSame(dayjs(newValue), "day")
    );

    // Update selected events
    setSelectedEvents(eventsForDay);
  };

  // Sorting date function
  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Compare the dates directly
    return dateA - dateB;
  };


  // Fetch and update events when the component mounts
  React.useEffect(() => {
    if (events.length > 0) {
      handleDateChange(selectedDate);
      setSortedEvents(events.sort(compareDates))
    }
  }, [selectedDate, events]);

  return (
    <div className="calendar-page">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* StaticDatePicker with custom day rendering */}


        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            All Events
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            {sortedEvents.map((event, index) => (
              <div className="events-display" key={index}>
                {event.detail}
                <div>{dayjs(event.date).format('MM/DD/YYYY')} @ {dayjs(event.time).format('h:mm A')}
                </div>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>

        <DialogActions>


        </DialogActions>

        <StaticDatePicker
          orientation="portrait"
          value={selectedDate}
          onChange={handleDateChange}
          onMonthChange={handleDateChange}
          slots={{
            day: CustomDay,
          }}
          slotProps={{
            // Pass highlighted days to CustomDay for badge rendering
            day: {
              highlightedDays: events
                .filter(
                  (event) =>
                    dayjs(event.date).isSame(dayjs(selectedDate), "month") &&
                    dayjs(event.date).isSame(dayjs(selectedDate), "year")
                )
                .map((event) => dayjs(event.date).date()),
            },
          }}
        />

        <Button fullWidth sx={{
          backgroundColor: '#1399a3',
          color: "white",
          textAlign: 'center',
          marginBottom: '10px',
          borderRadius: '15px',

        }} variant="contained" onClick={handleClickOpen}>
          View All Events
        </Button>
        <div className="add-event">
          <TextField fullWidth type="text" id="detail" label="Event Details" variant="outlined" />
          <div>
            <TextField type="time" id="time" sx={{
              paddingTop: "10px",
            }} variant="outlined" />
            <Button sx={{
              height: '55px',
              marginTop: "10px",
              marginLeft: "10px",
              backgroundColor: '#1399a3',
              color: "white",
            }} variant="contained "
              onClick={() =>
                dispatch({
                  type: "POST_EVENT",
                  payload: {
                    date: selectedDate.format("MM/DD/YYYY"),
                    detail: document.getElementById("detail").value,
                    time: document.getElementById("time").value,
                  },
                })
              }
            >
              ADD
            </Button>
          </div>
        </div>

        <p className="events-for-title">Events for {dayjs(selectedDate).format("MM/DD/YYYY")}:</p>
        {/* Display events for the selected date */}
        {selectedEvents.map((event, index) => (
          <div className="events-display" key={index}>
            {event.detail} @ {dayjs(event.time).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('h:mm A')}
          </div>
        ))}
        {selectedEvents.length === 0 && (
          <p className="events-display">No events</p>
        )}
      </LocalizationProvider>
    </div>
  );
}

export default CalanderView;