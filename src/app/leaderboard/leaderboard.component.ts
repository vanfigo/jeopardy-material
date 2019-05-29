import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { LeaderboardService } from '../providers/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboard: User[] = [];

  constructor(private leaderboardService: LeaderboardService) {
    this.leaderboardService.getLeaderboard().subscribe((users: User[]) => this.leaderboard = users);
  }

  ngOnInit() {
  }

}
