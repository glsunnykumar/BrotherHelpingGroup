import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  collectionData,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Contribution } from '../../models/contribution';

@Injectable({
  providedIn: 'root',
})
export class ContributionService {
  private firestore: Firestore = inject(Firestore);
  private contributionCollection;
  constructor() {
    this.contributionCollection = collection(this.firestore, 'contributions');
  }

  addContribution(data: Contribution) {
    return addDoc(this.contributionCollection, data);
  }

  updateContribution(id: string, data: Contribution) {
    const ref = doc(this.firestore, `contributions/${id}`);
    return updateDoc(ref, data as any);
  }

  deleteContribution(id: string) {
    const ref = doc(this.firestore, `contributions/${id}`);
    return deleteDoc(ref);
  }

  getContributionById(id: string) {
    const ref = doc(this.firestore, `contributions/${id}`);
    return getDoc(ref);
  }

  getContributions(): Observable<Contribution[]> {
    return collectionData(this.contributionCollection, {
      idField: 'id',
    }) as Observable<Contribution[]>;
  }
}
