import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { switchMap, first, tap, debounceTime, filter } from 'rxjs/operators';
import { Address, Coords } from 'src/app/core/models/address';
import { Event } from 'src/app/core/models/event';
import { SaveEventModel } from 'src/app/core/models/save-event';
import { AddressesService } from 'src/app/core/services/addresses.service';

/**
 * Form to create or edit event.
 */
@Component({
  selector: 'ego-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {
  /**
   * Event object.
   */
  @Input()
  public event?: Event;
  /**
   * Emit an event if it is saved successfully.
   */
  @Output()
  public save = new EventEmitter<SaveEventModel>();
  /**
   * Form.
   */
  public readonly form$: Observable<FormGroup>;
  /**
   * List of addresses to suggest user.
   */
  public readonly addresses$: Observable<Address[]>;
  /**
   * Min date for matDatePicker
   */
  public minDate = new Date();

  private selectedAddressCoords: Coords;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly addressesService: AddressesService,
  ) {
    this.form$ = this.initFormStream();
    this.addresses$ = this.initAddressesForAutocompleteStream(this.form$);
  }

  /**
   * Handles form submit event.
   *
   * @param form Form.
   */
  public onFormSubmit(form: FormGroup): void {
    form.markAllAsTouched();
    if (form.invalid) {
      return;
    }
    if (!this.selectedAddressCoords) {
      form.controls.address.setErrors({ 'incorrectAddress': true });
      return;
    }
    const eventToSave = {
      title: form.value.title,
      date: form.value.date.toISOString(),
      description: form.value.description,
      price: form.value.price,
      place: this.selectedAddressCoords.getStringCoords(),
    } as SaveEventModel;

    this.save.emit(eventToSave);
  }

  /**
   * Handle 'optionSelected' event of matAutocomplete.
   * @param value Value.
   */
  public onAddressSelect(value: MatAutocompleteSelectedEvent): void {
    const selectedAddress = value.option.value as Address;
    this.addressesService.getCoordinatesByAddress(selectedAddress.unstrictedValue)
      .pipe(
        first(),
        filter((address) => address.isBuilding),
      ).subscribe((address) => (this.selectedAddressCoords = address.coords));
  }

  /**
   * Function for 'displayWith' mat autocomplete property.
   * @param address Address
   */
  public displayAddressValue(address: Address): string {
    return address ? address.value : '';
  }

  private initFormStream(): Observable<FormGroup> {
    let form: FormGroup;
    if (!this.event) {
      form = this.fb.group({
        'title': [null, [Validators.required, Validators.maxLength(50)]],
        'price': [null, [Validators.required, Validators.min(0)]],
        'date': [null, [Validators.required]],
        'description': [null, [Validators.required]],
        'avatar': [null],
        'address': [null, [Validators.required, this.validateAddress.bind(this)]],
      });
    } else {
      form = this.fb.group({
        'title': [this.event.title, [Validators.required, Validators.maxLength(50)]],
        'price': [this.event.price, [Validators.required, Validators.min(0)]],
        'date': [this.event.date, [Validators.required]],
        'description': [this.event.description, [Validators.required]],
        'avatar': [null],
        'address': [null, [Validators.required]],
      });
    }
    return of(form);
  }

  private initAddressesForAutocompleteStream(form$: Observable<FormGroup>): Observable<Address[]> {
    return form$
      .pipe(
        switchMap((form) => form.controls.address.valueChanges),
        filter(addressQuery => typeof addressQuery === 'string'),
        debounceTime(500),
        switchMap((addressQuery) => this.addressesService.suggestAddress(addressQuery)),
        tap((val) => console.log(val)),
      );
  }

  private validateAddress(control: AbstractControl): ValidationErrors | null {
    return this.selectedAddressCoords
      ? null
      : { incorrectAddress: true } as ValidationErrors;
  }
}
