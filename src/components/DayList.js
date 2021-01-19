import React from "react";
//import classNames from "classnames";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  const daysMap = days.map(day => <DayListItem key={day.id} 
                            name={day.name} 
                            spots={day.spots} 
                            selected={day.name === props.day}
                            setDay={props.setDay} />);

  return (
    <ul>
      { daysMap }
    </ul>
  );
}


/*
DayList needs the following props:

days:Array a list of day objects (each object includes an id, name, and spots)
day:String the currently selected day
setDay:Function accepts the name of the day eg. "Monday", "Tuesday"


*/