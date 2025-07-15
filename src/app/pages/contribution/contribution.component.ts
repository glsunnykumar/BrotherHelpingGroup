import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { WordLimitPipe } from "../../pipe/word-limit.pipe";

@Component({
  selector: 'app-contribution',
  imports: [MatCardModule,
    MatButtonModule,
    CommonModule, WordLimitPipe],
  templateUrl: './contribution.component.html',
  styleUrl: './contribution.component.scss'
})
export class ContributionComponent {

  contributions = [
      {
      title: ' मंडी में पहुंच गई है, Brothers Helping Group',
      description: 'अश्विनी उर्फ सनी पूर्व प्रधान वह पूर्व उपाध्यक्ष ब्लॉक समिति धर्मशाला जो कि अब इस दुनिया में नहीं है लेकिन उनकी सोच आज भी जिंदा है brother Brothers Helping Group में,  उनके द्वारा चलाई गई मुहिम लोगों की सेवा करना आज जिला मंडी में पहुंच गई है, Brothers Helping Group ने आज राहत सामग्री जिला मंडी में गाड़ी के द्वारा भेज दी इसके लिए ब्रदर हेल्पिंग ग्रुप के सभी सदस्यों को कोटि-कोटि नमन',
      image: 'assets/Mandi.jpg',
      date: '2025-07-09',
      location: 'Bassi, Mandi H.P',
      isExpanded: false,
    },
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
