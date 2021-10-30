import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { firstLetterUppercase } from 'src/app/Validators/firstLetterUppercase';
import { genreCreationDTO, genreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent implements OnInit {

  // errors : string[] = [];
  constructor(private router : Router , private genresService : GenresService) { }



  ngOnInit(): void {
    
  }

  saveChanges(genreCreation : genreCreationDTO){ 
    this.genresService.create(genreCreation).subscribe(
      res => {this.router.navigate(['/genres'])}
    , error => console.error(error)
    )
    
  }

  
  
  
  
}
