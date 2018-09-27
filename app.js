var express=require('express');
var app=express();
var upload=require('express-fileupload');
const fs = require('fs');
var alert=require("alert-node");
var express = require('express');
let x=null;
let value=null;
var path1=require("path");
app.use(upload());
app.get('/',function(req,res){
  res.sendfile('index.html');
  })

app.post('/',function(req,res){
  if(req.files){
    var file=req.files.filename;
    var filename1=file.name;
    file.mv("./upload/"+filename1,function(err){
      if(err){
        console.log("err");
        alert("error occured");
      }
      else{
        console.log("uploaded");
      alert("File uploaded sucessfully");
         console.log(filename1)
      };
     });
   }
});

app.post("/create",function(req,res){
if(req.body.fname && req.body.ftype){
   var fname=req.body.fname;
   var ftype=req.body.ftype;
   var con=req.body.content;
   var name=fname+ftype ;
   console.log(name);
   fs.appendFile("./upload/"+name, con, function (err) {
if (err) {
  throw err;
  alert("could not create a file");
}
else{
alert(" file create sucessfully !")
console.log('created');
}
});
 }
});

app.post("/delete",function(req,res){
if(req.body.delete){
   var fname=req.body.delete;
   console.log(fname);
   fs.unlink("./upload/"+fname, function (err) {
  if (err){
   alert("could not delete the file");
    throw err;
  }
  else{
    alert("file deleted sucessfully !")
  console.log('File deleted!');
}
});
}
});

app.post("/browse",function(req,res){
if(req.body.path){
   var path=req.body.path;
   console.log(path);
   var x=path1.basename(path);
   console.log(x);
   res.download("./upload/"+x);

}
});
app.listen(3000);
console.log('server running on port 3000');
