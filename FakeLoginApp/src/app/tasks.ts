import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../app/firebaseConfig';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksCollection = collection(db, 'tasks');

  async getTasks(userId: string): Promise<Task[]> {
    const tasksQuery = query(
      this.tasksCollection,
      where('userId', '==', userId)
    );

    const result = await getDocs(tasksQuery);

    return result.docs.map((item) => ({
      id: item.id,
      ...item.data()
    } as Task));
  }

  addTask(userId: string, title: string, description: string) {
    return addDoc(this.tasksCollection, {
      userId,
      title,
      description,
      done: false,
      createdAt: new Date().toISOString()
    });
  }

  updateTask(taskId: string, data: Partial<Task>) {
    return updateDoc(doc(db, 'tasks', taskId), data);
  }

  deleteTask(taskId: string) {
    return deleteDoc(doc(db, 'tasks', taskId));
  }
}