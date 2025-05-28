import { MakeAuction } from 'test/factories/make-auction';
import { InMemoryAuctionsRepository } from 'test/repositories/in-memory-auctions-repository';
import { CreateAuctionUseCase } from './create-auction';

describe('Create Auction', ()=>{
	it('should be able to create a auction', async()=>{
		const inMemoryAuctionsRepository = new InMemoryAuctionsRepository();

		const sut = new CreateAuctionUseCase(inMemoryAuctionsRepository);

		const makeAuction = new MakeAuction();

		const auction = makeAuction.execute();

		const result = await sut.execute({
			auctioneerId: auction.auctioneerId,
			committeeId: auction.auctioneerId,
			items:auction.items,
			openDates:auction.openDates,
			publicationDate: auction.publicationDate,
			metaData:auction.metaData,
		});

		expect(result.isSuccessful())
			.toBe(true);

		expect(result.value)
			.toEqual({auction: inMemoryAuctionsRepository.items[0]});
	});
});