import z from 'zod';
import { UniqueID } from '@/domain/valueObjects/uniqueId';
import { Good, GoodProps } from '../good';

export interface VehicleProps extends GoodProps { 
	origin: string;
	mount: string;
	mileage: number;
	hasKeys: boolean;
	licensePlate: string;
	color: string;
	brand: string;
	model: string;
	version: string;
	year: number;
	yearModel: number;
	forCirculation: boolean;
	fuel: string;
}

export interface VehicleInput {
	startingBid: number; 
	description: string;
	observation?: string;
	initialValue: number; 
	origin: string;
	mount: string;
	mileage: number;
	hasKeys: boolean;
	licensePlate: string;
	color: string;
	brand: string;
	model: string;
	version: string;
	year: number;
	yearModel: number;
	forCirculation: boolean;
	fuel: string;
}

export const baseVehicleInputSchema = z.object({
	startingBid: z.number(), 
	description: z.string()
		.min(10, 'Description must be at least 10 characters'),
	observation: z.string()
		.optional(),
	initialValue: z.number(), 
	origin: z.string()
		.min(3, 'Origin must be at least 3 characters'),
	mount: z.string()
		.min(3, 'Mount must be at least 3 characters'),
	mileage: z.number()
		.int()
		.nonnegative('Mileage must be a non-negative integer'),
	hasKeys: z.boolean(),
	licensePlate: z.string()
		.regex(/^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i, 'Invalid license plate format'),
	color: z.string()
		.min(2, 'Color must be at least 2 characters'),
	brand: z.string()
		.min(2, 'Brand must be at least 2 characters'),
	model: z.string()
		.min(2, 'Model must be at least 2 characters'),
	version: z.string()
		.min(1, 'Version must be at least 1 character'),
	year: z.number()
		.int()
		.min(1900),
	yearModel: z.number()
		.int()
		.min(1900),
	forCirculation: z.boolean(),
	fuel: z.string()
		.min(2, 'Fuel type must be at least 2 characters')
});

export abstract class Vehicle extends Good {
	protected constructor(protected readonly props: VehicleProps, id?: UniqueID) {
		super(props, id);
	}
	
	public getCategory(): string {
		return 'Vehicle';
	}

	get origin(){
		return this.props.origin;
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