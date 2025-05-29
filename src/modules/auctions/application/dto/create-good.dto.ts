import { GoodType } from '../../domain/entities/good';
import { BuiltPropertyDTO } from '../../domain/entities/realEstate/builtProperty';
import { UnbuiltPropertyDTO } from '../../domain/entities/realEstate/unbuiltProperty';
import { MotorcycleDTO } from '../../domain/entities/vehicle/motorcycle';
import { CreateCarDTO } from './create-car.dto';

export type CreateGoodDTO = 
  | { type: GoodType.CAR;
  	data: CreateCarDTO }
  | { type: GoodType.MOTORCYCLE;
  	data: MotorcycleDTO }
  | { type: GoodType.BUILT_PROPERTY;
  	data: BuiltPropertyDTO }
  | { type: GoodType.UNBUILT_PROPERTY;
  	data: UnbuiltPropertyDTO };