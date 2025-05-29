import z from 'zod';
import { Entity } from '../../../../../core/shared/entity';
import { UniqueID } from '../../valueObjects/uniqueId';
export interface VehicleProps{ 
	mount: string;
	mileage: number;
	hasKeys: boolean;
	licensePlate: string;
	color: string;
	brand: string;
	model: string;
	version: string;
	year: Date;
	yearModel: Date;
	forCirculation: boolean;
	fuel: string;
}



export const baseVehicleInputSchema = z.object({

	mount: z.string()
		.min(3, 'Mount must be at least 3 characters'),
	mileage: z.number()
		.nonnegative('Mileage must be a non-negative integer'),
	hasKeys: z.boolean(),
	licensePlate: z.string(),
	color: z.string()
		.min(2, 'Color must be at least 2 characters'),
	brand: z.string()
		.min(2, 'Brand must be at least 2 characters'),
	model: z.string()
		.min(2, 'Model must be at least 2 characters'),
	version: z.string()
		.min(1, 'Version must be at least 1 character'),
	year: z.date()
		.refine((date) => date.getFullYear() >= 1900, {message: 'Year must be 1900 or later'}),
	yearModel: z.date()
		.refine((date) => date.getFullYear() >= 1900, {message: 'Year model must be 1900 or later'}),
	forCirculation: z.boolean(),
	fuel: z.string()
		.min(2, 'Fuel type must be at least 2 characters')
});

export abstract class Vehicle extends Entity<VehicleProps>{
	protected constructor(protected readonly props: VehicleProps, id?: UniqueID) {
		super(props, id);
	}
	
	public getCategory(): string {
		return 'Vehicle';
	}
	get mount(){
		return this.props.mount;
	}

	get mileage(){
		return this.props.mileage;
	}

	get hasKeys(){
		return this.props.hasKeys;
	}

	get licensePlate(){
		return this.props.licensePlate;
	}

	get color(){
		return this.props.color;
	}

	get brand(){
		return this.props.brand;
	}

	get model(){
		return this.props.model;
	}

	get version(){
		return this.props.version;
	}

	get year(){
		return this.props.year;
	}

	get yearModel(){
		return this.props.yearModel;
	}

	get forCirculation(){
		return this.props.forCirculation;
	}

	get fuel(){
		return this.props.fuel;
	}
  
}