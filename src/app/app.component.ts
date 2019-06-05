import { Component } from '@angular/core';
import { BoardService } from './providers/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'jeopardy';

  constructor(public boardService: BoardService) {
  }

}
