import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardContent, IonCardTitle, IonCardHeader, IonCard} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import {  CatsService } from '../../services/cats.service';
import { CatModel } from './cat.model';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCardContent, IonCardTitle, IonCardHeader, IonCard, LoadingComponent],
})
export class HomePage {
  public catsList: CatModel[] = [];
  public isLoading = true;

  constructor(private catsService: CatsService) {}

  ngOnInit() {
    this.getCats();
  }

  private getCats() {
    this.catsService.getCatsService().subscribe((data: any) => {
      let rawData = data;
      const dataWithoutImage = rawData.filter((cat: CatModel) => !cat.image?.url);

      
      this.catsList = rawData.map((cat: CatModel) => {
        if (cat.image?.url) {
          return cat;
        }

        const image = this.catsService.getCatImageService(cat.id).subscribe((data: any) => {
          return data[0];
        });

        return {
          ...cat,
          image
        }
      });
      this.isLoading = false;
    });
  }
}
