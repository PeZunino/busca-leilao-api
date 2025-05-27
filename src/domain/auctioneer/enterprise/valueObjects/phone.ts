import z from 'zod';

export class PhoneNumber {
	// Regex que extrai DDD, prefixo e sufixo
	private static readonly phoneRegex =
		/^\+?(?:55)?\s*\(?(\d{2})\)?[\s-]*([9]?\d{4})[\s-]?(\d{4})$/;

	private static readonly schema = z
		.string()
		.min(10, 'Phone number too short')
		.max(16, 'Phone number too long')
		.refine((val) => {
			const match = val.match(PhoneNumber.phoneRegex);

			if (!match) return false;

			const prefix = match[2]; // Pode ser 91234 ou 1234

			if (prefix.length === 5) {
				// Celular → precisa começar com 9
				return prefix.startsWith('9');
			} else if (prefix.length === 4) {
				// Fixo → não pode começar com 0, 1 ou 5-9
				const firstDigit = prefix[0];

				return [
					'2', '3', '4'
				].includes(firstDigit);
			}

			return false;
		}, { message: 'Invalid Brazilian phone number format' })
		.transform((val) => {
			const match = val.match(PhoneNumber.phoneRegex);

			if (!match) return val;

			const ddd = match[1];

			const prefix = match[2];

			const suffix = match[3];

			return `${ddd}${prefix}${suffix}`; // Ex: 18912345678
		});

	private constructor(private readonly phoneNumber: string) {}

	public static create(phoneNumber: string): PhoneNumber {
		try {
			const validated = PhoneNumber.schema.parse(phoneNumber);

			return new PhoneNumber(validated);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(
					`Phone number creation failed: ${error.errors.map(e => e.message)
						.join(', ')}`
				);
			}

			throw new Error(`Phone number creation failed: ${error.message || 'Unknown error'}`);
		}
	}

	public equals(other: PhoneNumber): boolean {
		return other instanceof PhoneNumber && this.phoneNumber === other.phoneNumber;
	}

	public formatToExhibition(): string {
		const ddd = this.phoneNumber.slice(0, 2);

		const number = this.phoneNumber.slice(2);

		if (number.length === 8) {
			return `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;
		}

		if (number.length === 9) {
			return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
		}

		return this.phoneNumber; // fallback
	}

	get rawNumber(): string {
		return this.phoneNumber;
	}
}
