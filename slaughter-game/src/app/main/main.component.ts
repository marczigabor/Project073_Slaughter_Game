import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/model/game';
import { Canvas } from '../shared/model/canvas';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private game: Game;

  constructor() { }

  ngOnInit() {
    this.game = new Game(50,50, 'container', 'DarkOrange');
    this.game.display(true);
  }

}
