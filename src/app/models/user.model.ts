export class User {
    photoUrl: string;
    displayName: string;
    score: number;
    categories: string[];

    constructor(displayName:string) {
        this.photoUrl = '';
        this.displayName = displayName;
        this.score = 0;
        this.categories = [];
    }
}