import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  constructor(private fb : FormBuilder) { }

  form : FormGroup;
  genres = [{id:1, name : 'Drama'},{id : 2, name : 'Action'}]

  movies = [
    {title : 'Spider-Man',poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Web_of_Spider-Man_Vol_1_129-1.png/250px-Web_of_Spider-Man_Vol_1_129-1.png'},
    {title : 'Blacklist',poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Blacklist_Title_Card.jpg/250px-Blacklist_Title_Card.jpg'},
    {title : 'Avengers',poster: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg'}
  ]

  originalMovies = this.movies;
  
  ngOnInit(): void {
    this.form = this.fb.group({
      title : "gh",
      genreId : 0,
      upcomingReleases : false,
      inTheaters : false

    })

    this.form.valueChanges
    .subscribe(values =>{
      this.movies = this.originalMovies;
      this.filterMovies(values);
    })
  }

  filterMovies(values : any){
    if(values.title){
      this.movies = this.movies.filter(movie=>movie.title.indexOf(values.title) !== -1);
    }
  }
  clearForm(){
    this.form.reset();
  }

}
