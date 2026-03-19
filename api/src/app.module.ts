// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectsModule } from './objects/objects.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dascomsoft_db_user:godlove@heyamatest.rhkrdlp.mongodb.net/heyama?retryWrites=true&w=majority&appName=HeyamaTest'),
    ObjectsModule,
  ],
})
export class AppModule {}