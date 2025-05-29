import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './core/env/env';
import { EnvModule } from './core/env/env.module';
import { HttpModule } from './core/http/http.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: env => envSchema.parse(env),
			isGlobal: true 
		}),
		HttpModule,
		EnvModule
	],
})
export class AppModule {}
