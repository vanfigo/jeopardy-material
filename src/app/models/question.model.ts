import { Answer } from './answer.model';

export class Question {
    uid: string;
    description: string;
    value: number;
    answers: Answer[];
    answered: boolean;
}