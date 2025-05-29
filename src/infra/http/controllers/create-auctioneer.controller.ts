import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { CreateAuctioneerUseCase } from '@/modules/auctions/application/use-case/create-auctioneer';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createAuctioneerBodySchema = z.object({
	name: z.string(),
	registrationCode: z.string(),
	phone: z.string(),
	email: z.string(),
	website: z.string(),
	street:z.string(),
	number:z.string(),
	cep:z.string(),
	neighborhood: z.string(),
	city: z.string(),
});


const bodyValidationPipe = new ZodValidationPipe(createAuctioneerBodySchema);

type CreateAuctioneerBodySchema = z.infer<typeof createAuctioneerBodySchema>

@Controller('/auctioneers')
export class CreateAuctioneerController{

	constructor(
		private createAuctioneerUseCase: CreateAuctioneerUseCase
	){}

	@Post()
	async handle(
		@Body(bodyValidationPipe) body:CreateAuctioneerBodySchema
	){
		const {
			cep,city,email,name,neighborhood,number,phone,registrationCode,street,website
		} = body;

		const result = await this.createAuctioneerUseCase.execute({
			cep,
			city,
			email,
			name,
			neighborhood,
			number,
			phone,
			registrationCode,
			street,
			website,
		});

		if(result.isFailure()){
			throw new BadRequestException();
		}
	}
}