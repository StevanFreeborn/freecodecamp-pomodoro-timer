import React from 'react';
import './Timer.scss';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      breakTimer: 300,
      sessionLength: 25,
      sessionTimer: 1500,
      interval: '',
      timerType: 'Session',
      timerStatus: 'Stopped'
    }
    this.changeLength = this.changeLength.bind(this);
    this.clock = this.clock.bind(this);
    this.control = this.control.bind(this);
    this.activateTimer = this.activateTimer.bind(this);
    this.countdown = this.countdown.bind(this);
    this.reset = this.reset.bind(this);
  }

  changeLength(e) {
    let id = e.currentTarget.id;
    let currSesh = this.state.sessionLength;
    let currBrk = this.state.breakLength;

    if(id === "session-decrement" && currSesh > 1)
    {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        sessionTimer: this.state.sessionTimer - 60
      })
    }
    if(id === "session-increment" && currSesh < 60)
    {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        sessionTimer: this.state.sessionTimer + 60
      })
    }
    if(id === "break-decrement" && currBrk > 1)
    {
      this.setState({
        breakLength: this.state.breakLength - 1,
        breakTimer: this.state.breakTimer - 60
      })
    }
    if(id === "break-increment" && currBrk < 60)
    {
      this.setState({
        breakLength: this.state.breakLength + 1,
        breakTimer: this.state.breakTimer + 60
      })
    }
  }

  clock() {
    let timer = (this.state.timerType === "Session") ?
    this.state.sessionTimer :
    this.state.breakTimer;

    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  control(){
    if(this.state.timerStatus === "Stopped")
    {
      this.activateTimer();
      this.setState({
        timerStatus: "Running"
      });  
    }
    else
    {
      clearInterval(this.state.interval);

      this.setState({
        timerStatus: "Stopped"
      });
    }
  }

  activateTimer() {
    this.setState({
      interval: setInterval(() => this.countdown(), 1000)
    });
  }

  countdown() {

    if(this.state.timerType === "Session")
    {
      if(this.state.sessionTimer === 0)
      {
        this.beep.play();

        this.setState({
          sessionTimer: this.state.sessionLength * 60,
          timerType: "Break"
        });
        return;
      }

      this.setState({
        sessionTimer: this.state.sessionTimer - 1
      });
    }
    else
    {
      if(this.state.breakTimer === 0)
      {
        this.beep.play();

        this.setState({
          breakTimer: this.state.breakLength * 60,
          timerType: "Session"
        });
        return;
      }

      this.setState({
        breakTimer: this.state.breakTimer - 1
      });
    }
  }

  reset() {
    clearInterval(this.state.interval);

    this.beep.pause();
    this.beep.currentTime = 0;

    this.setState({
      breakLength: 5,
      breakTimer: 300,
      sessionLength: 25,
      sessionTimer: 1500,
      interval: '',
      timerType: 'Session',
      timerStatus: 'Stopped'
    })
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
                onClick={this.changeLength}
              >
                <i className="bi bi-dash"></i>
              </button>
              <button
                id="session-increment"
                onClick={this.changeLength}
              >
                <i className="bi bi-plus"></i>
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
                onClick={this.changeLength}
              >
                <i className="bi bi-dash"></i>
              </button>
              <button
                id="break-increment"
                onClick={this.changeLength}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div
                id="timer-label"
              >
              {this.state.timerType + " - " + this.state.timerStatus}
              </div>
              <div
                id="time-left"
              >
                {this.clock()}
              </div>
              <button
                id="start_stop"
                onClick={this.control}
              >
              {
                (this.state.timerStatus === "Stopped") ?
                <i className="bi bi-play-fill"></i> :
                <i className="bi bi-pause-fill"></i>
              }
              </button>
              <button
                id="reset"
                onClick={this.reset}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
              </button>
              <audio
                id="beep"
                ref={(beep) => {this.beep = beep}}
              >
                <source 
                  src="sounds/beep.mp3"
                  type="audio/mp3"
                />
              </audio>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default Timer;
