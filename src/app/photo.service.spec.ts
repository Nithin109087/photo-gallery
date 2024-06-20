import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoService]
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch photos with pagination and sorting', () => {
    const dummyPhotos = [
      { albumId: 1, id: 1, title: 'Photo 1', url: 'http://placehold.it/600/92c952', thumbnailUrl: 'http://placehold.it/150/92c952' },
      { albumId: 1, id: 2, title: 'Photo 2', url: 'http://placehold.it/600/771796', thumbnailUrl: 'http://placehold.it/150/771796' }
    ];

    service.getPhotos(1, 10).subscribe(photos => {
      expect(photos.length).toBe(2);
      expect(photos).toEqual(dummyPhotos);
    });

    const req = httpMock.expectOne(req => req.url.includes('https://jsonplaceholder.typicode.com/photos'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('_page')).toBe('1');
    req.flush(dummyPhotos);
  });

  it('should handle error correctly', () => {
    const errorMessage = 'Failed to load photos';

    service.getPhotos(1, 10).subscribe(
      () => fail('should have failed with the network error'),
      (error) => {
        expect(error.status).toEqual(500);
      }
    );

    const req = httpMock.expectOne(req => req.url.includes('https://jsonplaceholder.typicode.com/photos'));
    expect(req.request.method).toBe('GET');

    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
