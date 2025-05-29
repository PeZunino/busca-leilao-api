import { BuiltProperty, BuiltPropertyDTO } from './realEstate/builtProperty';
import { UnbuiltProperty, UnbuiltPropertyDTO } from './realEstate/unbuiltProperty';
import { Car, CarDTO } from './vehicle/car';
import { Motorcycle, MotorcycleDTO } from './vehicle/motorcycle';

export enum GoodType {
	CAR = 'car',
	MOTORCYCLE = 'motorcycle',
	BUILT_PROPERTY = 'built',
	UNBUILT_PROPERTY = 'unbuilt'
}

export type GoodObject = Car | Motorcycle | BuiltProperty | UnbuiltProperty;

export type GoodDTO = 
  | { type: GoodType.CAR;
  	data: CarDTO }
  | { type: GoodType.MOTORCYCLE;
  	data: MotorcycleDTO }
  | { type: GoodType.BUILT_PROPERTY;
  	data: BuiltPropertyDTO }
  | { type: GoodType.UNBUILT_PROPERTY;
  	data: UnbuiltPropertyDTO };

export class GoodFactory {
	static create(input: GoodDTO): GoodObject {
		switch(input.type) {
			case GoodType.CAR:
				return Car.create(input.data);
      
			case GoodType.MOTORCYCLE:
				return Motorcycle.create(input.data);
      
			case GoodType.BUILT_PROPERTY:
				return BuiltProperty.create(input.data);
      
			case GoodType.UNBUILT_PROPERTY:
				return UnbuiltProperty.create(input.data);
      
			default:
				throw new Error(`Invalid good type: ${(input as any).type}`);
		}
	}
}