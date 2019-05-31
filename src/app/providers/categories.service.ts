import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesCollection: AngularFirestoreCollection<Category>;

  constructor(private afs: AngularFirestore) {
    this.categoriesCollection = this.afs.collection('categories');
  }

  getCategories = () => this.categoriesCollection.get()
    .pipe(map((categorySnapshot: QuerySnapshot<Category>) => {
      let categories: Category[] = [];
      categorySnapshot.forEach((categoryDocument: QueryDocumentSnapshot<Category>) => {
        let category = categoryDocument.data();
        category.uid = categoryDocument.id;
        categories.push(category);
      });
      return categories;
  }));

  addCategory = (category: Category) => this.afs.collection('categories').add({
    title: category.title
  });

}
