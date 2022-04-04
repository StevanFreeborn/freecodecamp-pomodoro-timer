import React from 'react';
import './Timer.scss';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerStatus: 'Stopped'
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          
          <div className="row">
            <div className="col-12">
              <h1>
                <i className="bi bi-stopwatch-fill"></i> Pomodoro Timer
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div
                id="session-label"
              >
                Session
              </div>
              <div
                id="session-length"
              >
                {this.state.sessionLength}
              </div>
              <button
                id="session-decrement"
              >
                <i class="bi bi-dash"></i>
              </button>
              <button
                id="session-increment"
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <div className="col-6">
              <div
                id="break-label"
              >
                Break
              </div>
              <div
                id="break-length"
              >
                {this.state.breakLength}
              </div>
              <button
                id="break-decrement"
              >
                <i class="bi bi-dash"></i>
              </button>
              <button
                id="break-increment"
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div
                id="timer-label"
              >
                {this.state.timerStatus}
              </div>
              <div
                id="time-left"
              >
                25:00
              </div>
              <button
                id="start_stop"
              >
                <i class="bi bi-play-fill"></i>
              </button>
              <button
                id="reset"
              >
                <i class="bi bi-arrow-counterclockwise"></i>
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default Timer;
