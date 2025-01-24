import { Component } from '@angular/core';
import { collection, collectionData ,Firestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ContributionComponent } from "../contribution/contribution.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    ContributionComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  administrators = [
    { name: 'Admin 1', role: 'Group Leader', photo:'https://i.pravatar.cc/150?img=1' },
    { name: 'Admin 2', role: 'Co-Leader', photo: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Admin 3', role: 'Treasurer', photo: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Admin 4', role: 'Secretary', photo: 'https://i.pravatar.cc/150?img=4' },
  ];

   // Top 5 team members
   topMembers = [
    { name: 'Alice Johnson', role: 'Chairman/President', photo: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Bob Smith', role: 'Vice President', photo: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Charlie Brown', role: 'Finance Sectrary', photo: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Diana Prince', role: 'Sectrary', photo: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Ethan Hunt', role: 'Advisor', photo: 'https://i.pravatar.cc/150?img=5' },
  ];

  tasks$: Observable<any[]>;

  constructor(private firestore: Firestore ,
    private router: Router
  ) {
    const tasksCollection = collection(this.firestore, 'tasks');
    this.tasks$ = collectionData(tasksCollection, { idField: 'id' });
  }

    // Navigate to team page
    navigateToTeam() {
      this.router.navigate(['/team']);
    }

}
