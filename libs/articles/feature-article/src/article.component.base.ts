import { Directive, OnDestroy, OnInit, computed, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleStore } from '@realworld/articles/data-access';
import { AuthStore } from '@realworld/auth/data-access';

@Directive()
export abstract class ArticleComponentBase implements OnInit, OnDestroy {
  slug = input<string>('');

  protected readonly authStore = inject(AuthStore);
  protected readonly articleStore = inject(ArticleStore);
  protected readonly route = inject(ActivatedRoute);

  $article = this.articleStore.data;
  $comments = this.articleStore.comments;
  $isLoading = this.articleStore.getArticleLoading;

  $authorUsername = this.articleStore.data.author.username;
  $isAuthenticated = this.authStore.loggedIn;
  $currentUser = this.authStore.user;
  $canModify = computed(() => this.authStore.user.username() === this.$authorUsername());

  ngOnInit() {
    const slugValue = this.slug() || this.route.snapshot.params['slug'];
    this.articleStore.getArticle(slugValue);
    this.articleStore.getComments(slugValue);
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

  /** Override in NativeScript app for back navigation */
  goBack() {}

  ngOnDestroy() {
    this.articleStore.initializeArticle();
  }
}
