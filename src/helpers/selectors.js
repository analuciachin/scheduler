
export function getAppointmentsForDay(state, day) { 
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
    return result;
  }
}

export function getInterviewersForDay(state, day) {
  const result = [];
  let interviewers;
  for (let i = 0; i < state.days.length; i++) {
    if(state.days[i].name === day) {
      interviewers = state.days[i].interviewers
    }
  }

  if (!interviewers) {
    return result;
  } else {
    for (let j = 0; j < interviewers.length; j++) {
      result.push(state.interviewers[interviewers[j]]);
    }
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
    result.interviewer = state.interviewers[interviewerObjKey]
    return result;
  }
}


