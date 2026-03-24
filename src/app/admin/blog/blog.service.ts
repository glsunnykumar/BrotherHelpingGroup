import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface Blog {
  id?: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  createdAt?: any;
}
@Injectable({
  providedIn: 'root'
})
export class BlogService {
   private firestore = inject(Firestore);
  private storage = inject(Storage);

  private blogRef = collection(this.firestore, 'blogs');

  getBlogs(): Observable<Blog[]> {
    return collectionData(this.blogRef, { idField: 'id' }) as Observable<Blog[]>;
  }

  async getBlogById(id: string) {
    const docRef = doc(this.firestore, `blogs/${id}`);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  }

  async addBlog(data: Blog) {
    return await addDoc(this.blogRef, {
      ...data,
      createdAt: new Date()
    });
  }

  async updateBlog(id: string, data: any) {
    const docRef = doc(this.firestore, `blogs/${id}`);
    return await updateDoc(docRef, data);
  }

  async deleteBlog(id: string) {
    const docRef = doc(this.firestore, `blogs/${id}`);
    return await deleteDoc(docRef);
  }

  async uploadImage(file: File): Promise<string> {
    const path = `blogs/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}
