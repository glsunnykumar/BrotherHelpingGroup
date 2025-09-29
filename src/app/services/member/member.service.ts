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
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private firestore: Firestore = inject(Firestore);
  private memberCollection;
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
      isActive: true,
    });
  }


    // Update existing member
  async updateMember(id: string, memberData: any) {
    const memberDocRef = doc(this.firestore, `member/${id}`);
    return await updateDoc(memberDocRef, memberData);
  }


  // Create Service
  addRequest(request: any) {
    return addDoc(this.requestCollection, {
      ...request,
      createdAt: new Date(),
      isActive: true,
    });
  }

  getMembers(): Observable<any[]> {
    return collectionData(this.memberCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  getRequests(): Observable<any[]> {
    return collectionData(this.requestCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  getActiveMembers(): Observable<any[]> {
    const activeQuery = query(
      this.memberCollection,
      where('status', '==', 'Active')
    );
    return collectionData(activeQuery, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  updateStatus(memberId: string, newStatus: string): Promise<void> {
    const memberDocRef = doc(this.memberCollection, memberId);
    return updateDoc(memberDocRef, { status: newStatus });
  }

  updateRequestStatus(requestId: string, data: { status: string; comment: string }): Promise<void> {
    const requestDocRef = doc(this.requestCollection, requestId);
    return updateDoc(requestDocRef,data);
  }

  // Delete a service
  deleteMember(id: string) {
    const serviceDoc = doc(this.firestore, `member/${id}`);
    return deleteDoc(serviceDoc);
  }

  
  // Delete a service
  deleteRequest(id: string) {
    const serviceDoc = doc(this.firestore, `request/${id}`);
    return deleteDoc(serviceDoc);
  }

  extractStoragePathFromUrl(url: string): string | null {
    try {
      const startIndex = url.indexOf('/o/') + 3;
      const endIndex = url.indexOf('?');
      const encodedPath = url.substring(startIndex, endIndex);
      return decodeURIComponent(encodedPath);
    } catch (err) {
      console.error('Failed to extract image path:', err);
      return null;
    }
  }

  deleteProfileImage(imagePath: string) {
    const storage = getStorage();
    const fileRef = ref(storage, imagePath);

    deleteObject(fileRef)
      .then(() => {
        console.log('Image deleted from Firebase Storage');
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
      });
  }
}
