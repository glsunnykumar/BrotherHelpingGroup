
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  firestore = inject(Firestore);

  eventRef = collection(this.firestore, 'events');

  getEvents(): Observable<any[]> {
    return collectionData(this.eventRef, { idField: 'id' });
  }

  addEvent(data:any){
    return addDoc(this.eventRef,data);
  }

  updateEvent(id:string,data:any){
    const docRef = doc(this.firestore,`events/${id}`);
    return updateDoc(docRef,data);
  }

  deleteEvent(id:string){
    const docRef = doc(this.firestore,`events/${id}`);
    return deleteDoc(docRef);
  }

}
