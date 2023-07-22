import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TimeFrameData } from '../interface/time-frame';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/dummy.json';
  private data: any[] = [];
  private filteredDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // Initialize with an empty array
  public filteredData$: Observable<any[]> = this.filteredDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<any[]>(this.dataUrl).pipe(
      map((data) => data.map((item) => ({ ...item, timeFrame: this.getTimeFrame(item.date_time) })))
    ).subscribe((data) => {
      this.data = data;
      this.updateFilteredData(null, null); // Initialize with full data
    });
  }

  private getTimeFrame(dateTime: string): string {
    // Implement the logic to get the time frame (e.g., 02:00 PM - 03:00 PM) from the date_time property
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 (midnight) to 12
  
    const timeFrame = `${this.formatTime(formattedHours)}:${this.formatTime(minutes)} ${meridiem}-` +
      `${this.formatTime(formattedHours + 1)}:${this.formatTime(minutes)} ${meridiem}`;
    
    return timeFrame;
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  updateFilteredData(startDate: Date | null, endDate: Date | null): void {
    if (startDate && endDate) {
      const filteredData = this.data.filter(item => {
        const date = new Date(item.date_time);
        return date >= startDate && date <= endDate;
      });
      this.filteredDataSubject.next(filteredData);
    } else {
      // If either startDate or endDate is null, send the full data
      this.filteredDataSubject.next(this.data);
    }
  }
}
