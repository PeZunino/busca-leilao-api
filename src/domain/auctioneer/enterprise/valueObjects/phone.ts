import z from 'zod';

export class PhoneNumber{
	private static readonly brazilPhoneRegex = /^\+?(?:55)?\s*\(?(\d{2})\)?\s*(9\d{4}|\d{4})[\s-]?(\d{4})$/;

	
	private static readonly schema = z.string()
		.min(10, 'Phone number too short')
		.max(15, 'Phone number too long')
		.refine((val) => PhoneNumber.brazilPhoneRegex.test(val), {message: 'Invalid Brazilian phone number format',})
		.transform((val) => {
			const match = val.match(PhoneNumber.brazilPhoneRegex);

			if (match) {
				return `${match[1]}${match[2] || ''}${match[3] || ''}`;
			}

			return val; // Fallback
		});
    
	private constructor(private readonly phoneNumber:string){}

	public static create(phoneNumber: string): PhoneNumber {
		try {
			const validatedAndTransformedNumber = PhoneNumber.schema.parse(phoneNumber);

			return new PhoneNumber(validatedAndTransformedNumber);

		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Phone number creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}

			throw new Error(`Phone number creation failed: ${error.message || 'Unknown error'}`);
		}
	}

	public equals(other: PhoneNumber): boolean {
		if (!(other instanceof PhoneNumber)) return false;

		return this.phoneNumber === other.phoneNumber;
	}

	public formatToExhibition(): string {
		const ddd = this.phoneNumber.substring(0, 2);

		const number = this.phoneNumber;

		const isLandline = number.length === 8;
 
		if (isLandline) { 
			return `(${ddd}) ${number.substring(0, 4)}-${number.substring(4)}`;
		} else if (number.length === 9) {
			return `(${ddd}) ${number.substring(0, 5)}-${number.substring(5)}`;
		}

		return this.phoneNumber; // Fallback
	}
  
	get rawNumber():string{
		return this.phoneNumber;
	}
}