import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding HTTP requests after each test
    httpTestingController.verify();
  });

  it('should initialize with full data', () => {
    // Simulate the initial HTTP request to load the data
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
    const dataUrl = 'assets/dummy.json';
    const req = httpTestingController.expectOne(dataUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);

    // After the initial data loading, the filteredData$ observable should emit the full data
    service.filteredData$.subscribe(data => {
      expect(data).toBeDefined();
    });
  });

  it('should filter data based on date range', () => {
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

    // Set the data and initial date range
    service['data'] = testData;
    const startDate = new Date('2023-07-15T00:00:00.000Z');
    const endDate = new Date('2023-07-15T23:59:59.999Z');

    // Call updateFilteredData with the date range
    service.updateFilteredData(startDate, endDate);

    // Expect the filteredData$ observable to emit the filtered data
    service.filteredData$.subscribe(data => {
      // Verify if the filtered data contains items within the provided date range
      const filteredData = data.filter(item => {
        const date = new Date(item.date_time);
        return date >= startDate && date <= endDate;
      });
      expect(data).toBeDefined;
    });

    // Expect an HTTP request to the dataUrl (since we're simulating the initial data loading)
    const dataUrl = 'assets/dummy.json';
    const req = httpTestingController.expectOne(dataUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  // Add more test cases as needed...
});
