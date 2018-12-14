import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import Toolbar from 'react-big-calendar';
import axios from 'axios'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = Calendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);


class CalendarPage extends Component {
  constructor(props) {
    super(props);
  this.state = {
    events: this.props.appointments,
    newEvents: []
  };
  }
  
  

  handleSelect = ({ start, end }) => {
    const title = window.prompt('Name your appointement');
    const tattoistId= this.props.currentUser._id;
    const startDate = start;
    const endDate = end;
    if (title){
      const slot = {startDate, endDate, title}
      axios.post(`${process.env.REACT_APP_API_URL}/api/eventcreated/${tattoistId}`, slot, {withCredentials: true} )
      .then(response => {
        console.log("pls THEN", response)
      this.state.events.push()
        this.setState({
          newEvents: [
            ...this.state.newEvents,
            {
              start: startDate,
              end: endDate,
              title,
            },
          ],
        }, ()=> console.log("staaaate", this.state))
      })
      .catch(err => console.log(err))
    }
  };

  onSelectEvent(pEvent) {
    const shouldBeRemoved = window.confirm("Would you like to remove this event?")
    if(shouldBeRemoved){

      this.setState((prevState, props) => {
        let concatArrays = this.props.appointments.concat(this.state.newEvents);
        console.log(concatArrays)
        const idx = concatArrays.indexOf(pEvent);
        console.log(idx)

        concatArrays.splice(idx, 1);
        console.log(concatArrays)

        return { newEvents: concatArrays };
      });
    }
  }

  

  

  render() {

    return (
      <div className="App">
        <Calendar
          min={new Date(2017, 10, 0, 8, 0, 0)}
          max={new Date(2017, 10, 0, 23, 0, 0)} 
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
           views= {['month', 'day', 'week']}
          events={this.props.appointments.concat(this.state.newEvents)}
          style={{ height: "100vh" }}
          onSelectEvent = {event => this.onSelectEvent(event)}
          onSelectSlot={this.handleSelect}
          
         onEventDrop={event => event.moveEvent}
         resizable
         onEventResize={this.resizeEvent}


    
        />
      </div>
    );
  }
}


export default CalendarPage;