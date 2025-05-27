import { success } from '@/core/either';
import { Car } from '../../enterprise/entities/vehicle/car';
import { CarsRepository } from '../repositories/car.repository';

interface CreateCarUseCaseRequest{
	origin :string
	mount :string
	mileage :number
	hasKeys :boolean        
	licensePlate :string         
	color :string
	brand :string
	model :string
	version :string
	year:Date
	yearModel :Date            
	forCirculation :boolean        
	fuel :string
	hasAirConditioning :boolean       
	steeringType :string        
	hasSpareTire :boolean       
	gearbox :string
	hasArmor :boolean       
	numberOfDoors :number           
	type :string 
	description:string
	observation:string
	initialValue:number 
	startingBid:number
}

export class CreateCarUseCase{
	constructor(
		private carRepository: CarsRepository
	){}

	async execute(props:CreateCarUseCaseRequest){
		const car = Car.create({
			brand: props.brand,
			color: props.color,
			description: props.description,
			forCirculation: props.forCirculation,
			fuel: props.fuel,
			gearbox: props.gearbox,
			hasAirConditioning: props.hasAirConditioning,
			hasArmor: props.hasArmor,
			hasKeys: props.hasKeys,
			hasSpareTire: props.hasSpareTire,
			initialValue: props.initialValue,
			licensePlate: props.licensePlate,
			mileage: props.mileage,
			model: props.model,
			mount: props.mount,
			numberOfDoors: props.numberOfDoors,
			origin: props.origin,
			startingBid: props.startingBid,
			steeringType: props.steeringType,
			version: props.version,
			year: props.year,
			yearModel: props.yearModel,
			observation: props.observation,
			type:props.type
		});

		await this.carRepository.create(car);

		return success({car});
	}
}