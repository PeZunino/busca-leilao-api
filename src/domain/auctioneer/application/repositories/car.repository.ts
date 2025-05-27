import { Car } from '../../enterprise/entities/vehicle/car';

export abstract class CarsRepository{
	abstract create(car:Car):Promise<void>
}