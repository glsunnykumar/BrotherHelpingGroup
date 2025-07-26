import { Component } from '@angular/core';
import { ToolbarComponent } from "./pages/toolbar/toolbar.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [ ToolbarComponent,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'brotherhelpinggroup';
}
