import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  //console.log('Appointment - props', props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      console.log('save .then')  
      transition(SHOW)
    });
  }


  function deleteInterview() {
    console.log('inside deleteInterview')
    transition(CONFIRM);
  }

  function confirmDelete(id) { 
    transition(DELETING);
    props.cancelInterview(id)
      .then(() => {
        console.log('inside confirmDelete .then')
        transition(EMPTY);
      });
  }


  return (  
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && ( 
        <Show
          appointmentId={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save} />
      )}
      {mode === CONFIRM && (
        <Confirm
          appointmentId={props.id}
          onCancel={back} 
          onConfirm={confirmDelete} />
      )}
      {mode === EDIT && (
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save} />
      )}
      {mode === SAVING && (
        <Status message='Saving' />
      )}
      {mode === DELETING && (
        <Status message='Deleting' />
      )}
    </article>
  );
}


/*
    <article className="appointment">
      <Header time={props.time} />
      { props.interview ? <Show student={props.interview.student} interviewer={props.interviewer} /> : <Empty />}
    </article>
*/