import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CatPage } from './cat.page';
import { CatsService } from 'src/app/services/cats.service';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

describe('CatPage', () => {
  let component: CatPage;
  let fixture: ComponentFixture<CatPage>;
  let catsServiceSpy: jasmine.SpyObj<CatsService>;
  let activatedRouteStub: any;

  const mockCatData = {
    id: '1',
    name: 'Persian',
    description: 'A fluffy cat',
    origin: 'Iran',
    intelligence: 4,
    adaptability: 5,
    life_span: '10-15',
    energy_level: 3,
    image: { url: 'persian.jpg' },
  };

  beforeEach(waitForAsync(() => {
    catsServiceSpy = jasmine.createSpyObj('CatsService', ['getCatService', 'getCatImageService']);
    catsServiceSpy.getCatService.and.returnValue(of(mockCatData));
    catsServiceSpy.getCatImageService.and.returnValue(of([{ url: 'persian.jpg' }]));

    activatedRouteStub = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' }),
      },
    };

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HttpClientModule, CatPage],
      providers: [
        { provide: CatsService, useValue: catsServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch cat data on initialization', () => {
    expect(catsServiceSpy.getCatService).toHaveBeenCalledWith('1');
    expect(component.catData.name).toBe('Persian');
    expect(component.isLoading).toBe('loaded');
  });

  it('should fetch cat image on initialization', () => {
    expect(catsServiceSpy.getCatImageService).toHaveBeenCalledWith('1');
    expect(component.catImage).toBe('persian.jpg');
  });

  it('should handle missing cat ID gracefully', () => {
    activatedRouteStub = {
      snapshot: { paramMap: convertToParamMap({}) },
    };

    component = new CatPage(catsServiceSpy, activatedRouteStub as ActivatedRoute);
    component.getCat();

    expect(component.isLoading).toBe('error');
  });
});
