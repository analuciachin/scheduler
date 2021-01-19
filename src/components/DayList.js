import React from "react";
//import classNames from "classnames";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const daysData = props.days.map(day => <DayListItem key={day.id} 
                            name={day.name} 
                            spots={day.spots} 
                            selected={day.name === props.day}
                            setDay={props.setDay} />);

  return (
    <ul>
      { daysData }
    </ul>
  );
}


/*
DayList needs the following props:

days:Array a list of day objects (each object includes an id, name, and spots)
day:String the currently selected day
setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
*/

/*
DayListItem needs the following props:

name:String the name of the day
spots:Number the number of spots remaining
selected:Boolean true or false declaring that this day is selected
setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
*/