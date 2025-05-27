import { MakeAuctioneer } from 'test/factories/make-auctioneer';
import { InMemoryAuctioneerRepository } from 'test/repositories/in-memory-auctioneers-repository';
import { CreateAuctioneerUseCase } from './create-auctioneer';

describe('Create Auctioneer',()=>{

	it('should be able to create a auctioneer', async()=>{
		const inMemoryAuctioneerRepository = new InMemoryAuctioneerRepository();

		const sut = new CreateAuctioneerUseCase(inMemoryAuctioneerRepository);

		const makeAuctioneer = new MakeAuctioneer();
		
		const auctioneer = makeAuctioneer.execute();

		const result = await sut.execute({
			cep: auctioneer.address.cep,
			city: auctioneer.address.city,
			email: auctioneer.email.address,
			name: auctioneer.name,
			neighborhood: auctioneer.address.neighborhood,
			number: auctioneer.address.number,
			phoneNumber: auctioneer.phoneNumber.rawNumber,
			registrationCode: auctioneer.registrationCode,
			state: auctioneer.address.state,
			street: auctioneer.address.street,
			websites: auctioneer.websites.map(website=>website.url.toString())
		});
	
		expect(result.isSuccessful())
			.toBe(true);

		expect(result.value)
			.toEqual({auctioneer: inMemoryAuctioneerRepository.items[0]});
	});
});