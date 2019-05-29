import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private leaderboardCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.leaderboardCollection = this.afs.collection('leaderboard');
  }

  getLeaderboard = () => this.leaderboardCollection.get()
    .pipe(map((userSnapshot: QuerySnapshot<User>) => {
      let leaderboard: User[] = [];
      userSnapshot.forEach((userDocument: QueryDocumentSnapshot<User>) => {
        leaderboard.push(userDocument.data());
      });
      return leaderboard;
  }));
}
