import { Component } from '@angular/core';

/**
 * Registration page.
 */
@Component({
  selector: 'ego-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
  /**
   * Flag to switch registration forms.
   */
  public roleFormShown = true;

  /**
   * Switch registration form.
   */
  public changeForm(): void {
    this.roleFormShown = !this.roleFormShown;
  }
}
