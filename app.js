const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true });


const itemsSchema=new mongoose.Schema(
  {
    name:String,
  }
)

const Item = mongoose.model("Item",itemsSchema);

const item1 =new Item(
  {
    name:"Eat your food",
  }
)
const item2 =new Item(
  {
    name:"Dress up",
  }
)
const item3 =new Item(
  {
    name:"off to School",
  }
)

const defaultItems=[item1,item2,item3];



Item.find({},function(err,results)
{
  if(results.length===0)
  {
    console.log("Empty");
    Item.insertMany(defaultItems,function(err)
    {
      if(err)
      console.log(err);
      else
      console.log("Successful");
    })
  }
results.forEach(function(result)
{
  console.log(result.name);
  items.push(result.name);
})


});




const items=[];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(requst, response) {




  response.render("list", {
    listTitle: "Today",
    newListItems: items,
  });

});


app.post("/", function(req, res) {
console.log(req.body.button);
  let item = req.body.newItem;
  if (req.body.button === "Work list") {
    workItems.push(item);
    res.redirect("/work");

  } else {

    items.push(item);
    res.redirect("/");
  }

})

app.get("/work", function(requst, response) {

  response.render("list", {
    listTitle: "Work list",
    newListItems: workItems,
  });

});


app.get("/con", function(requst, response) {

  response.render("contact");

});




app.listen(3000, function() {
  console.log("listening at port 3000");

});
