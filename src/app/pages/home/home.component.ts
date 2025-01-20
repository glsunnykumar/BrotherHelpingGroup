import { Component } from '@angular/core';
import { collection, collectionData } from '@angular/fire/firestore';
import { Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  imports: [MatCardModule,
    MatGridListModule,
    MatToolbarModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  tasks$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const tasksCollection = collection(this.firestore, 'tasks');
    this.tasks$ = collectionData(tasksCollection, { idField: 'id' });
  }

}
