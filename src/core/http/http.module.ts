import { Module } from '@nestjs/common';
import { CreateAuctionUseCase } from '@/modules/auctions/application/use-cases/create-auction';
import { CreateAuctioneerUseCase } from '@/modules/auctions/application/use-cases/create-auctioneer';
import { CreateAuctionController } from '@/modules/auctions/presentation/http/controllers/create-auction.controller';
import { CreateAuctioneerController } from '@/modules/auctions/presentation/http/controllers/create-auctioneer.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
	imports:[
		DatabaseModule
	],
	controllers:[
		CreateAuctioneerController,
		CreateAuctionController	
	],
	providers:[
		CreateAuctioneerUseCase,
		CreateAuctionUseCase
	]
})
export class HttpModule{}