//import InterviewerList from "components/InterviewerList";

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const result = [];
  let appointments;
  for (let i = 0; i < state.days.length; i++) {
    if(state.days[i].name === day) {
      appointments = state.days[i].appointments
    }
  }

  if (!appointments) {
    return result;
  } else {
    for (let j = 0; j < appointments.length; j++) {
      if (state.appointments.hasOwnProperty(appointments[j])) {
        result.push(state.appointments[appointments[j]])
      }
    }
    //console.log(result);
    return result;
  }
}



export function getInterview(state, interview) {
  let result = null;

  if (!interview) {
    return result;
  } else {
    result = {};
    result.student = interview.student;
    const interviewerObjKey = interview.interviewer;
    console.log('here', interviewerObjKey);
    result.interviewer = state.interviewers[interviewerObjKey]
    return result;
  }
}