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

   getMembers(): Observable<any[]> {
    return collectionData(this.memberCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

    // Delete a service
  deleteMember(id: string) {
    const serviceDoc = doc(this.firestore, `member/${id}`);
    return deleteDoc(serviceDoc);
  }


  

}