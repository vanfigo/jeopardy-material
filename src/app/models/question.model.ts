import { Answer } from './answer.model';

export class Question {
    uid: string;
    question: string;
    value: number;
    answers: Answer[];
    answered: boolean;
}