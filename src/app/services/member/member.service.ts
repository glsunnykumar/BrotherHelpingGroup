import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

   private firestore: Firestore = inject(Firestore);
   private memberCollection ;
   private requestCollection;

  constructor() {
    this.memberCollection = collection(this.firestore, 'member');
    this.requestCollection = collection(this.firestore, 'request');
  }

  // Create Service
   addMember(member: any) {
    return addDoc(this.memberCollection, {
      ...member,
      createdAt: new Date(),
      isActive: true
    });
  }

   // Create Service
   addRequest(request: any) {
    return addDoc(this.memberCollection, {
      ...request,
      createdAt: new Date(),
      isActive: true
    });
  }

   getMembers(): Observable<any[]> {
    return collectionData(this.memberCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

getActiveMembers(): Observable<any[]> {
  const activeQuery = query(this.memberCollection, where('status', '==', 'Active'));
  return collectionData(activeQuery, {
    idField: 'id',
  }) as Observable<any[]>;
}

  updateStatus(memberId: string, newStatus: string): Promise<void> {
    const memberDocRef = doc(this.memberCollection, memberId);
    return updateDoc(memberDocRef, { status: newStatus });
  }

    // Delete a service
  deleteMember(id: string) {
    const serviceDoc = doc(this.firestore, `member/${id}`);
    return deleteDoc(serviceDoc);
  }


  

}