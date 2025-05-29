import z from 'zod';
import { UniqueID } from '../../valueObjects/uniqueId';
import { baseVehicleInputSchema, Vehicle, VehicleDTO, VehicleProps } from './vehicle';

export interface CarProps extends VehicleProps { 
	hasAirConditioning: boolean;
	steeringType: string;
	hasSpareTire: boolean;
	gearbox: string;
	hasArmor: boolean;
	numberOfDoors: number;
	type: string; 
}

export interface CarDTO extends VehicleDTO{ 
	hasAirConditioning: boolean;
	steeringType: string;
	hasSpareTire: boolean;
	gearbox: string;
	hasArmor: boolean;
	numberOfDoors: number;
	type: string;
}

const carSpecificInputSchema = z.object({
	hasAirConditioning: z.boolean(),
	steeringType: z.string()
		.min(3, 'Steering type must be at least 3 characters'),
	hasSpareTire: z.boolean(),
	gearbox: z.string()
		.min(3, 'Gearbox type must be at least 3 characters'),
	hasArmor: z.boolean(),
	numberOfDoors: z.number()
		.int()
		.positive()
		.min(2)
		.max(5, 'Number of doors must be between 2 and 5'),
	type: z.string()
		.min(2, 'Car type must be at least 2 characters'), 
});

export const fullCarSchema = baseVehicleInputSchema.extend(carSpecificInputSchema.shape);


export class Car extends Vehicle{

	private constructor(protected readonly props: CarProps, id?: UniqueID) {
		super(props, id);
	}
	
	public static create(input: CarDTO, id?: UniqueID): Car { 
		try {
		
			fullCarSchema.parse(input);

			return new Car({
				brand:input.brand,
				color:input.color,
				forCirculation:input.forCirculation,
				fuel:input.fuel,
				gearbox:input.gearbox,
				hasAirConditioning:input.hasAirConditioning,
				hasArmor:input.hasArmor,
				hasKeys:input.hasKeys,
				hasSpareTire:input.hasSpareTire,
				licensePlate:input.licensePlate,
				mileage:input.mileage,
				model:input.model,
				mount:input.mount,
				numberOfDoors:input.numberOfDoors,
				steeringType:input.steeringType,
				type:input.type,
				version:input.version,
				year:input.year,
				yearModel:input.yearModel
			}, id);
			
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Car creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
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