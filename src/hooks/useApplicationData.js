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


  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("api/interviewers")
    ])
    .then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  },[])


  function bookInterview(id, interview) {
    console.log('bookInterview: ', id);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return new Promise((resolve, reject) => {
      //console.log('inside promise');
      axios.put('http://localhost:8001/api/appointments/' + id, {interview:interview})
      .then(function (response) {
        console.log('axios put')
        setState({
          ...state,
          appointments
        });
        resolve();
      })
      .catch(() => reject());
    });
  }

  function cancelInterview(id) {
    console.log('cancelInterview: ', id)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise((resolve, reject) => {
      console.log('cancelInterview id', id);
      axios.delete('http://localhost:8001/api/appointments/' + id)
      .then(function (response) {
        console.log('axios delete')
        setState({
          ...state,
          appointments
        });
        resolve();
      })
      .catch(() => reject());
    });

  }

  return { state, setDay, bookInterview, cancelInterview };
}