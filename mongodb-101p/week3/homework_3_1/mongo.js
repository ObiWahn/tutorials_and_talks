use school
db.students.count()

print("hw 1: ################################################")

var rv = db.students.aggregate([
    {
        "$unwind": "$scores"
    },{
        "$match" : {"scores.type" : "homework" }
    },{
        "$group" : {
            "_id" : "$_id",
            "score" : {"$min": "$scores.score" }
        }
    }
])

rv.result.forEach(function(x){
    print("student with id: " + x._id + " score: " + x.score);
    db.students.update(
        { "_id" : x._id},
        { '$pull' :
            {
                scores : { "type" : "homework", "score" : x.score }
            }
        }
    )
;})



//db.grades.aggregate(
//    {
//        '$group':{
//            '_id':'$student_id',
//            'average':{$avg:'$score'}
//        }
//    },{
//        '$sort':{'average':-1}
//    },{
//        '$limit':1
//    })
//
//print("hw 1: ################################################")
//db.grades.find(
//    {
//        'type' : 'exam',
//        'score' : {$gte: 65 }
//    }).sort({
//        'score': 1
//    }).limit(1)
//
//print("hw 2: ################################################")
//
//var rv = db.grades.aggregate(
//    {
//        $group : { "_id": "$student_id"}
//    },{
//        $sort : {"_id": 1}
//    });
//print("for each in list:")
//
//rv.result.forEach(function(x){
//    print("student with id: " + x._id);
//    db.grades.findAndModify(
//        {
//            query : { "student_id" : x._id, "type" : "homework" },
//            sort  : { "score" : 1 },
//            remove : true
//        }
//    )
//;})
//
//db.grades.find({"student_id" : 0})
//
//db.grades.aggregate({'$group':{'_id':'$student_id', 'average':{$avg:'$score'}}}, {'$sort':{'average':-1}}, {'$limit':1})
