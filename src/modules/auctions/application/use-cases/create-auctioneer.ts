import { Injectable } from '@nestjs/common';
import { Either, success } from '@/core/either';
import { Auctioneer } from '../../domain/entities/auctioneer';
import { Address } from '../../domain/valueObjects/address';
import { Email } from '../../domain/valueObjects/email';
import { PhoneNumber } from '../../domain/valueObjects/phone';
import { Website } from '../../domain/valueObjects/website';
import { CreateAuctioneerUseCaseRequest } from '../dto/create-auctioneer.dto';
import { AuctioneersRepository } from '../repositories/auctioneer.repository';

type CreateAuctioneerUseCaseResponse = Either<null,{auctioneer:Auctioneer}>

@Injectable()
export class CreateAuctioneerUseCase{

	constructor(
		private auctioneersRepository: AuctioneersRepository,
	){}

	async execute(props:CreateAuctioneerUseCaseRequest):Promise<CreateAuctioneerUseCaseResponse>{
		const email = Email.create(props.email); 

		const phoneNumber = PhoneNumber.create(props.phoneNumber); 

		const address = Address.create({
			cep: props.cep,
			city: props.city,
			neighborhood: props.neighborhood,
			number: props.number,
			state: props.state,
			street: props.street,
		});

		const websites = props.websites.map(url => Website.create(url));
 
		const auctioneer = Auctioneer.create({
			address,
			email,
			name:props.name,
			phoneNumber,
			registrationCode:props.registrationCode,
			websites
		});

		await this.auctioneersRepository.create(auctioneer);

		return success({auctioneer});
	}
}