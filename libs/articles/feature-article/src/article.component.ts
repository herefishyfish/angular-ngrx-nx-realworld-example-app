import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleComponentBase } from './article.component.base';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { ArticleBodyComponent } from './article-body/article-body.component';

@Component({
  selector: 'cdt-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  imports: [ArticleMetaComponent, ArticleCommentComponent, ArticleBodyComponent, AddCommentComponent, RouterLink],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent extends ArticleComponentBase {}
