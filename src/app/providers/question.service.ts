import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, QuerySnapshot, AngularFirestoreDocument, DocumentSnapshot, DocumentReference } from '@angular/fire/firestore';
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

  getQuestionsByCategory = (category: string) => this.afs.collection(category).get()
    .pipe(map((questionSnapshot: QuerySnapshot<Question>) => {
      let questions = [];
      questionSnapshot.forEach((questionDocument: QueryDocumentSnapshot<Question>) => {
        let question = questionDocument.data();
        question.uid = questionDocument.id;
        question.answers = [];
        this.afs.collection(category).doc(questionDocument.id).collection('answers').get()
          .pipe(map((answerSnapshot: QuerySnapshot<Answer>) => 
          answerSnapshot.forEach((answerDocument: QueryDocumentSnapshot<Answer>) => {
            let answer = answerDocument.data();
            question.answers.push(answer);
          })
        )).subscribe(() => questions.push(question));
      });
      return questions;
    }));

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

  addQuestion = (category: string, question: Question) =>
    this.afs.collection(category).add({
      description: question.description,
      value: question.value
    })
    .then((questionDocument: DocumentReference) => 
      question.answers.forEach((answer: Answer) => {
        this.afs.collection(category).doc(questionDocument.id)
          .collection('answers').add({
            description: answer.description,
            correct: answer.correct
          })
      })
    )
  

}
