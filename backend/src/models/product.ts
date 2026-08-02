import { model, Schema } from 'mongoose'

export interface IProduct {
  title : string,
  image : {
    fileName: string,
    originalName: string;
  },
  category: string,
  description: string,
  price: number
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
    unique: true
  },
  image: {
    type: {
      fileName: String,
      originalName: String
    },
    required: [true, 'Поле "image" должно быть заполнено']
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено']
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false,
    default: null
  }
});

export default model<IProduct>('product', productSchema);