import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { HomeComponentBase, HomeStore, TagsListComponent } from '@realworld/home/feature-home';
import { ArticleListComponent } from '../article-list/article-list.component';

@Component({
  selector: 'cdt-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
  imports: [NgClass, TagsListComponent, ArticleListComponent],
  providers: [HomeStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage extends HomeComponentBase {}
