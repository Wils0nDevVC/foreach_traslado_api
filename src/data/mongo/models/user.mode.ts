import mongoose from 'mongoose';
const { Schema } = mongoose;

//definimos el schema 
const userSchema = new Schema({
  name: {
    type : String,
    required : [true, 'Name is required']

  }, // String is shorthand for {type: String}
  email: {
    type : String,
    required : [true, 'Email is required'],
    unique : true
  },
  emailValidator: {
    type : Boolean,
    default : false
  },
  password: {
    type : String,
    required : [true, 'Password is required']
  },
  img:{
    type : String,
  },
  role: {
    type : [String],
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE','USER_ROLE']
  }
});

//creamos el modelo
export const UserModel = mongoose.model('User', userSchema);