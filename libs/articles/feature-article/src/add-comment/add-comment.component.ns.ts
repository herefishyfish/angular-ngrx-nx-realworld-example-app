import { Article, User } from '@realworld/core/api-types';
import { InputErrorsComponent, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, inject, input, output, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';

@Component({
  selector: 'cdt-add-comment',
  templateUrl: './add-comment.component.html',
  imports: [ListErrorsComponent, ReactiveFormsModule, InputErrorsComponent, NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent {
  private readonly fb = inject(FormBuilder);

  article = input.required<Article>();
  currentUser = input.required<User>();
  submitComment = output<string>();

  form = this.fb.nonNullable.group({
    comment: [''],
  });

  submit() {
    const comment = this.form.controls.comment.value;
    console.log('[AddComment] Submitting comment:', comment);
    this.submitComment.emit(comment);
    this.form.reset();
  }
}
