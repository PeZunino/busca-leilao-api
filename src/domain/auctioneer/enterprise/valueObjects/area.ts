import { z } from 'zod';

export enum AreaUnit {
	SQUARE_METERS = 'm²',
	HECTARES = 'ha',
	ACRES = 'ac',
}

const conversionFactorsToM2: Record<AreaUnit, number> = {
	[AreaUnit.SQUARE_METERS]: 1,
	[AreaUnit.HECTARES]: 10000,
	[AreaUnit.ACRES]: 4046.86,
};

interface AreaProps {
	value: number;
	unit: AreaUnit;
}

export class Area {
	private static readonly schema = z.object({
		value: z.number()
			.positive('Area value must be positive'),
		unit: z.nativeEnum(AreaUnit,{invalid_type_error: 'Invalid area unit'}),
	});

	private constructor(private readonly props: AreaProps) {}

	public static create(value: number, unit: AreaUnit): Area {
		try {
			const validatedProps = Area.schema.parse({
				value,
				unit 
			});

			return new Area(validatedProps);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Area creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}

			throw new Error(`Area creation failed: ${error.message || 'Unknown error'}`);
		}
	}

	public equals(other: Area): boolean {
		if (!(other instanceof Area)) return false;

		return this.toSquareMeters() === other.toSquareMeters();
	}

	public toSquareMeters(): number {
		return this.props.value * conversionFactorsToM2[this.props.unit];
	}

	get value(): number {
		return this.props.value; 
	}
	get unit(): AreaUnit {
		return this.props.unit; 
	}
}