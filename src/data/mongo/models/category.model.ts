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

categorySchema.set('toJSON',{
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret, options) {
        delete ret._id;
  },
})
//creamos el modelo
export const CategoryModel = mongoose.model('Category', categorySchema);