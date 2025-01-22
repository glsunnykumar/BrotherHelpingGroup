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
      title: 'Tree Plantation Drive',
      description: 'We planted 500+ trees in our local park to combat deforestation and promote greenery.',
      image: 'assets/tree-plantation.webp',
      date: '2025-03-10',
      location: 'City Park, Springfield',
      isExpanded: false,
    },
    {
      title: 'Health Checkup Camp',
      description: 'Organized a free health camp for 200+ underprivileged individuals in our community.',
      image: 'assets/health-camp.webp',
      date: '2025-03-10',
      location: 'City Park, Springfield',
      isExpanded: false,
    },
   
    {
      title: 'Food Distribution',
      description: 'Distributed food packets to over 1000 people affected by floods in nearby villages.',
      image: 'assets/food-distribution.webp',
      date: '2025-03-10',
      location: 'City Park, Springfield',
      isExpanded: false,
    },
    {
      title: 'Food Distribution',
      description: 'Distributed food packets to over 1000 people affected by floods in nearby villages.',
      image: 'assets/food-distribution.webp',
      date: '2025-03-10',
      location: 'City Park, Springfield',
      isExpanded: false,
    }
    ,
    {
      title: 'Health Checkup Camp',
      description: 'Organized a free health camp for 200+ underprivileged individuals in our community.',
      image: 'assets/health-camp.webp',
      date: '2025-03-10',
      location: 'City Park, Springfield',
      isExpanded: false,
    },
  ];
}
