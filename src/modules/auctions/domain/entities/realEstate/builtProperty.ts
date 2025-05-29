import z from 'zod';
import { createBuiltPropertyValidationSchema, createRealEstateValidationSchema } from '@/core/validation/real-estate.validator';
import { UniqueID } from '../../valueObjects/uniqueId';
import { RealEstate,RealEstateProps } from './realEstate';
interface BuiltPropertyProps extends RealEstateProps {
	hasGarage: boolean;
	numberOfBedrooms: number;
}

export class BuiltProperty extends RealEstate {
	private constructor(protected readonly props: BuiltPropertyProps, id?: UniqueID) {
		super(props, id);
	}

	public static create(input: BuiltPropertyProps, id?: UniqueID): BuiltProperty {
		try {
			createRealEstateValidationSchema.parse(input);

			createBuiltPropertyValidationSchema.parse(input);

			return new BuiltProperty({
				address:input.address,
				allowVisits: input.allowVisits,
				builtArea:input.builtArea,
				debits:input.debits,
				fieldArea:input.fieldArea,
				hasGarage: input.hasGarage,
				isOccupied: input.isOccupied,
				lawsuit: input.lawsuit,
				numberOfBedrooms: input.numberOfBedrooms,
				privateArea:input.privateArea,
				registration: input.registration,
				totalArea:input.totalArea,
				complement: input.complement,
				distanceToMetro: input.distanceToMetro
			}, id);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Zod Built Property creation validation failed: ${error}`);
			}

			throw new Error(`Built Property failed: ${error.message || 'Unknown error'}`);
		}
	}

	public getType(): string {
		return 'BuiltProperty';
	}
	
	get hasGarage(): boolean {
		return this.props.hasGarage;
	}

	get numberOfBedrooms(): number {
		return this.props.numberOfBedrooms;
	}

}