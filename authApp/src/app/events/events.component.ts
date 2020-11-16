import { Component, OnInit } from '@angular/core';
import { EventsService } from './../events.service'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = []

  constructor(
    private _events : EventsService,
  ) { }

  ngOnInit(): void {
    this._events.getEvents()
      .subscribe(
        events => this.events = events,
        err => console.log(err)
      )
  }
}
