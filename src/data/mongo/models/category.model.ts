import mongoose from 'mongoose';
const { Schema } = mongoose;

//definimos el schema 
const categorySchema = new Schema({
  name: {
    type : String,
    required : [true, 'Name is required'],
    unique:true

  }, // String is shorthand for {type: String}
  available: {
    type : Boolean,
    default : false,
  },
  user : {
    type: Schema.Types.ObjectId,
    ref : 'User',
    required: true
  }
});

//creamos el modelo
export const CategoryModel = mongoose.model('Category', categorySchema);