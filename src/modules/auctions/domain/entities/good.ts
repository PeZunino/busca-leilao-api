import { CreateGoodDTO } from '../../application/dto/create-good.dto';
import { BuiltProperty } from './realEstate/builtProperty';
import { UnbuiltProperty } from './realEstate/unbuiltProperty';
import { Car } from './vehicle/car';
import { Motorcycle} from './vehicle/motorcycle';

export enum GoodType {
	CAR = 'car',
	MOTORCYCLE = 'motorcycle',
	BUILT_PROPERTY = 'built',
	UNBUILT_PROPERTY = 'unbuilt'
}

export type GoodObject = Car | Motorcycle | BuiltProperty | UnbuiltProperty;

export class GoodFactory {
	static create(input: CreateGoodDTO): GoodObject {
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