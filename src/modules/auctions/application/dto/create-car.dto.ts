import { CreateVehicleDTO } from './create-vehicle.dto';

export interface CreateCarDTO extends CreateVehicleDTO{ 
	hasAirConditioning: boolean;
	steeringType: string;
	hasSpareTire: boolean;
	gearbox: string;
	hasArmor: boolean;
	numberOfDoors: number;
	type: string;
}
