import { Component, OnInit } from '@angular/core';
import { Game } from '../../game/core/game';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private game: Game;

  constructor() { }

  ngOnInit() {
    this.game = new Game(50, 25, 'container');
  }

}
