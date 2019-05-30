import { Component, OnInit } from '@angular/core';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { BoardService } from '../providers/board.service';
import { QuestionService } from '../providers/question.service';

import { Category } from '../models/category.model';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { QuestionComponent } from '../question/question.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  faChevronCircleLeft = faChevronCircleLeft;

  constructor(private boardService: BoardService,
              private questionService: QuestionService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar) {
    this.boardService.initBoard().subscribe();
  }

  ngOnInit() {
  }

  showQuestion = (category: Category, question: Question) => {
    this.questionService.getAnswers(category.title, question.uid)
      .subscribe((answers: Answer[]) => {
        let ref = this.bottomSheet.open(QuestionComponent, {
          disableClose: true,
          data: {
            question,
            answers
          }
        });
        ref.afterDismissed().subscribe(() => {
          question.answered = true;
          let answer = this.questionService.answerSelected;
          if(answer.correct)
            this.snackBar.open(`Awesome, you've got $${question.value}`, 'Yeah!', {
              duration: 5000
            });
          else
            this.snackBar.open(`Sadly, you've lost -$${question.value}`, 'Ups :(', {
              duration: 5000
            });
        });
      });
  }

}
