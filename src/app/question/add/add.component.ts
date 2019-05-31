import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question.model';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Answer } from 'src/app/models/answer.model';
import { QuestionService } from 'src/app/providers/question.service';
import { Category } from 'src/app/models/category.model';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-question-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @Input() category: Category;
  @Output() save = new EventEmitter<Question>();
  @Output() cancel = new EventEmitter<void>();

  faPlus = faPlus;
  question: Question;
  answer: Answer;

  constructor(private questionService: QuestionService) {
    this.question = new Question();
    this.question.answers = [];
    this.answer = new Answer();
  }

  ngOnInit() {
  }

  addAnswer = () => {
    this.question.answers.push(this.answer);
    this.answer = new Answer();
  }

  cancelQuestion = () => this.cancel.emit();

  saveQuestion = () => {
    this.questionService.addQuestion(this.category.title, this.question);
    this.save.emit(this.question);
  }

}
