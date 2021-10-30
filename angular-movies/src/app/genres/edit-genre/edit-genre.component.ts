import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { genreCreationDTO, genreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {


  model : genreDTO 

  constructor(private activatedRoute : ActivatedRoute , 
             private genresService : GenresService , private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.genresService.getById(params.id).subscribe(genre => {
        this.model = genre;
      })
    })
  }

  saveChanges(genreCreation : genreCreationDTO){ 
    this.genresService.edit(this.model.id , genreCreation).subscribe(() => {
      this.router.navigate(["/genres"]); 
    })
    //console.log(genreCreationDTO);
    //this.router.navigate(['/genres']);
  }




}
