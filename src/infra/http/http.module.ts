import { Module } from '@nestjs/common';
import { CreateAuctioneerUseCase } from '@/domain/auctioneer/application/use-case/create-auctioneer';
import { DatabaseModule } from '../database/database.module';
import { CreateAuctioneerController } from './controllers/create-auctioneer.controller';

@Module({
	imports:[
		DatabaseModule
	],
	controllers:[
		CreateAuctioneerController
	],
	providers:[
		CreateAuctioneerUseCase
	]
})
export class HttpModule{}