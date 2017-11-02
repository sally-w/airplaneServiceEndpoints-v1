var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var connectionstring = "mongodb://airplaneData:alohomora@ds113775.mlab.com:13775/airplane-data";
mongoose.connect(connectionstring, { useMongoClient: true });

mongoose.Promise = global.Promise;

var climbDataSchema = new mongoose.Schema({
    weight: Number,
    vfri5: Number,
    vfri10: Number,
    vfri15: Number,
    vClmb: Number
});

var ClimbData = mongoose.model('ClimbData', climbDataSchema, 'ClimbData');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  
  //console.log("I am here");
  
  ClimbData.find({}, function(err, climbdatas){
    if(err){
        res.send(err);
        return console.error(err)
        
            
        var output = "";
        
        climbdatas.forEach(function(climbdata) {
            console.log(climbdata.weight);
            output += "weight: " + climbdata.weight + "<br/>";
        })
    }
    
/*   
    for(var i = 0; i < climbdatas.length; i++){
        console.log(climbdatas[i]);
        output += climbdatas[i].weight + "<br/>";
    }
*/
    res.send(output);
    res.render('airplanes', {title: 'Airplanes Project', outputs: output})
  })
/*  
    Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
    })
  
  res.send('JackPot!'); */
});

module.exports = router;