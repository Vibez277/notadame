import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    content:{
        type:String,
    },
    folder:{
        type:mongoose.Types.ObjectId,
        ref:"Folder"
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
});

export default mongoose.models.Note||mongoose.model("Note",NoteSchema)