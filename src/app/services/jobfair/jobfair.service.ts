import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { deleteObject, getStorage, ref } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobfairService {

  private firestore: Firestore = inject(Firestore);
    private aspirantCollection;
  
    constructor() {
      this.aspirantCollection = collection(this.firestore, 'aspirant');
    }
  
    // Create Service
    addAspirant(member: any) {
      return addDoc(this.aspirantCollection, {
        ...member,
        createdAt: new Date(),
        isActive: true,
      });
    }
  
  
      // Update existing member
    async updateAspirant(id: string, memberData: any) {
      const memberDocRef = doc(this.firestore, `aspirant/${id}`);
      return await updateDoc(memberDocRef, memberData);
    }
  
  
   
  
    getAspirants(): Observable<any[]> {
      return collectionData(this.aspirantCollection, {
        idField: 'id',
      }) as Observable<any[]>;
    }
  
    getAspirant(): Observable<any[]> {
      return collectionData(this.aspirantCollection, {
        idField: 'id',
      }) as Observable<any[]>;
    }
  
    getActiveAspirants(): Observable<any[]> {
      const activeQuery = query(
        this.aspirantCollection,
        where('status', '==', 'Active')
      );
      return collectionData(activeQuery, {
        idField: 'id',
      }) as Observable<any[]>;
    }
  
    updateStatus(memberId: string, newStatus: string): Promise<void> {
      const memberDocRef = doc(this.aspirantCollection, memberId);
      return updateDoc(memberDocRef, { status: newStatus });
    }
  
  
    // Delete a service
    deleteAspirant(id: string) {
      const serviceDoc = doc(this.firestore, `aspirant/${id}`);
      return deleteDoc(serviceDoc);
    }

}
