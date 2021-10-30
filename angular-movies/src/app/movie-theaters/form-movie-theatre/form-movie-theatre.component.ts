import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { coordinatesMap } from 'src/app/utilities/map/coordinates';
import { firstLetterUppercase } from 'src/app/Validators/firstLetterUppercase';
import { movieTheaterCreationDTO, movieTheaterDTO } from '../movieTheater.model';

@Component({
  selector: 'app-form-movie-theatre',
  templateUrl: './form-movie-theatre.component.html',
  styleUrls: ['./form-movie-theatre.component.css']
})
export class FormMovieTheatreComponent implements OnInit {

  constructor(private fb : FormBuilder) { }

  @Input()
  myModel : movieTheaterDTO;

  form : FormGroup;
 
  @Output()
  onSaveChanges: EventEmitter<movieTheaterCreationDTO> = new EventEmitter<movieTheaterCreationDTO>();

  initialCoordinatess : coordinatesMap[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      name : ['', [Validators.required , Validators.minLength(3), firstLetterUppercase]],
      longitude : ['', Validators.required],
      latitude : ['', Validators.required]     
    })

    if(this.myModel !==undefined){
      this.form.patchValue(this.myModel);
      this.initialCoordinatess.push({latitude : this.myModel.latitude, longitude : this.myModel.longitude});
    }
  }


  onSelectedLocation(coordinates : coordinatesMap){
    this.form.patchValue(coordinates);
  }

  saveChanges(){ 
    //save the genre
    this.onSaveChanges.emit(this.form.value);
  }

  getErrorMessageFieldName(){
    const field = this.form.get('name');
    
    if(field.hasError('required')){
      return 'The name field is required';
    }
    
    if(field.hasError('minLength')){
      return 'The minimum length is 3';
    }

    if(field.hasError('firstLetterUppercase')){
      return field.getError('firstLetterUppercase').message;
    }

    return '';
  }

  
}
