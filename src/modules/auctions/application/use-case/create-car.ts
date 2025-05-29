import { success } from '@/core/either';
import { Car } from '../../domain/entities/vehicle/car';
import { CreateCarDTO } from '../dto/create-car.dto';
import { CarsRepository } from '../repositories/car.repository';

export class CreateCarUseCase{
	constructor(
		private carRepository: CarsRepository
	){}

	async execute(props:CreateCarDTO){
		const car = Car.create({
			brand: props.brand,
			color: props.color,
			forCirculation: props.forCirculation,
			fuel: props.fuel,
			gearbox: props.gearbox,
			hasAirConditioning: props.hasAirConditioning,
			hasArmor: props.hasArmor,
			hasKeys: props.hasKeys,
			hasSpareTire: props.hasSpareTire,
			licensePlate: props.licensePlate,
			mileage: props.mileage,
			model: props.model,
			mount: props.mount,
			numberOfDoors: props.numberOfDoors,
			steeringType: props.steeringType,
			version: props.version,
			year: props.year,
			yearModel: props.yearModel,
			type:props.type
		});

		await this.carRepository.create(car);

		return success({car});
	}
}