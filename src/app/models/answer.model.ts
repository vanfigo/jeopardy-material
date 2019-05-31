export class Answer {
    uid: string;
    description: string;
    correct: boolean;
    answered: boolean;

    constructor() {
        this.description = '';
        this.correct = false;
        this.answered = false;
    }
}