import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, QuerySnapshot, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Question } from '../models/question.model';
import { Category } from '../models/category.model';
import { Answer } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public questionSelected: Question;
  public answerSelected: Answer;

  constructor(private afs: AngularFirestore) {
  }

  getAnswers = (category: string, documentUid: string) => 
    this.afs.collection(category).doc(documentUid).collection('answers').get()
      .pipe(map((answerSnapshot: QuerySnapshot<Answer>) => {
        let answers = [];
        answerSnapshot.forEach((answerDocument: QueryDocumentSnapshot<Answer>) => {
          let answer = answerDocument.data();
          answer.uid = answerDocument.id;
          answers.push(answer);
        });
        return answers;
      })
  );
  

}
