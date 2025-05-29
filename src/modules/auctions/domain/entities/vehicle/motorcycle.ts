import z from 'zod';
import { createMotorcycleValidationSchema } from '@/core/validation/vehicle.validator';
import { UniqueID } from '../../valueObjects/uniqueId';
import {Vehicle, VehicleProps } from './vehicle';


type MotorcycleProps = VehicleProps

export class Motorcycle extends Vehicle{
	private constructor(protected readonly props: MotorcycleProps, id?: UniqueID) {
		super(props, id);
	}
    
	public static create(input: MotorcycleProps, id?: UniqueID): Motorcycle {
		try {
			createMotorcycleValidationSchema.parse(input);

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
				throw new Error(`Zod Motorcycle creation validation failed: ${error}`);
			}

			throw new Error(`Motorcycle creation failed: ${error.message || 'Unknown error'}`);
		}
	}
	
	public getType(): string {
		return 'Motorcycle';
	}
}