import { makeCommittee } from 'test/factories/make-committee';
import { InMemoryCommitteeRepository } from 'test/repositories/in-memory-committee-repository';
import { CreateCommitteeUseCase } from './create-committee';

let inMemoryCommitteeRepository: InMemoryCommitteeRepository;

let sut:CreateCommitteeUseCase;

describe('Create Committee',()=>{
	it('should be able to create a committee', async ()=>{
		inMemoryCommitteeRepository = new InMemoryCommitteeRepository();

		const committee = makeCommittee();

		sut = new CreateCommitteeUseCase(inMemoryCommitteeRepository);

		const result = await sut.execute(committee.name);

		expect(result.isSuccessful())
			.toBe(true);
    
		expect(result.value)
			.toEqual({committee: inMemoryCommitteeRepository.items[0]});
	});
});