import { Component } from '@angular/core';
import { IonHeader, IonTitle, IonButton, IonContent, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonSearchbar} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { CatsService } from '../../services/cats.service';
import { CatModel } from './cat.model';
import { LoadingComponent } from '../../components/loading/loading.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, RouterModule, IonHeader, IonButton, IonTitle, IonContent, IonCardContent, IonCardTitle, IonCardHeader, IonCard, LoadingComponent, IonSearchbar],
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
