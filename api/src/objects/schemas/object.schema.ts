// src/objects/schemas/object.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ObjectItem extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ObjectSchema = SchemaFactory.createForClass(ObjectItem);