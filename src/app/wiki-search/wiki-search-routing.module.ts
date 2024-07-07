import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WikiSearchPage } from './wiki-search.page';

const routes: Routes = [
  {
    path: '',
    component: WikiSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WikiSearchPageRoutingModule {}
