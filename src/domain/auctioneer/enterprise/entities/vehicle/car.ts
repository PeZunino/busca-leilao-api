import z from 'zod';
import { applyVehicleTransformsAndRefines } from '@/shared/vehicleSchema';
import { UniqueID } from '../../valueObjects/uniqueId';
import { baseVehicleInputSchema, Vehicle, VehicleProps } from './vehicle';

interface CarProps extends VehicleProps { 
	hasAirConditioning: boolean;
	steeringType: string;
	hasSpareTire: boolean;
	gearbox: string;
	hasArmor: boolean;
	numberOfDoors: number;
	type: string; 
}

interface CarInput extends z.infer<typeof baseVehicleInputSchema> { 
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

export const fullCarSchema = applyVehicleTransformsAndRefines( 
	baseVehicleInputSchema.extend(carSpecificInputSchema.shape)
);

export class Car extends Vehicle{

	private constructor(protected readonly props: CarProps, id?: UniqueID) {
		super(props, id);
	}
	
	public static create(input: CarInput, id?: UniqueID): Car { 
		try {
			
			const validatedProps = fullCarSchema.parse(input);

			return new Car(validatedProps as CarProps, id);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Car creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}

			throw new Error(`Car creation failed: ${error.message || 'Unknown error'}`);
		}
	}

	get origin(){
		return this.props.origin;
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