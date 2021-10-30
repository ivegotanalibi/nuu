import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstLetterUppercase } from 'src/app/Validators/firstLetterUppercase';
import { actorCreationDto } from '../actors.model';

@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.css']
})
export class FormActorComponent implements OnInit {

  constructor(private fb : FormBuilder) { }

  form : FormGroup;
  
  @Input()
  model : actorCreationDto;


  @Output()
  onSaveChanges = new EventEmitter<actorCreationDto>();

  ngOnInit(): void {
    this.form = this.fb.group({
      name : ['', [Validators.required , Validators.minLength(3), firstLetterUppercase]],
      dateOfBirth : '',
      picture : '',
      biography : ''
    })

    if(this.model !==undefined){
      this.form.patchValue(this.model);
    }
  }

  onImageSelected(image){
    this.form.get('picture').setValue(image);
  }

  changeMarkdown(content){
    this.form.get('biography').setValue(content);
  }
  saveChanges(){
    this.onSaveChanges.emit(this.form.value);
  }


}
