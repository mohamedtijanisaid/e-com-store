const express = require("express");
const { AddProduct, updateProduct, deleteProduct, getProduct, getAllProducts, getNewProducts, getFeaturedProducts } = require("../handlers/product-handler");
const router = express.Router();

router.post("/" ,async (req,res)=>{
    let model=req.body;
    let product = await AddProduct(model);
    res.send(product);
}); 

router.put("/:id" ,async (req,res)=>{
    let model=req.body;
    let id = req.params["id"];
     await updateProduct(id , model);
    res.send({message : "updated"});
}); 
 
router.delete("/:id" ,async (req,res)=>{
    let id = req.params["id"];
     await deleteProduct(id );
    res.send({message : "deleted"});
}); 
 
router.get("/:id" ,async (req,res)=>{
    let id = req.params["id"];
     let product = await getProduct(id);
    res.send(product);
}); 

router.get("/" ,async (req,res)=>{
     let products = await getAllProducts( );
    res.send(products);
}); 


router.get("/new-products",  async (req,res)=>{
    let products=await getNewProducts();
    res.send(products);
});
router.get("/featured-products", async (req, res) => {
    try {
      console.log("[DEBUG] Request received for /featured-products");
      let products = await getFeaturedProducts();
      console.log("[DEBUG] Featured Products:", products);
      res.status(200).send(products);
    } catch (error) {
      console.error("[ERROR] Featured Products Route:", error.message);
      res.status(500).send({ error: "Failed to fetch featured products" });
    }
  });
  
module.exports= router;