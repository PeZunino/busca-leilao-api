import { before } from 'node:test';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { makeAuctioneer } from 'test/factories/make-auctioneer';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create Auctioneer (E2E)',()=>{
	let app: INestApplication;

	let prisma: PrismaService;

	before(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [
				AppModule, 
			],
			providers: [],
		})
			.compile();

		app = moduleRef.createNestApplication();

		prisma = moduleRef.get(PrismaService);

		await app.init();
	});

	test('[POST] /auctioneers', async()=>{
		const auctioneer = makeAuctioneer();

		const response = await request(app.getHttpServer())
			.post('/auctioneers')
			.send(auctioneer);

		expect(response.statusCode)
			.toBe(201);

		const auctioneerOnDatabase = await prisma.auctioneer.findUnique({where:{email:auctioneer.email}});

		expect(auctioneerOnDatabase)
			.toBeTruthy();
	});
});