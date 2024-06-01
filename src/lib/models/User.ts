import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
},{
    timestamps:true
});

UserSchema.pre("save",async function(){
    this.password = this.password;
});
UserSchema.methods.checkPassword = async function(enteredPassword:string){
    return this.password==enteredPassword;
}

export default mongoose.models.User || mongoose.model("User",UserSchema);