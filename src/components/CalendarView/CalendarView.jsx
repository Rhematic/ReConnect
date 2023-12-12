import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useState, useEffect } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

import "./CalendarView.css";

// Material UI imports
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Custom Day component with Badge
function CustomDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <CheckIcon /> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
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
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

// Fetch events from the Redux store on component mount
  useEffect(() => {
    dispatch({ type: "FETCH_EVENT" });
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [dispatch]);

  const events = useSelector((store) => store.event);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [editableEvent, setEditableEvent] = useState({ detail: '', date: '', time: '' });

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    const eventsForDay = events.filter((event) => dayjs(event.date).isSame(newValue, "day"));
    setSelectedEvents(eventsForDay);
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MM/DD/YYYY');
  }

  useEffect(() => {
    if (events.length > 0) {
      handleDateChange(selectedDate);
      setSortedEvents([...events].sort((a, b) => new Date(a.date) - new Date(b.date)));
    }
  }, [selectedDate, events]);

  const handleEdit = (event) => {
    setEditEventId(event.id);
    setEditableEvent({ detail: event.detail, date: event.date, time: event.time });
  };

  const handleDelete = (eventId) => {
    dispatch({ type: 'DELETE_EVENT', payload: eventId });
  };

  const saveEdit = () => {
    dispatch({ type: 'EDIT_EVENT', payload: { eventId: editEventId, eventData: editableEvent } });
    setEditEventId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableEvent(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="calendar-page">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
  orientation="portrait"
  value={selectedDate}
  onChange={handleDateChange}
  onMonthChange={handleDateChange}
  slots={{ day: CustomDay }}
  slotProps={{
    day: {
      // Only include days in highlightedDays that have an event
      highlightedDays: events
        .filter(event => 
          dayjs(event.date).isSame(dayjs(selectedDate), "month") &&
          dayjs(event.date).isSame(dayjs(selectedDate), "year"))
        .map(event => dayjs(event.date).date())
    },
  }}
/>

        <Button fullWidth sx={{ backgroundColor: '#1399a3', color: "white", textAlign: 'center', marginBottom: '10px', borderRadius: '15px' }} variant="contained" onClick={handleClickOpen}>
          View All Events
        </Button>

        <div className="add-event">
          <TextField fullWidth type="text" id="detail" label="Event Details" variant="outlined" />
          <div>
            <TextField type="time" id="time" sx={{ paddingTop: "10px" }} variant="outlined" />
            <Button sx={{ height: '55px', marginTop: "10px", marginLeft: "10px", backgroundColor: '#1399a3', color: "white" }} variant="contained" onClick={() => dispatch({ type: "POST_EVENT", payload: { date: selectedDate.format("MM/DD/YYYY"), detail: document.getElementById("detail").value, time: document.getElementById("time").value } })}> ADD </Button>
          </div>
        </div>

        <div>
          {events.map(event => (
            <div key={event.id}>
              {editEventId === event.id ? (
                <div>
                  <input name="detail" value={editableEvent.detail} onChange={handleInputChange} />
                  <input type="date" name="date" value={formatDate(editableEvent.date)} onChange={handleInputChange} />
                  <input type="time" name="time" value={editableEvent.time} onChange={handleInputChange} />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditEventId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span>{event.detail} - {formatDate(event.date)}</span>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* <p className="events-for-title">Events for {formatDate(selectedDate)}:</p>
        {selectedEvents.length === 0 ? <p className="events-display">No events</p> : selectedEvents.map((event, index) => (
          <div className="events-display" key={index}>
            {event.detail} @ {dayjs(event.time).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('h:mm A')}
          </div>
        ))} */}

        <p className="events-for-title">Events for {formatDate(selectedDate)}:</p>
{selectedEvents.length === 0 ? <p className="events-display">No events</p> : selectedEvents.map((event, index) => (
  <div className="event-container" key={index}>
    <span className="event-detail">{event.detail}</span>
    <span className="event-time"> @ {dayjs(event.time).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('h:mm A')}</span>
    <div className="edit-delete-buttons">
      <button className="edit-button" onClick={() => handleEdit(event)}>Edit</button>
      <button className="delete-button" onClick={() => handleDelete(event.id)}>Delete</button>
    </div>
  </div>
))}

        <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            All Events
          </DialogTitle>
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            {sortedEvents.map((event, index) => (
              <div className="events-display" key={index}>
                {event.detail}
                <div>{formatDate(event.date)} @ {dayjs(event.time).format('h:mm A')}</div>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </LocalizationProvider>
    </div>
  );
}

export default CalanderView;



