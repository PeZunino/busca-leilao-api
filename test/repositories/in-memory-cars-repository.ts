import { CarsRepository } from '@/domain/auctioneer/application/repositories/car.repository';
import { Car } from '@/domain/auctioneer/enterprise/entities/vehicle/car';

export class InMemoryCarsRepository implements CarsRepository{
	public items:Car[] = [];
	
	async create(car: Car): Promise<void> {
		this.items.push(car);
	}
}