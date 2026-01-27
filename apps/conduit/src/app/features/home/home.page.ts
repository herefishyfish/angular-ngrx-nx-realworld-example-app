import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { HomeComponentBase, HomeStore, TagsListComponent } from '@realworld/home/feature-home';
import { ArticleListComponent } from '../article-list/article-list.component';
import { ArticlesListStore } from '@realworld/articles/data-access';

@Component({
  selector: 'cdt-home',
  templateUrl: '../../../../../../libs/home/feature-home/src/home.component.html',
  styleUrls: ['./home.page.css'],
  imports: [NgClass, TagsListComponent, ArticleListComponent],
  providers: [HomeStore, ArticlesListStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage extends HomeComponentBase {}
