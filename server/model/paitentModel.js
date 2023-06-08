import mongoose from "mongoose";

const Schema = mongoose.Schema;

const paitentSchema = new Schema({
    firstName:{
        type:String,
        required:true,

    },
    lastNname:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    image:{
       data:Buffer,
       contentType:String
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    }
});

export default mongoose.model("Paitents", paitentSchema)