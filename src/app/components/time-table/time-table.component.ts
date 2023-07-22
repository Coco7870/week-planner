import { Component, Input, OnChanges } from '@angular/core';
import { Days, timeTableCols } from 'src/app/const/time-table-cols';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent   {
  @Input() dataSource:any;
  displayedColumns: string[] = timeTableCols;
  days: string[] =Days;
    // Function to get the display value for a specific day
  getValueForDay(row: any, day: string): number | null {
    const filteredDataForDay = this.dataSource.find((data:any) => {
      const date = new Date(data.date_time);
      return day === this.getDayOfWeek(date); // Assuming getDayOfWeek function returns the day name (e.g., "Sunday")
    });

    return filteredDataForDay ? filteredDataForDay.display_value : "-";
  }

  // Function to get the day name from a Date object
  public getDayOfWeek(date: Date): string {
    const daysOfWeek = this.days;
    return daysOfWeek[date.getDay()];
  }
}
