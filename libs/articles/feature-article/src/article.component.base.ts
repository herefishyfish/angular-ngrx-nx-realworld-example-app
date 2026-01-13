import { Directive, OnDestroy, computed, effect, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleStore } from '@realworld/articles/data-access';
import { AuthStore } from '@realworld/auth/data-access';

@Directive()
export abstract class ArticleComponentBase implements OnDestroy {
  slug = input<string>('');

  protected readonly authStore = inject(AuthStore);
  protected readonly articleStore = inject(ArticleStore);
  protected readonly route = inject(ActivatedRoute);

  // Use deep signal selectors for individual properties
  $articleTitle = this.articleStore.data.title;
  $articleBody = this.articleStore.data.body;
  $articleSlug = this.articleStore.data.slug;
  $articleTagList = this.articleStore.data.tagList;
  
  $article = this.articleStore.data;
  $comments = this.articleStore.comments;
  $isLoading = this.articleStore.getArticleLoading;

  $authorUsername = this.articleStore.data.author.username;
  $isAuthenticated = this.authStore.loggedIn;
  $currentUser = this.authStore.user;
  $canModify = computed(() => this.authStore.user.username() === this.$authorUsername());

  constructor() {
    effect(() => {
      const slugValue = this.slug() || this.route.snapshot.params['slug'];
      if (slugValue) {
        this.articleStore.getArticle(slugValue);
        this.articleStore.getComments(slugValue);
      }
    });
  }

  follow(username: string) {
    this.articleStore.followUser(username);
  }

  unfollow(username: string) {
    this.articleStore.unfollowUser(username);
  }

  favorite(slug: string) {
    this.articleStore.favouriteArticle(slug);
  }

  unfavorite(slug: string) {
    this.articleStore.unFavouriteArticle(slug);
  }

  delete(slug: string) {
    this.articleStore.deleteArticle(slug);
  }

  deleteComment(data: { commentId: number; slug: string }) {
    this.articleStore.deleteComment(data);
  }

  submit(comment: string) {
    this.articleStore.addComment(comment);
  }

  ngOnDestroy() {
    this.articleStore.initializeArticle();
  }
}
