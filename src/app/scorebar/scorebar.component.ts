import { Component, OnInit } from '@angular/core';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

import { BoardService } from '../providers/board.service';
import { FireAuthService } from '../providers/fire-auth.service';
import { User } from '../models/user.model';
import { DialogNameComponent } from '../dialog-name/dialog-name.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scorebar',
  templateUrl: './scorebar.component.html',
  styleUrls: ['./scorebar.component.css']
})
export class ScorebarComponent implements OnInit {

  faMedal = faMedal;

  constructor(public boardService: BoardService,
              private authService: FireAuthService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
  }

  endGame = () => {
    let user = new User('');
    if(this.authService.user) {
      this.saveGame(this.authService.user);
    } else {
      const dialogRef = this.dialog.open(DialogNameComponent, {
        disableClose: true,
        data: {
          name: ''
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        user.displayName = result;
        this.saveGame(user);
      });
    }
  }

  saveGame = (user: User) => {
    this.boardService.endGame(user).then(result => {
      this.router.navigateByUrl('/home');
    });
  }

}
