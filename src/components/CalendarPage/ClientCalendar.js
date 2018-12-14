import React from 'react'
import dates from 'date-arithmetic'
//import events from './events'
import BigCalendar from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import moment from "moment"
import axios from "axios"




class MyWeek extends React.Component {
  render() {
    let { date } = this.props
    let range = MyWeek.range(date)

    return <TimeGrid {...this.props} range={range} eventOffset={15} 
    />
  }
}



MyWeek.range = date => {
  let start = date
  let end = dates.add(start, 2, 'day')

  let current = start
  let range = []

  while (dates.lte(current, end, 'day')) {
    range.push(current)
    current = dates.add(current, 1, 'day')
  }

  return range
}

MyWeek.navigate = (date, action) => {

  switch (action) {
    case BigCalendar.Navigate.PREVIOUS:
      return dates.add(date, -3, 'day')

    case BigCalendar.Navigate.NEXT:
      return dates.add(date, 3, 'day')

    default:
      return date
  }
}

MyWeek.title = date => {
  return `Week: ${date.toLocaleDateString()}`
}




class CustomView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "days")),
          title: "Event example"
        }
      ]
     }
  }


  componentDidMount(){
    const tattoistId = this.props.tattoist._id;
    axios.get(`${process.env.REACT_APP_API_URL}/api/appointments/${tattoistId}`, { withCredentials: true })
    .then(response => {
      console.log("HEZHEZ",response.data)
      const appointmentsList = response.data.appointmentsArray.map( oneAppointment => {
        oneAppointment.start = new Date(oneAppointment.startDate);
        oneAppointment.end = new Date(oneAppointment.endDate);
        return oneAppointment 
      })

      console.log("my appointment list",appointmentsList)
      this.setState({events: appointmentsList})
    })
    .catch(err => console.log(err))
  }

  
  handleSelect = ({ start, end }) => {
    const title = window.prompt('Name your appointement');
    const tattoistId = this.props.tattoist._id;
    const startDate = start;
    const endDate = end;
    if (title){
      const slot = {startDate, endDate, title}
      axios.post(`${process.env.REACT_APP_API_URL}/api/eventcreated/${tattoistId}`, slot, {withCredentials: true} )
      .then(response => {
        console.log("response client",response)
        
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
    console.log("This props.eventsdb", this.props.eventsDb)
    const mustBeRemoved = window.confirm("Would you like to remove this event?")
    if(mustBeRemoved){
      this.setState((prevState, props) => {
        const events = [...prevState.events]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        return { events };
      });
    }
  }



  render() {
    //console.log("STATE CLIENT CALENDAR",this.state)



    const localizer = BigCalendar.momentLocalizer(moment);// or globalizeLocalizer
    return ( 
      <BigCalendar
      min={new Date(2017, 10, 0, 8, 0, 0)}
      max={new Date(2017, 10, 0, 23, 0, 0)} 
      selectable
      localizer={localizer}
      defaultDate={new Date()}
      defaultView={BigCalendar.Views.WEEK}
      views={{week: MyWeek }}
      events={this.state.events}
      style={{ height: "350px", width: "500px" }}
      onSelectEvent = {event => this.onSelectEvent(event)}
      onSelectSlot={this.handleSelect}
      resizable
      selectRangeFormat= {({start, end}, culture, localizer) =>
      localizer.format(start, { date: 'short' }, culture) + ' — ' +
      localizer.format(end, { date: 'short' }, culture)
  }
    />
     );
  }
}
 
export default CustomView;





