import { Component, OnInit } from '@angular/core';

import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../models/category.model';
import { BoardService } from '../providers/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  faChevronCircleLeft = faChevronCircleLeft;

  constructor(private boardService: BoardService) {
    this.boardService.initBoard().subscribe();
  }

  ngOnInit() {
  }

}
