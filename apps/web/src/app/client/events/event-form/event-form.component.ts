import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Address, Coords } from '@ego/common/core/models/address';
import { Event } from '@ego/common/core/models/event';
import { EventType } from '@ego/common/core/models/event-type';
import { SaveEventModel } from '@ego/common/core/models/save-event';
import { AddressesService } from '@ego/common/core/services/addresses.service';
import { EventsService } from '@ego/common/core/services/events.service';
import { DestroyableBase } from '@ego/common/shared/components/destroyable-base/destroyable-base.component';
import { Observable, of, ReplaySubject, merge, NEVER } from 'rxjs';
import { switchMap, tap, debounceTime, filter, switchMapTo, startWith, share, takeUntil } from 'rxjs/operators';

/**
 * Form to create or edit event.
 */
@Component({
  selector: 'ego-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent extends DestroyableBase implements OnInit {
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
   * Event types.
   */
  public readonly types$: Observable<EventType[]>;
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
   * @param eventsService Events service.
   */
  public constructor(
    private readonly fb: FormBuilder,
    private readonly addressesService: AddressesService,
    private readonly eventsService: EventsService,
  ) {
    super();
    this.form$ = this.initFormStream();
    this.addresses$ = this.initAddressesForAutocompleteStream(this.form$);
    this.types$ = this.initTypesStream();
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
    const eventToSave: SaveEventModel = {
      id: this.event ? this.event.id : undefined,
      title: form.value.title,
      start: form.value.start.toISOString(),
      end: form.value.end.toISOString(),
      description: form.value.description,
      price: form.value.price,
      place: this.selectedAddressCoords.getStringCoords(),
      avatar: form.value.avatar instanceof File ? form.value.avatar : null,
      type_id: form.value.type,
    };

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
        filter((address) => address.isBuilding),
        takeUntil(this.destroy$),
      )
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
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
      description: [null, [Validators.required]],
      avatar: [null, [Validators.required]],
      address: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  private fillFormWithValues(form: FormGroup): Observable<never> {
    return this.init$.pipe(
      switchMap(() => this.event ? this.addressesService.getAddressByCoordinates(this.event.place) : NEVER),
      tap((address) => {
        form.patchValue({
          title: this.event.title,
          price: this.event.price,
          description: this.event.description,
          start: this.event.start,
          end: this.event.end,
          address: address,
          avatar: this.event.avatar,
          type: this.event.type.id,
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

  private initTypesStream(): Observable<EventType[]> {
    return this.eventsService.getEventTypes()
      .pipe(share());
  }
}
