import { BuiltPropertyDTO } from '../../application/dto/create-built.dto';
import { CreateCarDTO } from '../../application/dto/create-car.dto';
import { CreateMotorcycleDTO } from '../../application/dto/create-motorcycle.dto';
import { UnbuiltPropertyDTO } from '../../application/dto/create-unbuilt.dto';
import { BuiltProperty } from '../entities/realEstate/builtProperty';
import { UnbuiltProperty } from '../entities/realEstate/unbuiltProperty';
import { Car } from '../entities/vehicle/car';
import { Motorcycle} from '../entities/vehicle/motorcycle';
import { Address } from '../valueObjects/address';
import { Area, AreaUnit } from '../valueObjects/area';
import { Real } from '../valueObjects/real';

export type CreateGoodDTO = 
  | { type: GoodType.CAR;
  	data: CreateCarDTO }
  | { type: GoodType.MOTORCYCLE;
  	data: CreateMotorcycleDTO }
  | { type: GoodType.BUILT_PROPERTY;
  	data: BuiltPropertyDTO }
  | { type: GoodType.UNBUILT_PROPERTY;
  	data: UnbuiltPropertyDTO };



export type GoodObject = Car | Motorcycle | BuiltProperty | UnbuiltProperty;

export enum GoodType {
	CAR = 'car',
	MOTORCYCLE = 'motorcycle',
	BUILT_PROPERTY = 'built',
	UNBUILT_PROPERTY = 'unbuilt'
}

export class GoodFactory {
	static create(input: CreateGoodDTO): GoodObject {
		switch(input.type) {
			case GoodType.CAR:
				return Car.create({
					brand:input.data.brand,
					color:input.data.color,
					forCirculation:input.data.forCirculation,
					fuel:input.data.fuel,
					gearbox:input.data.gearbox,
					hasAirConditioning:input.data.hasAirConditioning,
					hasArmor:input.data.hasArmor,
					hasKeys:input.data.hasKeys,
					hasSpareTire:input.data.hasSpareTire,
					licensePlate:input.data.licensePlate,
					mileage:input.data.mileage,
					model:input.data.model,
					mount:input.data.mount,
					numberOfDoors:input.data.numberOfDoors,
					steeringType:input.data.steeringType,
					type:input.data.type,
					version:input.data.version,
					year:input.data.year,
					yearModel:input.data.yearModel
				});
      
			case GoodType.MOTORCYCLE:
				return Motorcycle.create({
					brand:input.data.brand,
					color:input.data.color,
					forCirculation:input.data.forCirculation,
					fuel:input.data.fuel,
					hasKeys:input.data.hasKeys,
					licensePlate:input.data.licensePlate,
					mileage:input.data.mileage,
					model:input.data.model,
					mount:input.data.mount,
					version:input.data.version,
					year:input.data.year,
					yearModel:input.data.yearModel
				});
      
			case GoodType.BUILT_PROPERTY:
				return BuiltProperty.create({
					address:Address.create(input.data.address),
					allowVisits:input.data.allowVisits,
					builtArea:Area.create({
						unit: AreaUnit.SQUARE_METERS,
						value:input.data.builtArea.value
					}),
					debits:Real.create(input.data.debits),
					fieldArea:Area.create({
						unit: AreaUnit.SQUARE_METERS,
						value:input.data.fieldArea.value
					}),
					hasGarage:input.data.hasGarage,
					isOccupied:input.data.isOccupied,
					lawsuit:input.data.lawsuit,
					numberOfBedrooms:input.data.numberOfBedrooms,
					privateArea:Area.create({
						unit: AreaUnit.SQUARE_METERS,
						value:input.data.privateArea.value
					}),
					registration:input.data.registration,
					totalArea:Area.create({
						unit: AreaUnit.SQUARE_METERS,
						value:input.data.totalArea.value
					}),
					complement:input.data.complement,
					distanceToMetro:input.data.distanceToMetro
				});
      
			case GoodType.UNBUILT_PROPERTY:
				return UnbuiltProperty.create({
					address:Address.create(input.data.address),
					allowVisits:input.data.allowVisits,
					builtArea:Area.create({
						unit: AreaUnit.SQUARE_METERS,
						value:input.data.builtArea.value
					}),
					debits:Real.create(input.data.debits),
					fieldArea:Area.create({
						unit: AreaUnit.SQUARE_METERS,
						value:input.data.fieldArea.value
					}),
					isOccupied:input.data.isOccupied,
					lawsuit:input.data.lawsuit,
					privateArea:Area.create({
						unit: AreaUnit.SQUARE_METERS,
						value:input.data.privateArea.value
					}),
					registration:input.data.registration,
					totalArea:Area.create({
						unit: AreaUnit.SQUARE_METERS,
						value:input.data.totalArea.value
					}),
					complement:input.data.complement,
					distanceToMetro:input.data.distanceToMetro,
					hasWaterAccess: input.data.hasWaterAccess,
					isUrban: input.data.isUrban
				});
      
			default:
				throw new Error(`Invalid good type: ${(input as any).type}`);
		}
	}
}