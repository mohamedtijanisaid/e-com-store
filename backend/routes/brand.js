const express = require("express");
const router = express.Router();
const { getBrands, addBrand, updateBrand, deleteBrand, getBrand } = require('../handlers/brand-handler');


router.post("", async (req, res) => {
    console.log("here");
    let model =req.body;
    let result = await addBrand(model);
    res.send (result);
});

router.put("/:id", async (req, res) => {
    let id = req.params["id"]; // Récupère l'ID de la requête
    let model = req.body;
    await updateBrand(id, model); 
    res.send({ message: "updated" });
});


router.delete("/:id", async (req, res) => {
    console.log("here");
    let id = req.params["id"];
    await deleteBrand (id); 
    res.send ({message : "deleted"});
});

router.get("/:id", async (req, res) => {
    console.log("here");
    let id = req.params["id"];
    let brand = await getBrand (id); 
    res.send (brand);
});

router.get("", async (req, res) => {
    console.log("here");
    let brands = await getBrands (); 
    res.send (brands);
});

module.exports=router; 