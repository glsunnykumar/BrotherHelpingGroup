import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { collection, collectionData ,Firestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ContributionComponent } from "../contribution/contribution.component";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { register } from 'swiper/element-bundle';
import { MatDialog } from '@angular/material/dialog';
import { MemberComponent } from '../member/member/member.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ContributionComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

  latestNews = [
    {
      title: 'Community Cleanup Drive',
      description: 'A successful cleanup drive organized by our group.',
      date: new Date('2025-01-20'),
    },
    {
      title: 'Health Camp Conducted',
      description: 'Free health checkup camp was held for the community.',
      date: new Date('2025-01-15'),
    },
    {
      title: 'Tree Plantation Drive',
      description: 'Planted 200+ trees in the city park.',
      date: new Date('2025-01-10'),
    },
  ];

  contributors = [
  { name: 'W/o Lt Dina Nath', amount: 21000 },
  { name: 'Sh Atul Gupta', amount: 11000 },
  { name: 'Nikhil Kumar', amount: 6000 },
  { name: 'Neha Gupta', amount: 2000 },
  { name: 'Rajesh Kumar', amount: 1500 }
];
  

  administrators = [
    
    { name: 'Shashi Abinav', role: 'Vice President', photo:'assets/Shashi.jpg' },
    { name: 'Vipan Dogra', role: 'Sectrary', photo: 'assets/Vipan.jpg' },
    { name: 'Rajiv Kumar', role: 'Finance Sectrary', photo: 'assets/Rajiv.jpg' },
    { name: 'Atul Rana', role: 'Media Coordinator', photo: 'assets/Don.jpg' },
  ];

   // Top 5 team members
   topMembers = [
    { name: 'Sarvjeet Guleria', role: 'Member', photo: 'assets/Sarvjeet.jpg' },
    { name: 'Akshay Kumar', role: 'Member', photo: 'assets/Akshay.jpg' },
    { name: 'Megraj', role: 'Member', photo: 'assets/megraj.jpeg' },
    { name: 'Chanchal Katoch', role: 'Member', photo: 'assets/chanchal.png' },
    
  
  ];

  tasks$: Observable<any[]>;

  constructor(private firestore: Firestore ,
    private router: Router,
    public dialog: MatDialog
  ) {
    const tasksCollection = collection(this.firestore, 'tasks');
    this.tasks$ = collectionData(tasksCollection, { idField: 'id' });
  }
  ngOnInit(): void {
    register();
  }

  openMemberDialog(): void {
    this.dialog.open(MemberComponent, {
      width: '400px',
    });
  }

    // Navigate to team page
    navigateToTeam() {
      this.router.navigate(['/team']);
    }

}
