import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // http requests to load all the to the page in the first render
  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  },[])

  // create a new appointment and update the number of available spots
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    let dayId;
    if (id < 6) {
      dayId = 0;
    } else if (id < 11) {
      dayId = 1;
    } else if (id < 16) {
      dayId = 2;
    } else if (id < 21) {
      dayId = 3;
    } else dayId = 4;

    const availableSpots = state.days[dayId].spots
    const day = {
      ...state.days[dayId],
      spots: availableSpots - 1
   };

    const updatedDays = [...state.days]
    updatedDays[dayId] = day;
    
   

    return new Promise((resolve, reject) => {
      axios.put('http://localhost:8001/api/appointments/' + id, {interview:interview})
      .then(function (response) {
        setState({
          ...state,
          appointments,
          days: updatedDays
        });
        resolve();
      })
      .catch(() => reject());
    });
  }

  // delete an appointment and update the number of available spots
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let dayId;
    if (id < 6) {
      dayId = 0;
    } else if (id < 11) {
      dayId = 1;
    } else if (id < 16) {
      dayId = 2;
    } else if (id < 21) {
      dayId = 3;
    } else dayId = 4;

    const availableSpots = state.days[dayId].spots
    const day = {
      ...state.days[dayId],
      spots: availableSpots + 1
    };

    const updatedDays = [...state.days]
    updatedDays[dayId] = day;

    return new Promise((resolve, reject) => {
      axios.delete('http://localhost:8001/api/appointments/' + id)
      .then(function (response) {
        setState({
          ...state,
          appointments,
          days: updatedDays
        });
        resolve();
      })
      .catch(() => reject());
    });

  }

  return { state, setDay, bookInterview, cancelInterview };
}




