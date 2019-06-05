import { Component, OnInit } from '@angular/core';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BoardService } from '../providers/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  faPlus = faPlus;

  constructor(public boardService: BoardService) {
    this.boardService.isPlaying = false;
  }

}
