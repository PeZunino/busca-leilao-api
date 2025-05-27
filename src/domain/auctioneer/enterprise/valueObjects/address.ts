import z from 'zod';

interface Props{
	street:string;
	number:string;
	cep:string;
	neighborhood: string;
	city: string;
	state:string; 
}

export const addressSchema = z.object({
	street: z.string()
		.min(3, 'Street name is too short'),
	number: z.string()
		.min(1, 'Number is required'),
	cep: z.string()
		.regex(/^\d{5}-?\d{3}$/, 'Invalid CEP format')
		.transform(val => val.replace('-', '')),
	neighborhood: z.string()
		.min(3, 'Neighborhood name is too short'),
	city: z.string()
		.min(3, 'City name is too short'),
	state: z.string()
		.length(2, 'State must be a 2-letter abbreviation')
		.toUpperCase(),
});

export class Address{

	private constructor(private readonly props:Props){}

	public static create(props: Omit<Props, 'cep' | 'state'> & { cep: string,
		state: string }): Address {
		try {
			const validatedProps = addressSchema.parse(props);

			return new Address(validatedProps);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Address creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}

			throw new Error(`Address creation failed: ${error.message || 'Unknown error'}`);
		}
	}

	public equals(other:Address):boolean{

		if(!(other instanceof Address)){
			return false;
		}

		return (
			this.props.street === other.props.street &&
      this.props.number === other.props.number &&
      this.props.cep === other.props.cep &&
      this.props.neighborhood === other.props.neighborhood &&
      this.props.city === other.props.city &&
      this.props.state === other.props.state
		);
	}

	get street():string{
		return this.props.street;
	}
	get number():string{
		return this.props.number;
	}
	get cep():string{
		return this.props.cep;
	}
	get neighborhood():string{
		return this.props.neighborhood;
	}
	get city():string{
		return this.props.city;
	}
	get state():string{
		return this.props.state;
	}
}