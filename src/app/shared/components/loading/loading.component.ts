import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy } from '@angular/core';

/**
 * Loading component
 */
@Component({
  selector: 'ego-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit, OnDestroy {
  public constructor(@Inject(DOCUMENT) private document: Document) { }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.document.body.style.overflow = 'hidden';
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.document.body.style.overflow = 'unset';
  }
}
