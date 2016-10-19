import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from './app.rx';

import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  template: `
  <div class='container-fluid'>
    <app-nav-bar></app-nav-bar>
    <router-outlet></router-outlet>
  </div>
  <div class='container'>
    <div class='row'>
      <div class='col s12 center-align'>
        <h1 class="light-blue-text">Elliott &amp; Tracy</h1>
      </div>
    </div>
    <div class="row" id="clockdiv">
      <div [style.backgroundColor]="clock.oppositeColor">
          <span [style.backgroundColor]="clock.color" [style.color]="clock.oppositeColor" class="days">{{clock.days}}</span>
          <div class="smalltext" [style.color]="clock.color">Days</div>
      </div>
      <div [style.backgroundColor]="clock.oppositeColor">
          <span [style.backgroundColor]="clock.color" [style.color]="clock.oppositeColor" class="hours">{{clock.hours}}</span>
          <div class="smalltext" [style.color]="clock.color">Hours</div>
      </div>
      <div [style.backgroundColor]="clock.oppositeColor">
          <span [style.backgroundColor]="clock.color" [style.color]="clock.oppositeColor" class="minutes">{{clock.minutes}}</span>
          <div class="smalltext" [style.color]="clock.color">Minutes</div>
      </div>
      <div [style.backgroundColor]="clock.oppositeColor">
          <span [style.backgroundColor]="clock.color" [style.color]="clock.oppositeColor" class="seconds">{{clock.seconds}}</span>
          <div class="smalltext" [style.color]="clock.color">Seconds</div>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    body{
        text-align: center;
        background: #00ECB9;
        font-family: sans-serif;
        font-weight: 100;
    }

    #clockdiv{
      font-family: sans-serif;
      color: #fff;
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
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  clock = {
    total: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    color: 'black'
  };

  subscription: Subscription;

  ngOnInit() {
    const endDate = 1477152000000;
    const colors = [ 'red', 'orange', 'yellow', 'lime', 'green', 'blue', 'purple' ];
    const oppositeColors = [ 'lime', 'blue', 'purple', 'red', 'black', 'orange', 'yellow' ];

    this.subscription = Observable.timer(0, 1000)
      .map(() => endDate - Date.now())
      .map(ms => ({
        total: ms,
        seconds: Math.floor((ms / 1000) % 60),
        minutes: Math.floor((ms / 1000 / 60) % 60),
        hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
        days: Math.floor(ms / (1000 * 60 * 60 * 24)),
        color: colors[Math.floor(ms / 1000) % colors.length],
        oppositeColor: oppositeColors[Math.floor(ms / 1000) % oppositeColors.length]
      }))
      .subscribe(clock => {
        // // HACK: YOLO!
        // document.body.style.backgroundColor = clock.color;
        this.clock = clock;
      })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
