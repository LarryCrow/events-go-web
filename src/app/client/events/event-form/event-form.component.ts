import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of, ReplaySubject, merge, NEVER } from 'rxjs';
import { switchMap, tap, debounceTime, filter, switchMapTo, startWith } from 'rxjs/operators';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent implements OnInit {
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

  private init$ = new ReplaySubject(1);
  private selectedAddressCoords: Coords;

  /**
   * @constructor
   *
   * @param fb Form builder.
   * @param addressesService Addresses service.
   */
  public constructor(
    private readonly fb: FormBuilder,
    private readonly addressesService: AddressesService,
  ) {
    this.form$ = this.initFormStream();
    this.addresses$ = this.initAddressesForAutocompleteStream(this.form$);
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.init$.next();
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
    const eventToSave = {
      id: this.event ? this.event.id : undefined,
      title: form.value.title,
      date: form.value.date.toISOString(),
      description: form.value.description,
      price: form.value.price,
      place: this.selectedAddressCoords.getStringCoords(),
      avatar: form.value.avatar,
      type_id: 1,
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
      .pipe(filter((address) => address.isBuilding))
      .subscribe((address) => (this.selectedAddressCoords = address.coords));
  }

  /**
   * Function for 'displayWith' mat autocomplete property.
   * @param address Address
   */
  public displayAddressValue(address: Address): string {
    return address ? address.value : '';
  }

  private initFormStream(): Observable<FormGroup> {
    const form = this.createForm();
    return merge(of(form), this.fillFormWithValues(form));
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(50)]],
      price: [null, [Validators.required, Validators.min(0)]],
      date: [null, [Validators.required]],
      description: [null, [Validators.required]],
      avatar: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }

  private fillFormWithValues(form: FormGroup): Observable<never> {
    return this.init$.pipe(
      switchMap(() => this.event ? this.addressesService.getAddressByCoordinates(this.event.place) : NEVER),
      tap((address) => {
        form.patchValue({
          title: this.event.title,
          price: this.event.price,
          date: this.event.date,
          description: this.event.description,
          address: address,
          avatar: this.event.avatar,
        }, { emitEvent: false });
        this.selectedAddressCoords = address.coords;
      }),
      switchMapTo(NEVER),
    );
  }

  private initAddressesForAutocompleteStream(form$: Observable<FormGroup>): Observable<Address[]> {
    return form$
      .pipe(
        switchMap((form) => form.controls.address.valueChanges),
        startWith(''),
        filter(addressQuery => typeof addressQuery === 'string'),
        debounceTime(500),
        switchMap((addressQuery) => this.addressesService.suggestAddress(addressQuery)),
      );
  }
}
