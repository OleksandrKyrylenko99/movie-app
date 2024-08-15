import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchService } from '../../service/search/search.service';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsButtonComponent } from '../../components/tabs/buttons/tabs-button.component';
import { ContentComponent } from '../../components/tabs/content/content.component';
import { SearchResults } from '../../types/search/search-results';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    TabsButtonComponent,
    ContentComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
// змінити реалізацію
export class SearchPageComponent
  extends ClearObservableDirective
  implements OnInit
{
  search = this.fb.group({
    searchedFragment: new FormControl('', Validators.required),
  });
  submitted = true;
  searchResult: SearchResults | null = null;
  tabsButton = [
    {
      type_media: 'movie',
      value: 'Movie',
    },
    {
      type_media: 'tv',
      value: 'Series',
    },
    {
      type_media: 'person',
      value: 'Person',
    },
  ];
  activatedTabIndex = 'movie';
  constructor(private fb: FormBuilder, private searchService: SearchService) {
    super();
  }
  ngOnInit(): void {}
  searchAll() {
    if (this.search.value.searchedFragment) {
      this.submitted = false;
      const query = this.search.value.searchedFragment;
      this.searchService
        .searchAll(query)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (res) this.searchResult = res;
        });
    }
  }
  tabChange(typeMedia: string) {
    this.activatedTabIndex = typeMedia;
  }
}
