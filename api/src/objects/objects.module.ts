// src/objects/objects.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectsController } from './objects.controller';
import { ObjectsService } from './objects.service';
import { ObjectItem, ObjectSchema } from './schemas/object.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ObjectItem.name, schema: ObjectSchema }])
  ],
  controllers: [ObjectsController],
  providers: [ObjectsService],
})
export class ObjectsModule {}