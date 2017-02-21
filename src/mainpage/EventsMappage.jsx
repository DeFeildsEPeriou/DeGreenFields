import React, { Component } from 'react';
import EventDetail from './components/EventDetail.jsx';
import EventList from './components/eventList.jsx';
import Map from './components/Map.jsx';
import Nav from './../Nav.jsx';
import Link from 'react-router';

class MapPage extends Component {
  constructor() {
    super();
    this.state = {
      eventList: ['event1', 'event2', 'event3', 'event4', 'event5'],
      map: null,
      detailsBox: null,
      loggedIn: true,
    };
  }
  /**
   * Returns the sum of a and b
   * @param {event} the event object a user clicks on
   * @return Sets the state detailbox to the clicked event
   */
  setDetailsBox(event) {
    console.log(event,'event');
    this.setState({ detailsBox: event });
  }

  /**
 * Returns the sum of a and b
 * @param {events} a list of event objects from query
 * @returns Sets the state eventlist to the array of events
 */
  setEventList(events) {
    this.setState({ eventList: events });
  }
// need to add on mount that calls event list.
// need will change that updates
  render() {
    return (

      <main className="container">
          {this.state.loggedIn ? (
          <div>
            <Nav />
             <section id="map" className="col-lg-4">
               <section >
                 //map will hold google maps
                   <Map />
                 <article id="EventDetail">
                   //plan for object of event to be passed through
                   <EventDetail event={this.state.detailsBox} />
                 </article>
               </section>
             </section>
             <sidebar className="col-lg-4">
               //want the eventlist items to update the Detailsbox on click
               <EventList eventlist={this.state.eventList} setDetailsBox={this.setDetailsBox.bind(this)}  />
             </sidebar>
        </div> ) : (
          <h1>
            <Link to='/'>You need to Login</Link>
          </h1>
        )}
          //nav bar will have the search and filter methods.
      </main>
    );
  }
}

export default MapPage;

//navbar

/* <nav className="navbar navbar-inverse navbar-fixed-top">
  <div>
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed"
        data-toggle="collapse" data-target="#navbar" aria-expanded="false"
        aria-controls="navbar">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">Whats Happenin</a>
    </div>
    <span id="navbar" className="collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <li className="col-sm-1"><a href="#profile">My Profile</a></li>
        <li><a href="#createevent">CreateEvent</a></li>
        <div className="input-group-btn search-panel">
         <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
           <span id="search_concept">Filter by</span>
         </button>
         <ul className="dropdown-menu" role="menu">
           <li><a href="#all">Anything</a></li>
           <li><a href="#all">Anything</a></li>
         </ul>
         </div>
         <input className="col-md-3" type="hidden" name="search_param"
              value="all" id="search_param"></input>
         <input type="text" className="form-control" name="x" placeholder="Search term..."></input>
         <span className="input-group-btn">
             <button className="btn btn-default" type="button"><span
               className="glyphicon glyphicon-search"></span></button>
         </span>
      </ul>
    </span>
  </div>
</nav> */
