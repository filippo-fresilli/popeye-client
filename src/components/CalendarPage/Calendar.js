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
  state = {
    events: this.props.appointments
  };

  
  

  handleSelect = ({ start, end }) => {
    const title = window.prompt('Name your appointement');
    const tattoistId= this.props.currentUser._id;
    const startDate = start;
    const endDate = end;
    if (title){
      const slot = {startDate, endDate, title}
      axios.post(`${process.env.REACT_APP_API_URL}/eventcreated/${tattoistId}`, slot, {withCredentials: true} )
      .then(response => {
        console.log("pls THEN", response)
        this.setState({
          events: [
            ...this.state.events,
            {
              start: startDate,
              end: endDate,
              title,
            },
          ],
        })
      })
      .catch(err => console.log(err))
    }
  };

  onSelectEvent(pEvent) {
    const shouldBeRemoved = window.confirm("Would you like to remove this event?")
    if(shouldBeRemoved){
      
      this.setState((prevState, props) => {
        const events = [...prevState.events]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        return { events };
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
          events={this.props.appointments}
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