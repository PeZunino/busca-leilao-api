import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';
import { CreateAuctioneerUseCase } from '@/modules/auctions/application/use-cases/create-auctioneer';

const createAuctioneerBodySchema = z.object({
	name: z.string(),
	registrationCode: z.string(),
	phone: z.string(),
	email: z.string(),
	websites: z.array(z.string()),
	street:z.string(),
	number:z.string(),
	cep:z.string(),
	neighborhood: z.string(),
	city: z.string(),
	state:z.string()
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
			cep,city,email,name,neighborhood,number,phone,registrationCode,street,websites,state
		} = body;

		const result = await this.createAuctioneerUseCase.execute({
			cep,
			city,
			email,
			name,
			neighborhood,
			number,
			phoneNumber:phone,
			registrationCode,
			state,
			street,
			websites
		});

		if(result.isFailure()){
			throw new BadRequestException();
		}
	}
}