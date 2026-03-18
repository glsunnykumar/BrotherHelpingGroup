import { Component, inject } from '@angular/core';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-events',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './manage-events.component.html',
  styleUrl: './manage-events.component.scss',
})
export class ManageEventsComponent {
  eventService = inject(EventService);

  events: any[] = [];
  private router = inject(Router);

  ngOnInit() {
    this.eventService.getEvents().subscribe((res) => {
      this.events = res;
      console.log(this.events);
    });
  }

  edit(id: string) {
  this.router.navigate(['/admin/edit-event', id]);
}


getStatus(date:any){

const today = new Date();
const eventDate = new Date(date);

if(eventDate.toDateString() === today.toDateString()){
  return 'today';
}

if(eventDate > today){
  return 'upcoming';
}

return 'completed';

}

openVideo(url:string){
  window.open(url,'_blank');
}

  delete(id: string) {
    if (confirm('Delete this event?')) {
      this.eventService.deleteEvent(id);
    }
  }
}
