import z from 'zod';
import { createRealEstateValidationSchema, createUnbuiltPropertyValidationSchema } from '@/core/validation/real-estate.validator';
import { UniqueID } from '../../valueObjects/uniqueId';
import { RealEstate, RealEstateProps } from './realEstate';
interface UnbuiltPropertyProps extends RealEstateProps {
	isUrban: boolean;
	hasWaterAccess: boolean;
}

export class UnbuiltProperty extends RealEstate<UnbuiltPropertyProps> {
	private constructor(protected readonly props: UnbuiltPropertyProps, id?: UniqueID) {
		super(props, id);
	}

	public static create(props: UnbuiltPropertyProps, id?: UniqueID): UnbuiltProperty {
		try {
			createRealEstateValidationSchema.parse(props);

			createUnbuiltPropertyValidationSchema.parse(props);

			return new UnbuiltProperty(props, id);
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