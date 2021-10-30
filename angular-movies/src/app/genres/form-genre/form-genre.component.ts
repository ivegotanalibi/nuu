import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstLetterUppercase } from 'src/app/Validators/firstLetterUppercase';
import { EventEmitter } from '@angular/core';
import { genreCreationDTO } from '../genres.model';

@Component({
  selector: 'app-form-genre',
  templateUrl: './form-genre.component.html',
  styleUrls: ['./form-genre.component.css']
})
export class FormGenreComponent implements OnInit {

  constructor(private fb : FormBuilder) { }

  @Input()
  myModel : genreCreationDTO;

  form : FormGroup;
 
  @Output()
  onSaveChanges: EventEmitter<genreCreationDTO> = new EventEmitter<genreCreationDTO>();

  ngOnInit(): void {
    this.form = this.fb.group({
      name : ['', [Validators.required , Validators.minLength(3), firstLetterUppercase]]
        
    })

    if(this.myModel !==undefined){
      this.form.patchValue(this.myModel);
    }
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
