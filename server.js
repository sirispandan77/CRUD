/*console.log("server page")
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient


// Make sure you place body-parser before your CRUD handlers!
//app.use(bodyParser.urlencoded({ extended: true }))  ---------> this didn't work for me
app.use(express.urlencoded({extended: true}));

  app.get('/', (req, res) => {  
    res.sendFile('E:/drive d/SIRISPANDANA/microprojects/CRUD' + '/index.html')     //sending a file when requested as response
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  })
  app.post('/quotes', (req, res) => {
    console.log(req.body)       //data entered in form is printed 
  })

  MongoClient.connect('mongodb-connection-string', (err, client) => {
    // ... do something here
  })
  app.listen(3000, function() {
    console.log('listening on 3000')
  })


*//*
app.listen(3000, () => {
  console.log('listening on 3000')
  }
  ); 
//app.set('view engine', 'ejs')
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'))
var result = ['Bindu','Nikitha','Varsha'];
app.get('/', (req, res) => {
res.render('index.ejs',{users: result});







})
  */


const express = require('express')
const app = express()
const bodyParser=require('body-parser')         //data from client is sent to us as bodyparser
//app.use(express.bodyParser());
 

//mongo setup
const MongoClient = require('mongodb').MongoClient;         //to connect mongo to server we created. mongo client is the  reference 
const url = 'mongodb://localhost:27017/Anime';
var db;var s;
MongoClient.connect( url, (err, database) => {
    if (err) return console.log(err)
    db=database.db('Anime')
    app.listen(5000,()=>{
      console.log('Connected to database ; listening to port 5000') 
    })
})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'))

app.get('/',(req,res)=>{
  db.collection('Anime_list').find().toArray((err,result)=>{
    if(err) return console.log(err)
    res.render('home.ejs',{data:result})
  })
});

app.get('/create',(req,res)=>{
      res.render('create.ejs')
  });
app.get('/update',(req,res)=>{
    res.render('update.ejs')
});
app.get('/delete',(req,res)=>{
  res.render('delete.ejs')
});

app.get('/home',(req,res)=>{
  res.redirect('/')
});

  //on clicking submit in create 
  app.post('/Add',(req,res)=>{
    console.log(res.body);
    var v=req.body.name;var n=-1
    
    var obj={name:req.body.name,Genre:req.body.genre,no_of_seasons:req.body.nos,author:req.body.author,ongoing_or_completed:req.body.uoc}
    console.log(v+ req.body.author);
    db.collection("Anime_list").find({name:{ $regex: new RegExp("^" + v.toLowerCase(), "i") }}, { projection: { _id: 0, name: 1 } }).toArray(function(err, result) {
      if (err) throw err;
       n=result.length;
      
     if(n!=0){
       // res.render('popup.html');
        res.sendFile('E:/drive d/SIRISPANDANA/microprojects/CRUD_n/crud/views' + '/popup.html')
      }
      else{
        db.collection('Anime_list').insertOne(obj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          });
          res.redirect('/');
      }
    });   
    /* 
     db.collection('Anime_list').save(req.body,(err,result)=>{
       if(err) return console.log(err)
       res.redirect('/')
     })*/
   
 })




//on clicking update request
app.post('/update',(req,res)=>{
 // console.log(res.body);
  var na=req.body.uname;
  console.log(na);
  var ep=req.body.unos;
  var oc=req.body.uoc;
  var aut=req.body.au;
  var obj;
  console.log(na+" "+ep+" "+oc);
  db.collection("Anime_list").find({name:{ $regex: new RegExp("^" + na.toLowerCase(), "i") }},{projection: {_id: 0,name:1}}).toArray(function(err,result){
    if(err) throw err;
        if(result.length==0)    
          res.sendFile('E:/drive d/SIRISPANDANA/microprojects/CRUD_n/crudviews' + '/popup_create.html')
        else{
            if(ep=="" && aut=="")
              obj={$set:{ongoing_or_completed:req.body.uoc}}
            else if(oc=="" && aut=="")
              obj={$set:{no_of_seasons:ep}}
            else if(oc=="" && ep=="")
              obj={$set:{author:aut}}
            else 
              obj={$set: {no_of_seasons:ep,ongoing_or_completed:req.body.uoc,author:aut}}
              console.log(obj);
              console.log("final object")
              db.collection("Anime_list").updateOne({name:{ $regex: new RegExp("^" + na.toLowerCase(), "i") }}, obj , function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                
              });
        }
   }); 
  /*db.collection('Anime_list').find().toArray((err,result=> {
    if(err)
      return console.log(err)
    for(var i=0; i<result.length;i++){
      if(result[i].name==req.body.uname){
        s=result[i].stock
        break;
      }
    }
    db.collections('Anime_list').findOneAndUpdate({pid: req.body.id}, { $set: {stock: parseInt(s)+ parseInt(req.body.stock)}}, {sort: {id: -1}},
    (err,result)=> {
    if (err) return res.send(err)
    console.log(req.body.id+ ' updated')
    res.redirect('/')
    })
  })   */
  res.redirect('/')
})



//deleting
app.post('/delete',(req,res)=>{
  console.log(req.body.uname);
  db.collection('Anime_list').findOneAndDelete({name:{ $regex: new RegExp("^" + req.body.uname, "i") }},(err,result)=>{
    console.log(result.value==null)
    if(err)
      return console.log(err)
    if(result.value==null)
      res.sendFile('E:/drive d/SIRISPANDANA/microprojects/CRUD_n/crud/views' + '/popup_delete.html')
    else{
      console.log("doc deleted")
      res.redirect('/')
    }
      //res.sendFile('E:/drive d/SIRISPANDANA/microprojects/CRUD/views' + '/popup_delete.html')
  })
})
