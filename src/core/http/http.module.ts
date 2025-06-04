import { Module } from '@nestjs/common';
import { CreateAuctionUseCase } from '@/modules/auctions/application/use-cases/create-auction';
import { CryptographyModule } from '@/modules/auctions/infra/cryptography/cryptography.module';
import { CreateAuctionController } from '@/modules/auctions/presentation/http/controllers/create-auction.controller';
import { CreateAuctioneerController } from '@/modules/auctions/presentation/http/controllers/create-auctioneer.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
	imports:[
		DatabaseModule, CryptographyModule
	],
	controllers:[
		CreateAuctioneerController,
		CreateAuctionController	
	],
	providers:[
		CreateAuctionUseCase,
		CreateAuctionController
	]
})
export class HttpModule{}