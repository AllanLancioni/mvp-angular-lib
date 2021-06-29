import {
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
      } from '@angular/core';
      import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
      import { awaiter, awaiterWhile } from '../../helpers/awaiter';
      
      declare const $: any;
      
      interface RateyoOptions {
	starWidth?: string;
	normalFill?: string;
	ratedFill?: string;
	rating?: number;
	spacing?: string;
        numStars?: number;
	maxValue?: number;
	multiColor?: null | {
	  startColor: string;
	  endColor: string;
	};
	precision?: number;
	halfStar?: boolean;
	fullStar?: boolean;
	readOnly?: boolean;
	rtl?: boolean;
      }
      interface RateyoOptionsWithEvents extends RateyoOptions {
	onInit: (value: number) => void;
	onSet: (value: number) => void;
	onChange: (value: number) => void;
      }
      
      @Component({
	selector: 'kz-rateyo',
	template: '<span #rateyo></span>',
	styles: [
	  `* {
	    margin-bottom: 0.5rem;
	  }`
	],
	providers: [
	  {
	    provide: NG_VALUE_ACCESSOR,
	    useExisting: forwardRef(() => KzRateyoComponent),
	    multi: true,
	  },
	],
      })
      export class KzRateyoComponent implements OnInit, OnChanges, ControlValueAccessor {
	@ViewChild('rateyo') rateyo: ElementRef;
	@Input() options: RateyoOptions = {};
	@Output() init: EventEmitter<any> = new EventEmitter();
	@Output() set: EventEmitter<any> = new EventEmitter();
	@Output() hover: EventEmitter<any> = new EventEmitter();
	disabled: boolean = false;
	$rateyo: any;
	_value: number;
      
	get maxVal(): number {
	  return this.options.maxValue || this.options.numStars || 5;
	}
      
	get value(): number {
	  return this._value;
	}
	set value(val: number) {
	  val = val || 0;
	  val = val < 0 ? 0 : (val > this.maxVal ? this.maxVal : val);
	  if (val === this._value) {
	    return;
	  }
	  this._value = val;
	  if (!this.$rateyo) {
	    this.renderRateyo();
	  } else if (this.rateyo?.nativeElement) {
	    $(this.rateyo?.nativeElement).rateYo("option", "rating", val);
	  }
	  this.onChange(val);
	  this.onTouched();
	}
      
	constructor() {}
      
	async ngOnInit() {
	  this.renderRateyo();
	}
      
	ngOnChanges(changes: SimpleChanges) {
	  if (changes.options?.currentValue) {
	    this.renderRateyo(changes.options.currentValue);
	  }
	}
      
	async renderRateyo(options: RateyoOptions = this.options) {
	  
	  await awaiterWhile(() => this.rateyo?.nativeElement);
	  if (this.$rateyo) return;
      
	  const rateyoOptions: RateyoOptionsWithEvents = {
	    starWidth: options.starWidth || '20px',
	    normalFill: options.normalFill || '#A0A0A0',
	    ratedFill: options.ratedFill || '#E7E73C',
	    rating: this.value || 0,
	    spacing: options.spacing || '5px',
	    numStars: options.numStars || 5,
	    multiColor: options.multiColor || null,
	    maxValue: options.numStars || 5,
	    precision: options.precision || 1,
	    halfStar: options.halfStar || false,
	    fullStar: options.fullStar || false,
	    readOnly: this.disabled,
	    rtl: options.rtl || false,
	    onInit: (value) => {
	      this.init.emit(value)
	    },
	    onSet: (value) => {
	      this.writeValue(value);
	      this.set.emit(value)
	    },
	    onChange: (value) => {
	      this.hover.emit(value)
	    }
	  }
      
	  this.$rateyo = $(this.rateyo.nativeElement).rateYo(rateyoOptions as RateyoOptions);
	}
      
	writeValue(value: number): void {
	  this.value = value;
	}
      
	// Allows Angular to register a function to call when the model (rating) changes.
	// Save the function as a property to call later here.
	registerOnChange(fn: (value: number) => void): void {
	  this.onChange = fn;
	}
	// Allows Angular to register a function to call when the input has been touched.
	// Save the function as a property to call later here.
	registerOnTouched(fn: () => void): void {
	  this.onTouched = fn;
	}
	// Allows Angular to disable the input.
	setDisabledState(isDisabled: boolean): void {
	  this.disabled = isDisabled;
      
	  if (!this.$rateyo) {
	    this.renderRateyo();
	  } else if (this.rateyo?.nativeElement) {
	    $(this.rateyo?.nativeElement).rateYo("option", "readonly", this.disabled);
	  }
      
	}
      
	onChange = (value: number) => { };
	onTouched = () => { };
      
      }
      