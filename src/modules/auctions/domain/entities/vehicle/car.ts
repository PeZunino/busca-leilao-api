import z from 'zod';
import { createCarValidationSchema } from '@/core/validation/vehicle.validator';
import { UniqueID } from '../../valueObjects/uniqueId';
import {Vehicle, VehicleProps } from './vehicle';


interface CarProps extends VehicleProps { 
	hasAirConditioning: boolean;
	steeringType: string;
	hasSpareTire: boolean;
	gearbox: string;
	hasArmor: boolean;
	numberOfDoors: number;
	type: string; 
}

export class Car extends Vehicle<CarProps>{

	public static create(props: CarProps, id?: UniqueID): Car { 
		try {
		
			createCarValidationSchema.parse(props);

			return new Car(props, id);
			
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Zod Car creation validation failed: ${error}`);
			}

			throw new Error(`Car creation failed: ${error.message || 'Unknown error'}`);
		}
	}

	get mount(){
		return this.props.mount;
	}

	get hasAirConditioning(){
		return this.props.hasAirConditioning;
	}

	get steeringType(){
		return this.props.steeringType;
	}

	get hasSpareTire(){
		return this.props.hasSpareTire;
	}

	get gearbox(){
		return this.props.gearbox;
	}

	get type(){
		return this.props.type;
	}

	get hasArmor(){
		return this.props.hasArmor;
	}

	get numberOfDoors(){
		return this.props.numberOfDoors;
	}

}