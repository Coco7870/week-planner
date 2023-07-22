import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent {
  @Output() dateRangeSelected = new EventEmitter<Date[]>();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
});

startDateSelection(){
  console.log(this.range.controls["start"].value);
  let start = new Date(this.range.controls["start"].value);
  start.setDate(start.getDate() - start.getDay());
  this.range.controls["start"].setValue(start);
}
endDateSelection(){
  let start = new Date(this.range.controls["start"].value);
  let end = new Date(start);
  end.setDate(start.getDate() + 6); 
  this.range.controls["end"].setValue(end);
  this.dateRangeSelected.emit([this.range.controls["start"].value, this.range.controls["end"].value])
}
}
