import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  updateDoc,
  increment,
} from '@angular/fire/firestore';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'brotherhelpinggroup';
  visitorCount: number = 0;
  constructor(private firestore: Firestore) {}
  async ngOnInit() {
    const docRef = doc(this.firestore, 'analytics/visits');
    await updateDoc(docRef, {
      count: increment(1),
    });

    const docRef1 = doc(this.firestore, 'analytics/visits');
    console.log(docRef1);
    const snapshot = await getDoc(docRef1);
    if (snapshot.exists()) {
            console.log('Adding the Vistior count');
            this.visitorCount = snapshot.data()['count'] || 0;
    }
  }
}
