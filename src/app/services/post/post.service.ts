import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  collectionData,
} from '@angular/fire/firestore';

import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface Post {
  id?: string;
  title: string;
  description: string;
  location: string;
  eventDate: any;
  imageUrl: string;
  createdAt: any;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);

  private postRef = collection(this.firestore, 'posts');

  async addPost(data: Post) {
    return await addDoc(this.postRef, {
      ...data,
      createdAt: new Date(),
    });
  }

  async updatePost(id: string, data: any) {
    const docRef = doc(this.firestore, `posts/${id}`);
    return await updateDoc(docRef, data);
  }

  async deletePost(id: string) {
    const docRef = doc(this.firestore, `posts/${id}`);
    return await deleteDoc(docRef);
  }

  async uploadImage(file: File) {
    const storageRef = ref(this.storage, `posts/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  getPosts(): Observable<any[]> {
  const postRef = collection(this.firestore, 'posts');
  return collectionData(postRef, { idField: 'id' }) as Observable<any[]>;
}

  async getPostById(id: string) {
    const docRef = doc(this.firestore, `posts/${id}`);
    return await getDoc(docRef);
  }
}
