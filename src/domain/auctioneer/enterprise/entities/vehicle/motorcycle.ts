import z from 'zod';
import { applyVehicleTransformsAndRefines } from '@/shared/vehicleSchema';
import { UniqueID } from '../../valueObjects/uniqueId';
import { baseVehicleInputSchema, Vehicle, VehicleDTO, VehicleProps } from './vehicle';

export type MotorcycleProps = VehicleProps

export type MotorcycleDTO = VehicleDTO

const motorcycleSpecificInputSchema = z.object({});

export const fullMotorcycleSchema = applyVehicleTransformsAndRefines(
	baseVehicleInputSchema.extend(motorcycleSpecificInputSchema.shape)
);

export class Motorcycle extends Vehicle{
	private constructor(protected readonly props: MotorcycleProps, id?: UniqueID) {
		super(props, id);
	}
    
	public static create(input: MotorcycleDTO, id?: UniqueID): Motorcycle {
		try {
			fullMotorcycleSchema.parse(input);

			return new Motorcycle({
				brand:input.brand,
				color:input.color,
				forCirculation:input.forCirculation,
				fuel:input.fuel,
				hasKeys:input.hasKeys,
				licensePlate:input.licensePlate,
				mileage:input.mileage,
				model:input.model,
				mount:input.mount,
				version:input.version,
				year:input.year,
				yearModel:input.yearModel
			}, id);
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