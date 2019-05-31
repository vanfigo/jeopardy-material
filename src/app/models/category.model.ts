import { Question } from './question.model';

export class Category {
    uid: string;
    title: string;
    questions: Question[];

    constructor(title: string) {
        this.title = title;
    }
}