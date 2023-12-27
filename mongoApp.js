const express=require('express')
const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://adam:admblck500@cluster0.2cninsm.mongodb.net/deneme?retryWrites=true&w=majority',
)

const app=express()
const PORT =3000        

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchemaDeneme=new mongoose.Schema({
    description:String,
    type:String,
      name:String,
      job:String,
      age:Number
  },"items")


  const personSchema = new mongoose.Schema({
    name: String,
    age: Number
  });

  // Mongoose modeli
  const Person = mongoose.model('items', personSchema);

  // Yeni bir kişi eklemek için
  const newPerson = new Person({
    name: 'Adem Kara',
    age: 30
  });

  // Kişiyi kaydet ve promise kullanarak kontrol et
  

  app.get('/',async (req,res)=>{
    const savedPerson = await newPerson.save();
    console.log('Person saved:', savedPerson);
  
    // Kişiyi bulmak için
    const foundPerson =  Person.find().then((result)=>{
        res.send(result)
    })
  

  })

  app.get('/update',(req,res)=>{

    var eski=req.query.name
    var yeni=req.query.name

    
    console.log(eski[0])
    Person.updateOne(
      {name:eski[0]},
      {$set :{name:yeni[1]}}
    ).then((result)=>{

      Person.find({name:yeni[1]}).then((result)=>{
        res.send(result)
      }).catch((err)=>{
        console.error(err)
      })
    }).catch((err)=>{
      console.log(err)
    })


  })


  app.get('/item',async (req,res)=>{

    var itemName= req.query.name
    
    Person.find({name:itemName}).then((result)=>{
      res.send(result)
    })
    .catch((err)=>{
      console.log(err)
    })


  })
 

      // Sunucuyu dinlemeye başla
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    
  

 


  
