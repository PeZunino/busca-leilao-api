import { z } from 'zod';

export enum Currency {
	BRL = 'BRL', 
	USD = 'USD', 
	EUR = 'EUR', 
	
}

const RealInputSchema = z.number()
	.min(0, 'Value cannot be negative') 
	.max(999999999999.99, 'Value exceeds maximum allowed') 
	.refine(value => {
		const decimalPlaces = (value.toString()
			.split('.')[1] || '').length;

		return decimalPlaces <= 2;
	}, {message: 'Value can have at most 2 decimal places for cents',});

const CentsSchema = z.number()
	.int()
	.nonnegative('Cents value cannot be negative');

export class Real {
	private readonly cents: number;
	private readonly _currency: Currency;

	private constructor(cents: number, currency: Currency = Currency.BRL) {
		this.cents = CentsSchema.parse(cents); 

		this._currency = currency;
	}

	public static create(value: number, currency: Currency = Currency.BRL): Real {
		RealInputSchema.parse(value); 

		const cents = Math.round(value * 100);

		return new Real(cents, currency);
	}

	public static fromCents(cents: number, currency: Currency = Currency.BRL): Real {
		return new Real(cents, currency);
	}

	public equals(other: Real): boolean {
		if (!(other instanceof Real)) {
			return false;
		}

		return this.cents === other.cents && this._currency === other.currency;
	}

	public toValue(): number {
		return this.cents / 100;
	}

	public toCents(): number {
		return this.cents;
	}

	public add(other: Real): Real {
		if (this._currency !== other.currency) {
			throw new Error('Cannot add Real values of different currencies.');
		}

		return new Real(this.cents + other.cents, this._currency);
	}

	public subtract(other: Real): Real {
		if (this._currency !== other.currency) {
			throw new Error('Cannot subtract Real values of different currencies.');
		}

		return new Real(this.cents - other.cents, this._currency);
	}

	public multiply(factor: number): Real {
		
		return new Real(Math.round(this.cents * factor), this._currency);
	}

	public divide(divisor: number): Real {
		if (divisor === 0) {
			throw new Error('Cannot divide Real value by zero.');
		}

		return new Real(Math.round(this.cents / divisor), this._currency);
	}

	public format(locale: string = 'pt-BR'): string {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: this._currency.toString(),
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})
			.format(this.toValue());
	}

	get currency(): Currency {
		return this._currency;
	}

	public isZero(): boolean {
		return this.cents === 0;
	}

	public isPositive(): boolean {
		return this.cents > 0;
	}

	public isNegative(): boolean {
		return this.cents < 0;
	}
}