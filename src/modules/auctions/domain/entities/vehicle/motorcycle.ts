import z from 'zod';
import { createMotorcycleValidationSchema } from '@/core/validation/vehicle.validator';
import { UniqueID } from '../../valueObjects/uniqueId';
import {Vehicle, VehicleProps } from './vehicle';


type MotorcycleProps = VehicleProps

export class Motorcycle extends Vehicle<MotorcycleProps>{
    
	public static create(props: MotorcycleProps, id?: UniqueID): Motorcycle {
		try {
			createMotorcycleValidationSchema.parse(props);

			return new Motorcycle(props, id);

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