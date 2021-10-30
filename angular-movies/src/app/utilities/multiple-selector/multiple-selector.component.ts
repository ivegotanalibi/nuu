import { Component, Input, OnInit } from '@angular/core';
import { MultipleSelectorModel } from './multiple-selector.model';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrls: ['./multiple-selector.component.css']
})
export class MultipleSelectorComponent implements OnInit {

  constructor() { }

  @Input()
  SelectedItems : MultipleSelectorModel[] = []

  @Input()
  NonSelectedItems : MultipleSelectorModel[] = []
  
  ngOnInit(): void {
  }

  select(item : MultipleSelectorModel , index : number){
    this.SelectedItems.push(item);
    this.NonSelectedItems.splice(index,1);
  }

  deSelect(item : MultipleSelectorModel , index : number){
    this.NonSelectedItems.push(item);
    this.SelectedItems.splice(index,1);
  }

  selectAll(){
    this.SelectedItems.push(...this.NonSelectedItems);
    this.NonSelectedItems = [];
  }

  deSelectAll(){
    this.NonSelectedItems.push(...this.SelectedItems);
    this.SelectedItems = []; 
  }
}
