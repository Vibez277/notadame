import mongoose from 'mongoose';

const FolderSchema = new mongoose.Schema({
    label:{
        type:String,
        required:true,
    },
    subfolders:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Folder"
        }
    ],
    parent:{
        type:mongoose.Types.ObjectId,
            ref:"Folder"
    },
    notes:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Note"
        }
    ],
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})
export default mongoose.models.Folder||mongoose.model("Folder",FolderSchema)