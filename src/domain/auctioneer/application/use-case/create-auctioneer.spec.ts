import { before } from 'node:test';
import { makeAuctioneer } from 'test/factories/make-auctioneer';
import { InMemoryAuctioneerRepository } from 'test/repositories/in-memory-auctioneers-repository';
import { CreateAuctioneerUseCase } from './create-auctioneer';

let inMemoryAuctioneerRepository:InMemoryAuctioneerRepository;

let sut:CreateAuctioneerUseCase;

describe('Create Auctioneer',()=>{
	before(()=>{

	});

	it('should be able to create a auctioneer', async()=>{
		inMemoryAuctioneerRepository = new InMemoryAuctioneerRepository();

		sut = new CreateAuctioneerUseCase(inMemoryAuctioneerRepository);

		const auctioneer = makeAuctioneer();
		
		const result = await sut.execute(auctioneer);
	
		expect(result.isSuccessful())
			.toBe(true);

		expect(result.value)
			.toEqual({auctioneer: inMemoryAuctioneerRepository.items[0]});
	});
});