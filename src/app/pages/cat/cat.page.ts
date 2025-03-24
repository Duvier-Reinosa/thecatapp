import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonText } from '@ionic/angular/standalone';
import { CatsService } from 'src/app/services/cats.service';
import { CatModel } from '../home/cat.model';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.page.html',
  styleUrls: ['./cat.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, LoadingComponent, IonText]
})
export class CatPage implements OnInit {
  public catData: CatModel = {
    adaptability: 0,
    affection_level: 0,
    alt_names: '',
    cfa_url: '',
    child_friendly: 0,
    country_code: '',
    country_codes: '',
    description: '',
    dog_friendly: 0,
    energy_level: 0,
    experimental: 0,
    grooming: 0,
    hairless: 0,
    health_issues: 0,
    hypoallergenic: 0,
    id: '',
    image: {
      id: '',
      width: 0,
      height: 0,
      url: ''
    },
    indoor: 0,
    intelligence: 0,
    lap: 0,
    life_span: '',
    name: '',
    natural: 0,
    origin: '',
    rare: 0,
    reference_image_id: '',
    rex: 0,
    shedding_level: 0,
    short_legs: 0,
    social_needs: 0,
    stranger_friendly: 0,
    suppressed_tail: 0,
    temperament: '',
    vcahospitals_url: '',
    vetstreet_url: '',
    vocalisation: 0,
    weight: {
      imperial: '',
      metric: ''
    },
    wikipedia_url: ''
  };
  public catImage = '';
  public isLoading = 'loading';

  constructor(private catsService: CatsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCat();
  }

  getCat() {
    const catId = this.route.snapshot.paramMap.get('id');
    
    if (catId === null) {
      this.isLoading = 'error';
      return;
    }

    this.catsService.getCatService(catId).subscribe((data: any) => {
      console.log(data);
      this.catData = data;
      this.isLoading = 'loaded';
    });

    this.catsService.getCatImageService(catId).subscribe((data: any) => {
      this.catImage = data[0].url;
    });
  }

}
