import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangePickerComponent } from './date-range-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule ,
        MatNativeDateModule,
        BrowserAnimationsModule,
        NoopAnimationsModule  // Add the MatFormFieldModule to the imports
      ],
      declarations: [DateRangePickerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selected date range when start date is changed', () => {
    const startDate = new Date('2023-07-15T00:00:00.000Z');
    const endDate = new Date('2023-07-21T00:00:00.000Z');

    component.range.controls['start'].setValue(startDate);

    // Subscribe to the dateRangeSelected event and check if the emitted value matches the expected date range
    component.dateRangeSelected.subscribe((dateRange: Date[]) => {
      expect(dateRange[0]).toEqual(startDate);
      expect(dateRange[1]).toEqual(endDate);
    });

    // Set the expected end date after the start date is changed
    component.range.controls['end'].setValue(endDate);
  });

  it('should emit the selected date range when end date is changed', () => {
    const startDate = new Date('2023-07-15T00:00:00.000Z');
    const endDate = new Date('2023-07-21T00:00:00.000Z');

    component.range.controls['start'].setValue(startDate);

    // Subscribe to the dateRangeSelected event and check if the emitted value matches the expected date range
    component.dateRangeSelected.subscribe((dateRange: Date[]) => {
      expect(dateRange[0]).toEqual(startDate);
      expect(dateRange[1]).toEqual(endDate);
    });

    // Set the expected end date directly
    component.range.controls['end'].setValue(endDate);
  });
});
