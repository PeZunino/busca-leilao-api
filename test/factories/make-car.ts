import { Car } from '@/domain/auctioneer/enterprise/entities/vehicle/car';
import { Fabric } from './fabric';

export class MakeCar extends Fabric{
	execute(){
		return Car.create({
			brand: this.faker.vehicle.manufacturer(),
			color: this.faker.vehicle.color(),
			description: this.faker.lorem.sentence(),
			forCirculation: this.faker.datatype.boolean(),
			fuel: this.faker.vehicle.fuel(),
			gearbox: this.faker.lorem.word({length:5}),
			hasAirConditioning:this.faker.datatype.boolean(),
			hasArmor:this.faker.datatype.boolean(),
			hasKeys:this.faker.datatype.boolean(),
			hasSpareTire:this.faker.datatype.boolean(),
			initialValue: this.faker.number.float({
				min: 2000,
				max: 40000,
				fractionDigits: 2 
			}),
			licensePlate: this.faker.vehicle.vrm(),
			mileage: this.faker.number.float({
				min: 10,
				max: 40000,
				fractionDigits: 3 
			}),
			model: this.faker.vehicle.vehicle(),
			mount: this.faker.lorem.word(),
			numberOfDoors: this.faker.number.int({
				max:4,
				min:2
			}),
			origin:this.faker.lorem.word({length:5}),
			startingBid:this.faker.number.float({
				min: 2000,
				max: 40000,
				fractionDigits: 2 
			}),
			steeringType:this.faker.lorem.word(),
			type:this.faker.vehicle.type(),
			version: this.faker.vehicle.model(),
			year:this.faker.date.past({refDate:'2020-01-01T00:00:00.000Z'}),
			yearModel: this.faker.date.future({refDate:'2020-01-01T00:00:00.000Z'}),
			observation: this.faker.lorem.sentence(),
		});
	}
}
