import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('MongoDB');
        const uri = configService.get<string>('DATABASE_URL');
        
        if (!uri) {
          logger.error('MongoDB connection URL not found in environment variables');
          process.exit(1);
        }

        logger.log(`Connecting to MongoDB Atlas...`);
        
        return {
          uri,
          dbName: 'productapp', // Explicitly set the database name
          retryAttempts: 5,
          retryDelay: 1000,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              logger.log('Successfully connected to MongoDB Atlas');
            });
            connection.on('error', (error) => {
              logger.error('MongoDB Atlas connection error:', error.message);
            });
            connection.on('disconnected', () => {
              logger.warn('Disconnected from MongoDB Atlas');
            });
            return connection;
          }
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}