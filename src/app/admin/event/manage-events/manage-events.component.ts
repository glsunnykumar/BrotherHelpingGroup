import { Component, inject } from '@angular/core';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-events',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './manage-events.component.html',
  styleUrl: './manage-events.component.scss',
})
export class ManageEventsComponent {
  eventService = inject(EventService);

  events: any[] = [];

  ngOnInit() {
    this.eventService.getEvents().subscribe((res) => {
      this.events = res;
    });
  }

  delete(id: string) {
    if (confirm('Delete this event?')) {
      this.eventService.deleteEvent(id);
    }
  }
}
