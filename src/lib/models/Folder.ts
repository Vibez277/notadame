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
    ]
})