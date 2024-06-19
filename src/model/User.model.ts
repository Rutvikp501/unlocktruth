
import mongoose,{Schema,Document} from "mongoose"

// For type seafty we use this type of Schema
export interface Message extends Document{
    content : string,
    createdAt: Date
}

const MessageSchema : Schema<Message>= new Schema({
    content:{  type:String, required:true    },
    createdAt:{ type:Date , required:true , default:Date.now}

})

export interface User extends Document{
    userName : string;
    email:string;
    password:string;
    verifycode:string;
    verifycodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMsg:boolean;
    messages:Message[]
}

const UserSchema : Schema<User>=new Schema({
    userName:{type:String, required:[true,"Username is required"],trim:true,unique:true},
    email:{type:String, required:[true,"Email is required"],unique:true,match:[/.+\@.+\..+/,"please use a valid email address"]},
    password:{type:String, required:[true,"Password is required"]},
    verifycode:{type:String, required:[true,"Verify code is required"]},
    verifycodeExpiry:{type:Date, required:[true,"Verify code Expiry is required"]},
    isVerified:{type:Boolean ,default:false },
    isAcceptingMsg:{type:Boolean,default:true   },
    messages:[MessageSchema],
}) 

const UserModel=(mongoose.models.User as mongoose.Model<User>) ||(mongoose.model<User>("User",UserSchema))
export default UserModel;