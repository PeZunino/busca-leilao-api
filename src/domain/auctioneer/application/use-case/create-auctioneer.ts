import { Injectable } from '@nestjs/common';
import { Either, success } from '@/core/either';
import { Auctioneer } from '../../enterprise/entities/auctioneer';
import { AuctioneersRepository } from '../repositories/auctioneer.repository';

interface CreateAuctioneerUseCaseRequest{
	name: string;
	registrationCode: string;
	phone: string;
	email: string;
	website: string;
	street:string
	number:string
	cep:string
	neighborhood: string;
	city: string;
}


type CreateAuctioneerUseCaseResponse = Either<null,{auctioneer:Auctioneer}>

@Injectable()
export class CreateAuctioneerUseCase{


	constructor(
		private auctioneerRepository: AuctioneersRepository
	){}

	async execute({
		email,name,phone,registrationCode,website,cep,city,neighborhood,number,street
	}:CreateAuctioneerUseCaseRequest):Promise<CreateAuctioneerUseCaseResponse>{
		const auctioneer = Auctioneer.create({
			cep,
			city,
			neighborhood,
			number,
			street,
			email,
			name,
			phone,
			registrationCode,
			website
		});

		await this.auctioneerRepository.create(auctioneer);

		return success({auctioneer});
	}
}