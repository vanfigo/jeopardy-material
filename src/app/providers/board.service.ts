import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Category } from '../models/category.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private categoriesCollection: AngularFirestoreCollection<Category>;
  categories: Category[] = [];

  constructor(private afs: AngularFirestore) {
    this.categoriesCollection = this.afs.collection('categories');
  }

  initBoard = () => {
    this.categories = [];
    return this.afs.collection('categories', ref => ref.limit(5)).get()
      .pipe(map((categorySnapshot: QuerySnapshot<Category>) => {
        categorySnapshot.forEach((categoryDocument: QueryDocumentSnapshot<Category>) =>
          this.categories.push(categoryDocument.data())
        );
        this.getQuestions();
    }))
  };

  getQuestions = () => {
    this.categories.forEach((category: Category) => {
      category.questions = [];
      this.afs.collection(category.title).get()
        .pipe(map((questionSnapshot: QuerySnapshot<Question>) => 
          questionSnapshot.forEach((questionDocument: QueryDocumentSnapshot<Question>) => {
            let question = questionDocument.data();
            question.uid = questionDocument.id;
            category.questions.push(question);
          })
        )
      ).subscribe();
    });
  }
}
