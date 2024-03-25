//iski URI ya hogi
//POST: localhost:8888/ecomm/api/v1/auth/categories
const category_model=require("../models/category.model")

    //read the req body
exports.createNewCategory=async(req,res)=>{


    //create the category object

    const category_data={
        name:req.body.name,
        description:req.body.description
    }
    //insert into the mongodb

   try{
    const category=await category_model.create(category_data)
    return res.status(201).send(category) //yha return mai is k ps cateogry ka complete data ajega.
   }catch(error){
    console.log("error while creating the category",error)
    return res.status(500).send({
        mesaage:"error while creating the category"
    })
   }


    //return the res of the created object

}
