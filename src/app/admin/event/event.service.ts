import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface Event {
  id?: string;
  title: string;
  description?: string;
  eventDate: any;
  location: string;
  sponsor?: string;
  videoUrl?: string;
  imageUrl?: string;
  createdAt?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  firestore = inject(Firestore);
  private storage = inject(Storage);


  eventRef = collection(this.firestore, 'events');

  getEvents(): Observable<any[]> {
    return collectionData(this.eventRef, { idField: 'id' });
  }

   /* -----------------------------
     GET EVENT BY ID
  ------------------------------*/
  async getEventById(id: string) {

    const docRef = doc(this.firestore, `events/${id}`);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? docSnap.data() : null;

  }


  /* -----------------------------
     ADD EVENT
  ------------------------------*/
  async addEvent(data: Event) {

    return await addDoc(this.eventRef, {
      ...data,
      createdAt: new Date()
    });

  }


  /* -----------------------------
     UPDATE EVENT
  ------------------------------*/
  async updateEvent(id: string, data: Event) {

    const docRef = doc(this.firestore, `events/${id}`);

    return await updateDoc(docRef, {
      ...data
    });

  }


  /* -----------------------------
     DELETE EVENT
  ------------------------------*/
  async deleteEvent(id: string) {

    const docRef = doc(this.firestore, `events/${id}`);

    return await deleteDoc(docRef);

  }


  /* -----------------------------
     IMAGE UPLOAD (Firebase Storage)
  ------------------------------*/
  async uploadImage(file: File): Promise<string> {

    const filePath = `events/${Date.now()}_${file.name}`;

    const storageRef = ref(this.storage, filePath);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);

  }

}
