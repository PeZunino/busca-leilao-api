import { CarsRepository } from '@/modules/auctions/application/repositories/car.repository';
import { Car } from '@/modules/auctions/domain/entities/vehicle/car';

export class InMemoryCarsRepository implements CarsRepository{
	public items:Car[] = [];
	
	async create(car: Car): Promise<void> {
		this.items.push(car);
	}
}