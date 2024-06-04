import { pipeline } from "stream";

export const folderCommonAggregation = () => {
    return [
      {
        $lookup:{
          from:"folders",
          as:"subfolders",
          let:{
            subfolders:"$subfolders"
          },
          pipeline:[
            {
              $match:{
                $expr:{$in:["$_id","$$subfolders"]}
              }
            },
            {
              $lookup:{
                from:"folders",
                let:{subfolders:"$subfolders"},
                pipeline:[
                  {
                    $match:{
                      $expr:{$in:["$_id","$$subfolders"]}
                    }
                  },

                ],
                as:"subfolders_data"
              }
            },
            {
              $unwind:"$subfolders_data"
            },
            {
              $replaceRoot:{
                newRoot:{
                  $mergeObjects:[
                    "$subfolders_data","$$ROOT"
                  ]
                }
              }
            },
            {
              $project:{
                _id:1,
                label:1,
                subfolders:1,
                subfolders_data:{
                  _id:1,
                  label:1,
                  subfolders:1
                }
              }
            }
          ]
        }
      }
    ];
  };