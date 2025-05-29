import z from 'zod';

export class Email {
	private static readonly schema = z.string()
		.email('Invalid email format');

	private constructor(private readonly emailValue:string) {}

	public static create(email:string): Email {
		try {
			const validatedEmail = Email.schema.parse(email); 

			const formattedEmail = validatedEmail.toLowerCase()
				.trim();

			return new Email(formattedEmail);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Email creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}

			throw new Error(`Email creation failed: ${error.message || 'Unknown error'}`); 
		}
	}

	public equals(other: Email): boolean {
		if (!(other instanceof Email)) return false;

		return this.emailValue === other.emailValue;
	}

	get address(): string {
		return this.emailValue;
	}

}
