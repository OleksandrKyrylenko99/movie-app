import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { GenresList } from '../../types/genres';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MediaManagementService } from '../../service/media-management/media-management.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { selectGenres } from '../../store/selectors';
import { NotFindComponent } from '../not-find/not-find.component';

import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
import { takeUntil, tap } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-media-page-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatIcon,
    MatButtonModule,
    MatMenuModule,
    NgClass,
    AsyncPipe,
    FormsModule,
    NotFindComponent,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './media-page-header.component.html',
  styleUrl: './media-page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPageHeaderComponent
  extends ClearObservableDirective
  implements OnInit
{
  activeDropdown: string | null = null;
  genresList: GenresList | null = null;
  searchControl = new FormControl('');
  @Input() title!: string;
  @Output() filter = new EventEmitter();
  @Output() sorting = new EventEmitter();
  @Output() search = new EventEmitter();
  sortDetails = [
    {
      title: 'Popularity',
      radio_groups: [
        {
          value: 'popularity.desc',
          title: 'Desc',
        },
        {
          value: 'popularity.asc',
          title: 'Asc',
        },
      ],
    },
    {
      title: 'Revenue',
      radio_groups: [
        {
          value: 'revenue.desc',
          title: 'Desc',
        },
        {
          value: 'revenue.asc',
          title: 'Asc',
        },
      ],
    },
  ];
  constructor(
    public MediaManagementService: MediaManagementService,
    private store: Store
  ) {
    super();
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((val) => this.search.emit(val))
      )
      .subscribe();
  }
  ngOnInit(): void {
    this.getGenres();
  }
  getGenres() {
    this.store
      .select(selectGenres)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.genresList = res;
        }
        if (this.genresList && this.genresList.genres) {
          this.genresList = {
            ...this.genresList,
            genres: this.genresList.genres.map((genre) => ({
              ...genre,
              checked: false,
            })),
          };
        }
      });
  }
  apply() {
    if (this.genresList) {
      const checkedGenres = this.genresList.genres
        .filter((genre) => genre.checked)
        .map((genre) => genre.id);
      this.filter.emit(checkedGenres.join(','));
    }
  }
  sort(sort: string) {
    this.sorting.emit(sort);
  }
  toggleDropdown(dropdownType: string) {
    if (this.activeDropdown === dropdownType) this.activeDropdown = null;
    else this.activeDropdown = dropdownType;
  }

  closeDropdown() {
    this.activeDropdown = null;
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.action-list')) this.closeDropdown();
  }
  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent) {
    this.closeDropdown();
  }
}
