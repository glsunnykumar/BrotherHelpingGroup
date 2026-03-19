import { Component, inject } from '@angular/core';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GlobalLoaderComponent } from "../../../shared/global-loader/global-loader.component";
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoDialogComponent } from '../../shared/video-dialog/video-dialog.component';

@Component({
  selector: 'app-manage-events',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    GlobalLoaderComponent
],
  templateUrl: './manage-events.component.html',
  styleUrl: './manage-events.component.scss',
})
export class ManageEventsComponent {
  eventService = inject(EventService);
  private dialog = inject(MatDialog);
private sanitizer = inject(DomSanitizer);

  events: any[] = [];
  private router = inject(Router);
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe((res) => {
      this.events = res;
      console.log(this.events);
      this.isLoading = false;
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
   let safeUrl = url;

  // Convert YouTube URL to embed
  if(url.includes('youtube')){
    const videoId = url.split('v=')[1];
    console.log(videoId);
    safeUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  this.dialog.open(VideoDialogComponent, {
    data: {
      url: url,
      safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl)
    },
    width: '800px'
  });

}

  delete(id: string) {
    if (confirm('Delete this event?')) {
      this.eventService.deleteEvent(id);
    }
  }
}
