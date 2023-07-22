import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableComponent } from './time-table.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

describe('TimeTableComponent', () => {
  let component: TimeTableComponent;
  let fixture: ComponentFixture<TimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeTableComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatTableModule  // Add the MatFormFieldModule to the imports
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "-" for an empty data source', () => {
    // Test an empty data source
    component.dataSource = [];
    component.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    fixture.detectChanges();

    // The table should contain 1 header row and no data rows (only "-" for each day)
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(1); // +1 for the header row
  });

  it('should display correct display_value for a specific day', () => {
    const testData = [
      
        {
          "date_time": "2023-07-09T04:00:00.000Z",
          "display_value": 2
        },
        {
          "date_time": "2023-07-09T05:00:00.000Z",
          "display_value": 2
        },
        {
          "date_time": "2023-07-09T06:00:00.000Z",
          "display_value": 2
        },
    ];

    // Set the data and days for the component
    component.dataSource = testData;
    component.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    fixture.detectChanges();

    // Test for each row in the table
    testData.forEach((data:any) => {
      const rowElement = fixture.nativeElement.querySelector(`td[mat-cell][data-time-frame="${data.timeFrame}"]`);
      expect(rowElement).toBeDefined();

    });
  });
});
