import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgClass } from '@angular/common';
import { HomeComponentBase } from './home.component.base';
import { HomeStore } from './home.store';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ArticleListComponent } from '@realworld/articles/articles-list';

@Component({
  selector: 'cdt-home',
  templateUrl: './home.component.html',
  imports: [NgClass, TagsListComponent, ArticleListComponent],
  providers: [HomeStore],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends HomeComponentBase {}
