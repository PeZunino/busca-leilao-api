import { CreateAddressDTO } from './create-address.dto';

export interface RealEstateDTO {
	isOccupied: boolean;
	totalArea: { value: number;
		unit: string };
	builtArea: { value: number;
		unit: string };
	privateArea: { value: number;
		unit: string };
	fieldArea: { value: number;
		unit: string };
	debits: number; 
	allowVisits: boolean;
	lawsuit: boolean;
	registration: string;
	address: CreateAddressDTO
	complement?: string;
	distanceToMetro?: number;
}
