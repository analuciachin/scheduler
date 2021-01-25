import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";


export default function InterviewerList(props) {
  const interviewers = props.interviewers;

  let interviewersData;
  if (Array.isArray(interviewers)) {
    interviewersData = interviewers.map(interviewer => 
      <InterviewerListItem key={interviewer.id} 
        name={interviewer.name} 
        avatar={interviewer.avatar} 
        selected={interviewer.id === props.interviewer}
        setInterviewer={events => props.setInterviewer(interviewer.id)}/>
      );
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      { interviewersData }
      </ul>
    </section>
  );
}


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

/*
InterviewerList needs the following props

interviewers:array - an array of objects containing the information of each interviewer
interviewer:number - the id of an interviewer
setInterviewer:function - a function that accepts an interviewer id
*/


/*
InterviewerListItem component has the following props:

id:number - the id of the interviewer
name:string - the name of the interviewer
avatar:url - a url to an image of the interviewer
selected:boolean - to determine if an interview is selected or not
setInterviewer:function - sets the interviewer upon selection
*/