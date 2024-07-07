import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WikiSearchPageRoutingModule } from './wiki-search-routing.module';

import { WikiSearchPage } from './wiki-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WikiSearchPageRoutingModule
  ],
  declarations: [WikiSearchPage]
})
export class WikiSearchPageModule {}
