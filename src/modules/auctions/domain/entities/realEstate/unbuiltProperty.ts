import z from 'zod';
import { createRealEstateValidationSchema, createUnbuiltPropertyValidationSchema } from '@/core/validation/real-estate.validator';
import { UniqueID } from '../../valueObjects/uniqueId';
import { RealEstate, RealEstateProps } from './realEstate';
interface UnbuiltPropertyProps extends RealEstateProps {
	isUrban: boolean;
	hasWaterAccess: boolean;
}

export class UnbuiltProperty extends RealEstate {
	private constructor(protected readonly props: UnbuiltPropertyProps, id?: UniqueID) {
		super(props, id);
	}

	public static create(input: UnbuiltPropertyProps, id?: UniqueID): UnbuiltProperty {
		try {
			createRealEstateValidationSchema.parse(input);

			createUnbuiltPropertyValidationSchema.parse(input);

			return new UnbuiltProperty({
				address:input.address,
				allowVisits:input.allowVisits,
				builtArea:input.builtArea,
				debits:input.debits,
				fieldArea:input.fieldArea,
				hasWaterAccess:input.hasWaterAccess,
				isOccupied:input.isOccupied,
				isUrban:input.isUrban,
				lawsuit:input.lawsuit,
				privateArea:input.privateArea,
				registration:input.registration,
				totalArea:input.totalArea,
				complement:input.complement,
				distanceToMetro:input.distanceToMetro
			}, id);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Zod Unbuilt Property creation validation failed: ${error}`);
			}

			throw new Error(`Unbuilt Property creation failed: ${error.message || 'Unknown error'}`);
		}
	}

	get isUrban(): boolean {
		return this.props.isUrban; 
	}
	get hasWaterAccess(): boolean {
		return this.props.hasWaterAccess; 
	}

	public calculateMarketValue(): number {
		return this.totalArea.toSquareMeters() * (this.isUrban ? 1500 : 500) + (this.hasWaterAccess ? 10000 : 0);
	}

	public getType(): string {
		return 'UnbuiltProperty';
	}
}