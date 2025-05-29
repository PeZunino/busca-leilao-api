import { Module } from '@nestjs/common';
import { CreateAuctioneerUseCase } from '@/modules/auctions/application/use-cases/create-auctioneer';
import { CreateAuctioneerController } from '../../modules/auctions/presentation/http/controllers/create-auctioneer.controller';
import { DatabaseModule } from '../database/database.module';

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