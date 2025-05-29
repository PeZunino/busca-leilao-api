import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';
import { createBuiltPropertyValidationSchema, createUnbuiltPropertyValidationSchema } from '@/core/validation/real-estate.validator';
import { createCarValidationSchema, createMotorcycleValidationSchema } from '@/core/validation/vehicle.validator';
import { CreateAuctionUseCase } from '@/modules/auctions/application/use-cases/create-auction';
import { GoodType } from '@/modules/auctions/domain/factories/good';

const carSchema = z.object({
	type: z.literal(GoodType.CAR),
	data: createCarValidationSchema
});

const motorcycleSchema = z.object({
	type: z.literal(GoodType.MOTORCYCLE),
	data: createMotorcycleValidationSchema,
});

const builtPropertySchema = z.object({
	type: z.literal(GoodType.BUILT_PROPERTY),
	data: createBuiltPropertyValidationSchema
});

const unbuiltPropertySchema = z.object({
	type: z.literal(GoodType.UNBUILT_PROPERTY),
	data: createUnbuiltPropertyValidationSchema
});

const goodSchema = z.discriminatedUnion('type', [
	carSchema,
	motorcycleSchema,
	builtPropertySchema,
	unbuiltPropertySchema
]);

const itemSchema = z.object({
	origin: z.string()
		.min(3, 'Origin must be at least 3 characters'),
	startingBid: z.number(),
	debits: z.number(),
	description: z.string()
		.min(10, 'Description must be at least 10 characters'),
	observation: z.string()
		.optional(),
	initialValue: z.number(),
	good: goodSchema 
});

const createAuctionBodySchema = z.object({
	publicationDate: z.date(),
	items: z.array(itemSchema),
	openDates: z.array(z.date()),
	auctioneerId: z.string()
		.uuid(),
	committeeId: z.string()
		.uuid(),
	metaData:  z.record(z.string(), z.string())
		.optional()
});

type CreateAuctionBodySchema = z.infer<typeof createAuctionBodySchema>

@Controller('/auctions')
export class CreateAuctionController {
	constructor(
		private createAuctionUseCase: CreateAuctionUseCase
	){}

	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(createAuctionBodySchema))
	async handle(
		@Body() body:CreateAuctionBodySchema
	){
		const {
			auctioneerId,committeeId,items,openDates,publicationDate,metaData
		} = body;

		const result = await this.createAuctionUseCase.execute({
			auctioneerId,
			committeeId,
			items,
			openDates,
			publicationDate,
			metaData,
		});

		if(result.isFailure()){
			throw new BadRequestException();
		}
	}
}