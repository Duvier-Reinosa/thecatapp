import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonTitle,
  IonButton,
  IonContent,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { CatsService } from '../../services/cats.service';
import { CatModel } from './cat.model';
import { LoadingComponent } from '../../components/loading/loading.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonButton,
    IonTitle,
    IonContent,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    LoadingComponent,
    IonSearchbar,
    FormsModule,
  ],
})
export class HomePage implements OnInit {
  public catsList: CatModel[] = [];
  public filteredCats: CatModel[] = [];
  public isLoading = true;
  public searchTerm: string = '';

  constructor(private catsService: CatsService) {}

  ngOnInit() {
    this.getCats();
  }

  private getCats() {
    this.catsService.getCatsService().subscribe((data: any) => {
      let rawData = data;
      const dataWithoutImage = rawData.filter(
        (cat: CatModel) => !cat.image?.url,
      );

      const dataSave = rawData.map((cat: CatModel) => {
        if (cat.image?.url) {
          return cat;
        }

        const image = this.catsService
          .getCatImageService(cat.id)
          .subscribe((data: any) => {
            return data[0];
          });

        return {
          ...cat,
          image,
        };
      });

      this.catsList = dataSave;
      this.filteredCats = dataSave;

      this.isLoading = false;
    });
  }

  public onSearchChange() {
    this.filterCats();
  }

  private filterCats() {
    if (this.searchTerm.length === 0) {
      this.filteredCats = this.catsList;
      return;
    }

    this.filteredCats = this.catsList.filter((cat) =>
      cat.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
}
