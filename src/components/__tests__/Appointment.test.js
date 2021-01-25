/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";
import Appointment from "components/Appointment";
import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import InterviewerList from "components/InterviewerList";

/*
  A test that renders a React Component
*/
it("renders without crashing", () => {
  render(<Application />);
});
it("renders the Appointment component", () => {
  render(<Appointment />);
 });
it("renders the Confirm component", () => {
 render(<Confirm />);
});
it("renders the Empty component", () => {
  render(<Empty />);
});
it("renders the Error component", () => {
  render(<Error />);
});
it("renders the Form component", () => {
  render(<Form />);
});
it("renders the Header component", () => {
  render(<Header />);
});
it("renders the Show component", () => {
  render(<Show />);
});
it("renders the Status component", () => {
  render(<Status />);
});