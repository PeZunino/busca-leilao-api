import z from 'zod';
import { applyVehicleTransformsAndRefines } from '@/shared/vehicleSchema';
import { UniqueID } from '../../valueObjects/uniqueId';
import { baseVehicleInputSchema, Vehicle, VehicleProps } from './vehicle';

const motorcycleSpecificInputSchema = z.object({});

export const fullMotorcycleSchema = applyVehicleTransformsAndRefines(
	baseVehicleInputSchema.extend(motorcycleSpecificInputSchema.shape)
);

export class Motorcycle extends Vehicle{
	private constructor(protected readonly props: VehicleProps, id?: UniqueID) {
		super(props, id);
	}
    
	public static create(input: z.infer<typeof fullMotorcycleSchema>, id?: UniqueID): Motorcycle {
		try {
			const validatedProps = fullMotorcycleSchema.parse(input);

			return new Motorcycle(validatedProps, id);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Motorcycle creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}

			throw new Error(`Motorcycle creation failed: ${error.message || 'Unknown error'}`);
		}
	}
	
	public getType(): string {
		return 'Motorcycle';
	}
}