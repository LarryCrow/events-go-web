import { Component, ChangeDetectionStrategy, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UploaderComponent),
  multi: true,
};

const DEFAULT_IMAGE_SRC = 'assets/default-image.jpg';

/**
 * Component to upload files.
 */
@Component({
  selector: 'ego-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [VALUE_ACCESSOR],
})
export class UploaderComponent implements ControlValueAccessor {
  /**
   * Selected file.
   */
  public value: File;
  /**
   * On change function.
   */
  public onChangeFn: Function;
  /**
   * On touch function.
   */
  public onTouchFn: Function;
  /**
   * Image source.
   */
  public imgSrc$ = new BehaviorSubject<string | SafeUrl>(DEFAULT_IMAGE_SRC);
  /**
   * Is image selected.
   */
  public isSelected: boolean;

  /**
   * @constructor
   *
   * @param domSanitizer DOM sanitizer.
   */
  public constructor(
    private readonly domSanitizer: DomSanitizer,
  ) { }

  /**
   * Listen to 'change' event.
   * @param event Filelist.
   */
  @HostListener('change', ['$event.target.files'])
  public emitFiles(event: FileList): void {
    const file = event && event.item(0);
    this.onChangeFn(file);
    this.isSelected = true;
    this.imgSrc$.next(this.getFileUrl(file));
  }

  /**
   * Handle 'click' event of 'Remove' button
   */
  public removeImage(): void {
    this.onChangeFn(null);
    this.imgSrc$.next(DEFAULT_IMAGE_SRC);
    this.isSelected = false;
  }

  /** @inheritdoc */
  public writeValue(value: any): void {
    if (value != null) {
      this.imgSrc$.next(value);
    }
  }

  /** @inheritdoc */
  public registerOnChange(fn: Function): void {
    this.onChangeFn = fn;
  }

  /** @inheritdoc */
  public registerOnTouched(fn: Function): void {
    this.onTouchFn = fn;
  }

  /**
   * Get safe url of file.
   */
  private getFileUrl(file: File): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }
}
