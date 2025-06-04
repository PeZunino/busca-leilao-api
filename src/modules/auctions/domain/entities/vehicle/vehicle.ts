import { Entity } from '../../../../../core/shared/entity';
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
	createdAt:Date;
	updatedAt?:Date | null;
}

export abstract class Vehicle<Props> extends Entity<VehicleProps & Props>{

	get category(){
		return this.category;
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
	get createdAt(){
		return this.props.createdAt;
	}
	get updatedAt(){
		return this.props.updatedAt;
	}
}