export interface CreateVehicleDTO { 
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