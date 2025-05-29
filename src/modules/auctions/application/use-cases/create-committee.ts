import { Injectable } from '@nestjs/common';
import { success } from '@/core/either';
import { Committee } from '../../domain/entities/committee';
import { CommitteeRepository } from '../repositories/committee.repository';

@Injectable()
export class CreateCommitteeUseCase{
	constructor(
		private committeeRepository: CommitteeRepository
	){}

	async execute(name:string){
		const committee = Committee.create({name});
    
		await this.committeeRepository.create(committee);

		return success({committee});
	}
}