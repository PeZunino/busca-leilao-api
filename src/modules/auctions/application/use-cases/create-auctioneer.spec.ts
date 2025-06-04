import { FakeHasher } from 'test/cryptography/fake-hasher';
import { MakeAuctioneer } from 'test/factories/make-auctioneer';
import { InMemoryAuctioneerRepository } from 'test/repositories/in-memory-auctioneers-repository';
import { CreateAuctioneerUseCase } from './create-auctioneer';

describe('Create Auctioneer',()=>{

	it('should be able to create a auctioneer', async()=>{
		const inMemoryAuctioneerRepository = new InMemoryAuctioneerRepository();

		const fakeHasher = new FakeHasher();

		const sut = new CreateAuctioneerUseCase(fakeHasher,inMemoryAuctioneerRepository);

		const makeAuctioneer = new MakeAuctioneer();
		
		const auctioneer = makeAuctioneer.execute();

		const result = await sut.execute({
			cep: auctioneer.address.cep,
			city: auctioneer.address.city,
			email: auctioneer.email,
			name: auctioneer.name,
			neighborhood: auctioneer.address.neighborhood,
			number: auctioneer.address.number,
			phoneNumber: auctioneer.phoneNumber,
			registrationCode: auctioneer.registrationCode,
			state: auctioneer.address.state,
			street: auctioneer.address.street,
			websites: auctioneer.websites
		});
	
		expect(result.isSuccessful())
			.toBe(true);

		expect(result.value)
			.toEqual({auctioneer: inMemoryAuctioneerRepository.items[0]});
	});
});