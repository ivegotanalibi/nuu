import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() : void {
    this.moviesInTheaters = [
      {
        title : 'Spider-Man',
        releaseDate : new Date(),
        price : 1400.99,
        poster : 'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Web_of_Spider-Man_Vol_1_129-1.png/250px-Web_of_Spider-Man_Vol_1_129-1.png'
      },
      {
        title : 'Avengers',
        releaseDate : new Date('2016-11-14'),
        price : 2450.99,
        poster : 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg'
      },
      
    ]

    this.moviesFutureReleases = []
  }
  
  moviesInTheaters;
  moviesFutureReleases;  
}
