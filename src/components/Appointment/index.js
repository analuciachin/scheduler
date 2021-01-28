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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // show the Show component if save was successful or the Error component otherwise
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
      transition(SHOW)
      })
      .catch((error) => {
        transition(ERROR_SAVE, true)
      });
  }

  // show the Confirm component when delete button is clicked
  function deleteInterview() {
    transition(CONFIRM);
  }

  // show the add button if there is no error or the Error component otherwise
  function confirmDelete(id) { 
    transition(DELETING, true);
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true)
      })
  }


  return (  
    <article className="appointment" data-testid="appointment">
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
        <Error onClose={back} text="Could not delete appointment" />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} text="Could not save appointment" />
      )}
    </article>
  );
}

