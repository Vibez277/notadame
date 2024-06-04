export interface Folder{
    _id:string,
    label:string,
    parent:string,
    notes:Note[],
    subfolders:Folder[],
    owner:string
}
export interface Note{
    _id:string,
    title:string,
    folder:string|undefined,
    owner:string,
    content:string
}