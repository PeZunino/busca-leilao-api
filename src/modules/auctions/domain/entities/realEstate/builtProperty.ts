import z from 'zod';
import { createBuiltPropertyValidationSchema, createRealEstateValidationSchema } from '@/core/validation/real-estate.validator';
import { UniqueID } from '../../valueObjects/uniqueId';
import { RealEstate,RealEstateProps } from './realEstate';
interface BuiltPropertyProps extends RealEstateProps {
	hasGarage: boolean;
	numberOfBedrooms: number;
}

export class BuiltProperty extends RealEstate<BuiltPropertyProps> {

	public static create(props: BuiltPropertyProps, id?: UniqueID): BuiltProperty {
		try {
			createRealEstateValidationSchema.parse(props);

			createBuiltPropertyValidationSchema.parse(props);

			return new BuiltProperty(props, id);

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