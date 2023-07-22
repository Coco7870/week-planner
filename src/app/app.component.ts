import { Component } from '@angular/core';
import { DataService } from './service/data.service';
import { TimeFrameData } from './interface/time-frame';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public filteredData$: Observable<any[]> = this.dataService.filteredData$;

  constructor(private dataService: DataService) {}

  onDateRangeSelected(dateRange: Date[]): void {
    const startDate: Date = dateRange[0];
    const endDate: Date = dateRange[1];

    this.dataService.updateFilteredData(startDate, endDate);
  }
}
