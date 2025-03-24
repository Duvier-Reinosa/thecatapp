import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatsService } from './cats.service';
import { environment } from 'src/environments/environment.prod';

describe('CatsService', () => {
  let service: CatsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatsService],
    });

    service = TestBed.inject(CatsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cat breeds from API', () => {
    const mockResponse = [
      { id: 'beng', name: 'Bengal' },
      { id: 'siam', name: 'Siamese' },
    ];

    service.getCatsService().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://api.thecatapi.com/v1/breeds?order=ASC;limit=10`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-api-key')).toBe(environment.apiKey);
    req.flush(mockResponse);
  });

  it('should fetch a cat image from API', () => {
    const breedId = 'beng';
    const mockResponse = [{ url: 'https://example.com/cat.jpg' }];

    service.getCatImageService(breedId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://api.thecatapi.com/v1/images/search`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-api-key')).toBe(environment.apiKey);
    req.flush(mockResponse);
  });

  it('should fetch a single cat breed details from API', () => {
    const breedId = 'beng';
    const mockResponse = { id: 'beng', name: 'Bengal' };

    service.getCatService(breedId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://api.thecatapi.com/v1/breeds/${breedId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-api-key')).toBe(environment.apiKey);
    req.flush(mockResponse);
  });
});
