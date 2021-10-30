import { Component, OnInit } from '@angular/core';
import { genreCreationDTO, genreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {

  constructor(private genresService : GenresService) { }

 genres : genreDTO[];
 columnsToDisplay = ['name', 'actions']

  ngOnInit(): void {
    this.loadGenres();
      //console.log(genres);
         
  }

  loadGenres(){
    this.genresService.getAll().subscribe(genres =>{
      this.genres = genres
  })
}

  delete(id : number){
    this.genresService.delete(id)
    .subscribe( () => { 
     this.loadGenres(); 
    })    
  
  }
      
}
