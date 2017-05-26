import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchFiltersModal } from './search-filters-modal';

@NgModule({
  declarations: [
    SearchFiltersModal,
  ],
  imports: [
    IonicPageModule.forChild(SearchFiltersModal),
  ],
  exports: [
    SearchFiltersModal
  ]
})
export class SearchFiltersModalModule {}
