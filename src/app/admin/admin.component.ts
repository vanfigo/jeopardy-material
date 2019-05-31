import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from '../providers/categories.service';
import { QuestionService } from '../providers/question.service';
import { Question } from '../models/question.model';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  faPlus = faPlus;
  categories: Category[];
  category: Category = new Category('');
  categorySelected: Category;
  questions: Question[];
  addingQuestion: boolean = false;

  constructor(private categoryService: CategoriesService,
              private questionService: QuestionService) {
    this.categoryService.getCategories().subscribe((categories: Category[]) => this.categories = categories);
  }

  ngOnInit() {
  }

  addCategory = () => {
    if(this.category.title.length > 0) {
      this.categoryService.addCategory(this.category).then((categoryRef: DocumentReference) => {
        console.log(categoryRef.id)
        this.categories.push(new Category(this.category.title));
        this.category = new Category('');
      });
    }
  };

  showQuestions = (category: Category, element: HTMLElement) => {
    this.addingQuestion = false;
    this.categorySelected = category;
    document.querySelectorAll('ul > button')
      .forEach((_element: HTMLElement) => _element.classList.remove('active'))
    element.classList.add('active');
    this.questionService.getQuestionsByCategory(category.title)
    .subscribe((questions: Question[]) => this.questions = questions);
  }

  addQuestion = () => this.addingQuestion = true;

  savedQuestion = (question: Question) => {
    this.questions.push(question);
    this.addingQuestion = false;
  }

}
