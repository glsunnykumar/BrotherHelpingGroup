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
      title: 'ब्रदर हेल्पिंग ग्रुप के द्वारा एक बेटी के विवाह के लिए मदद की गई',
      description: 'ब्रदर हेल्पिंग ग्रुप के द्वारा एक बेटी के विवाह के लिए मदद की गई। ब्रदर हेल्पिंग ग्रुप के सदस्यों ने 7000 रुपये और विवाह का कुछ सामान गांव इच्ची में एक कन्या के विवाह के लिए दान किया।  इस मौके पर ब्रदर हेल्पिंग ग्रुप के प्रधान शिव पंकज उप प्रधान, शशि, अभिनव, हैप्पी ठाकुर, विपिन डोगरा, डॉ. अतुल गुप्ता, गुलशन, मनी, अनिल, अभर्नी, रोहित, गुलरिया मौजूद रहे।',
      image: 'assets/Ichi.jpg',
      date: '2025-09-11',
      location: 'Chetru Bagli , Kangra H.P',
      isExpanded: false,
    },

     {
      title: 'बनवाला में पौधरोपण के दौरान ब्रदर हेल्पिंग ग्रुप के सदस्य।',
      description: 'ब्रदर हेल्पिंग ग्रुप ने सोमवार को पंचायत बनवाला और चेबड़ में पौधरोपण अभियान की शुरुआत की। इस दौरान नीम, जामुन, आंवला, अर्जुन और अमरूद जैसे छायादार व फलदार पौधे लगाए गए। प्रधान शिव पक्कन, उपप्रधान अभिनव और कोशाध्यक्ष राजीव ने बताया कि अभियान का उद्देश गांवों को हरा-भरा बनाना और ग्रामीणों में पर्यावरण संरक्षण की जागरूकता फैलाना है। अभियान में ग्रुप के सदस्य विपिन सैनी, हैप्पी, आदित्य गुलैरिया, अक्षय, सौरभ, चेतन, विवेक और संजीव गुलैरिया शामिल रहे।',
      image: 'assets/cplantation.jpg',
      date: '2025-07-28',
      location: 'Chetru Bagli , Kangra H.P',
      isExpanded: false,
    },

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
