import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [
    `
    body{
        text-align: center;
        background: #00ECB9;
        font-family: sans-serif;
        font-weight: 100;
    }

    h1{
        color: #396;
        font-weight: 100;
        font-size: 40px;
        margin: 40px 0px 20px;
    }

    #clockdiv{
    	font-family: sans-serif;
    	color: #fff;
    	display: inline-block;
    	font-weight: 100;
    	text-align: center;
    	font-size: 30px;
    }

    #clockdiv > div{
    	padding: 10px;
    	border-radius: 3px;
    	background: #00BF96;
    	display: inline-block;
    }

    #clockdiv div > span{
    	padding: 15px;
    	border-radius: 3px;
    	background: #00816A;
    	display: inline-block;
    }

    .smalltext{
    	padding-top: 5px;
    	font-size: 16px;
    }

    `
  ],
  template: `
  <div>
    <h1>Elliott &amp; Tracy</h1>
  </div>
  <div id="clockdiv">
      <div>
          <span class="days"></span>
          <div class="smalltext">Days</div>
      </div>
      <div>
          <span class="hours"></span>
          <div class="smalltext">Hours</div>
      </div>
      <div>
          <span class="minutes"></span>
          <div class="smalltext">Minutes</div>
      </div>
      <div>
          <span class="seconds"></span>
          <div class="smalltext">Seconds</div>
      </div>
  </div>
  `
})
export class AppComponent {
  title = 'app works!';

  getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    const updateClock() {
      const t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }

  const countdown = new Date(1477152000000);
  initializeClock('clockdiv', countdown);

}
