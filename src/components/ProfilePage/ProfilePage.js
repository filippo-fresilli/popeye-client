import React, { Component } from "react";
import "./ProfilePage.css";
import Dnd from "../CalendarPage/Calendar.js";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments : []
    };
    
  }


  componentWillMount() {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/appointments/${this.props.currentuser._id}`, {
          withCredentials: true
        })
        .then(response => {
          this.setState({ appointments : response.data })
        })
        .catch(err => {
          console.log("Tattoist details", err);
          alert("Something wrong with the Tattoist details");
        });

  }

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
    const { fullName } = this.props.currentuser;
    const {appointments} = this.state;
    const appointmentsList = appointments.map( oneAppointment => {
      oneAppointment.start = new Date(oneAppointment.startDate);
      oneAppointment.end = new Date(oneAppointment.endDate);
      return oneAppointment 
    })

    // appointmentsList.forEach(oneApp => {
    //   delete oneApp._id
    //   delete oneApp.startDate
    //   delete oneApp.endDate
    // })

    console.log(appointmentsList)

    return (
      <section className="profile-section">
        <h4> hello Tatooist: {fullName}</h4>;
        <Dnd currentUser={this.props.currentuser} appointments={appointments} handleSelect={() => this.onSelectEvent} />
      </section>
    );
  }
}

export default Profile;
