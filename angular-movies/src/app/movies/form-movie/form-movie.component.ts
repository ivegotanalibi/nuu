import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorsMovieDTO } from 'src/app/actors/actors.model';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDTO, movieDTO } from '../movies.model';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  constructor(private fb : FormBuilder) { }
  form : FormGroup

  @Input()
  model : movieDTO

  @Output()
  onSaveChanges = new EventEmitter<movieCreationDTO>()

  @Input()
  nonSelectedGenres: MultipleSelectorModel[] = [];
  
  @Input()
  selectedGenres: MultipleSelectorModel[] = []

  @Input()
  nonSelectedMovieTheaters: MultipleSelectorModel[] = [];
  
  @Input()
  selectedMovieTheaters: MultipleSelectorModel[] = []

  @Input()
  selectedActors : actorsMovieDTO[] = [];



  ngOnInit(): void {
    this.form = this.fb.group({
      title : ['', [Validators.required]],
      summary : '',
      inTheaters : false,
      trailer : '',
      releaseDate : '',
      poster : '',
      genresIds : '',
      movieTheatersIds : '',
      actors : ''
    })

    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  saveChanges(){
    const genresIds = this.selectedGenres.map(value => value.key);          
    this.form.get('genresIds').setValue(genresIds);   

    const movieTheatersIds = this.selectedMovieTheaters.map(value => value.key);
    this.form.get('movieTheatersIds').setValue(movieTheatersIds);  

    const actors = this.selectedActors.map(value => {
      return {id : value.id, character : value.character}
    });
    this.form.get('actors').setValue(actors);

    this.onSaveChanges.emit(this.form.value);
  }

  onImageSelected(file : File){
    this.form.get('poster').setValue(file);
  }

  changeMarkdown(content){
    this.form.get('summary').setValue(content);
  }

}
