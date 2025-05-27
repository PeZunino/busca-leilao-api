import { MakeCar } from 'test/factories/make-car';
import { InMemoryCarsRepository } from 'test/repositories/in-memory-cars-repository';
import { CreateCarUseCase } from './create-car';


describe('Create Car', async()=>{
	it('should be able to create a Car', async()=>{
		const inMemoryCarsRepository = new InMemoryCarsRepository();

		const sut = new CreateCarUseCase(inMemoryCarsRepository);

		const makeCar = new MakeCar();

		const car = makeCar.execute();

		const result = await sut.execute({
			brand:car.brand,
			color:car.color,
			description:car.description,
			forCirculation:car.forCirculation,
			fuel:car.fuel,
			gearbox:car.gearbox,
			hasAirConditioning:car.hasAirConditioning,
			hasArmor:car.hasArmor,
			hasKeys:car.hasKeys,
			hasSpareTire:car.hasSpareTire,
			initialValue:car.initialValue.toValue(),
			licensePlate:car.licensePlate,
			mileage:car.mileage,
			model:car.model,
			mount:car.mount,
			numberOfDoors:car.numberOfDoors,
			observation:car.observation,
			origin:car.origin,
			startingBid:car.startingBid.toValue(),
			steeringType:car.steeringType,
			type:car.type,
			version:car.version,
			year:car.year,
			yearModel:car.yearModel,
		});

		expect(result.isSuccessful())
			.toBe(true);

		expect(result.value)
			.toEqual({car: inMemoryCarsRepository.items[0]});
	});
});