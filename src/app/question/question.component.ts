import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { QuestionService } from '../providers/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  isAnswered: boolean = false;
  question: Question;
  answers: Answer[];

  constructor(private bottomSheetRef: MatBottomSheetRef<QuestionComponent>,
              private questionService: QuestionService,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: {question: Question, answers: Answer[]}) {
    this.question = data.question;
    this.answers = data.answers;
  }

  ngOnInit() { }

  isCorrect = (answer: Answer) => answer.answered && answer.correct;

  isIncorrect = (answer: Answer) => answer.answered && !answer.correct;

  answerSelected = (answer: Answer) => {
    this.questionService.questionSelected = this.question;
    this.questionService.answerSelected = answer;
    this.isAnswered = answer.answered = true;
    setTimeout(()=>this.bottomSheetRef.dismiss(), 400)
  }

}
