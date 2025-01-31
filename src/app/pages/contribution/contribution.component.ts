import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contribution',
  imports: [MatCardModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './contribution.component.html',
  styleUrl: './contribution.component.scss'
})
export class ContributionComponent {

  contributions = [
    {
      title: 'Help of Ill Girl',
      description: 'Our Group Member helped a poor girl who were ill from long time. With a Cheque of 7000RS',
      image: 'assets/Banwala.jpg',
      date: '2025-01-25',
      location: 'Chetru, Kangra H.P',
      isExpanded: false,
    },
    {
      title: 'President Election',
      description: 'At Chetru more than 20 members participated in president Election.And with all member consent Sh Pankaj kumar was elected as the President of Group with immediate effect',
      image: 'assets/PresidentElec.jpg',
      date: '2025-01-20',
      location: 'Chetru, Kangra',
      isExpanded: false,
    },
   
    {
      title: 'Plantation Drive',
      description: 'Approximately 20 Plants was planted near Gangbaro and Bagli Region.',
      image: 'assets/Plantation.jpg',
      date: '2024-08-10',
      location: 'Bagli Kangra',
      isExpanded: false,
    },
    {
      title: 'Help for Marriage of a Girl',
      description: 'Donated 11000 Rs for the Marriage of one of our sister at the Abdullapur Village.',
      image: 'assets/Abdullapur.jpg',
      date: '2024-03-14',
      location: 'Abdullapur Kangra',
      isExpanded: false,
    }
  
  ];
}
