import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { CatsService } from '../../services/cats.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../../components/loading/loading.component';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let catsServiceSpy: jasmine.SpyObj<CatsService>;

  const mockCats = [
    { id: '1', name: 'Persian', origin: 'Iran', intelligence: 4, image: { url: 'persian.jpg' } },
    { id: '2', name: 'Siamese', origin: 'Thailand', intelligence: 5, image: { url: 'siamese.jpg' } },
  ];

  beforeEach(waitForAsync(() => {
    catsServiceSpy = jasmine.createSpyObj('CatsService', ['getCatsService']);
    catsServiceSpy.getCatsService.and.returnValue(of(mockCats));

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FormsModule, RouterModule.forRoot([]), HttpClientModule, HomePage],
      providers: [{ provide: CatsService, useValue: catsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display cat breeds on initialization', () => {
    component.ngOnInit();
    expect(component.catsList.length).toBe(2);
    expect(component.filteredCats.length).toBe(2);
  });

  it('should filter cats based on search term', () => {
    component.ngOnInit();
    component.searchTerm = 'Siamese';
    component.onSearchChange();
    expect(component.filteredCats.length).toBe(1);
    expect(component.filteredCats[0].name).toBe('Siamese');
  });

  it('should reset the filter when the search term is empty', () => {
    component.ngOnInit();
    component.searchTerm = '';
    component.onSearchChange();
    expect(component.filteredCats.length).toBe(2);
  });
});
