import { Injectable } from '@nestjs/common';
import { Either, success } from '@/core/either';
import { Auctioneer } from '../../enterprise/entities/auctioneer';
import { AuctioneersRepository } from '../repositories/auctioneer.repository';

interface CreateAuctioneerUseCaseRequest{
	name:string
	registrationCode:string 
	phoneNumber:string 
	email:string
	street:string 
	number:string 
	cep:string
	neighborhood:string 
	city:string
	state:string
	websites:string[]
}


type CreateAuctioneerUseCaseResponse = Either<null,{auctioneer:Auctioneer}>

@Injectable()
export class CreateAuctioneerUseCase{

	constructor(
		private auctioneersRepository: AuctioneersRepository,
	){}

	async execute(props:CreateAuctioneerUseCaseRequest):Promise<CreateAuctioneerUseCaseResponse>{
		
		const auctioneer = Auctioneer.create({
			address: {
				cep:props.cep,
				city:props.city,
				neighborhood:props.neighborhood,
				number:props.number,
				state:props.state,
				street:props.street,
			},
			email: props.email,
			name:props.name,
			phoneNumber: props.phoneNumber,
			registrationCode:props.registrationCode,
			websites:props.websites
		});

		await this.auctioneersRepository.create(auctioneer);

		return success({auctioneer});
	}
}