import mongoose from 'mongoose';
const { Schema } = mongoose;

//definimos el schema 
const productSchema = new Schema({
  name: {
    type : String,
    required : [true, 'Name is required'],
    unique : true

  }, // String is shorthand for {type: String}
  available: {
    type : Boolean,
    default : false,
  },
  price : { 
    type : Number,
    default : 0
  },
  description : { 
    type : String,
  },
  user : {
    type: Schema.Types.ObjectId,
    ref : 'User',
    required: true
  },
  category : {
    type: Schema.Types.ObjectId,
    ref : 'Category',
    required: true
  }
});

//creamos el modelo
export const ProductModel = mongoose.model('Product', productSchema);