import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
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
    props.bookInterview(props.id, interview)
      .then(() => {
      console.log('save .then')  
      transition(SHOW)
      })
      .catch((error) => {
        console.log('save .catch');
        transition(ERROR_SAVE, true)
      });
  }


  function deleteInterview() {
    console.log('inside deleteInterview')
    transition(CONFIRM);
  }

  function confirmDelete(id) { 
    console.log('inside confirmDelete')
    transition(DELETING, true);
    props.cancelInterview(id)
      .then(() => {
        console.log('confirmDelete .then')
        transition(EMPTY);
      })
      .catch(error => {
        console.log('confirmDelete .catch', error);
        transition(ERROR_DELETE, true)
      })
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
      {mode === ERROR_DELETE && (
        <Error onClose={back} />
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