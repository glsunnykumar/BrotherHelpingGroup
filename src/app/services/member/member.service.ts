import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

   private firestore: Firestore = inject(Firestore);
   private memberCollection ;

  constructor() {
    this.memberCollection = collection(this.firestore, 'member');
  }

  // Create Service
   addMember(member: any) {
    return addDoc(this.memberCollection, {
      ...member,
      createdAt: new Date(),
      isActive: true
    });
  }


  

}