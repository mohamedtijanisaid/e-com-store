const Product= require("./../db/product");



async function AddProduct(model) {
    let product = new Product({
        ...model,
    });
    await product.save();
    return product.toObject();
}
async function updateProduct(id , model) {
    await Product.findByIdAndUpdate(id,model);  
}

async function deleteProduct(id ) {
    await Product.findByIdAndDelete(id);  
}

async function getAllProducts() {
   let products= await Product.find();
   return products.map(x=>x.toObject()); 
}

async function getProduct(id) {
    let product = await Product.findById(id);
    return product.toObject();
    
}
async function getNewProducts() {
    try {
      const newProducts = await Product.find({ isNew: true });
      console.log("[DEBUG] New Products:", newProducts); // Debug logging
      return newProducts;
    } catch (error) {
      console.error("[ERROR] Fetching new products:", error);
      throw error; // Propagate the error
    }
  }
  
  async function getFeaturedProducts() {
    try {
      const featuredProducts = await Product.find({ isFeatured: true });
      console.log("[DEBUG] Featured Products:", featuredProducts); // Debug logging
      return featuredProducts;
    } catch (error) {
      console.error("[ERROR] Fetching featured products:", error);
      throw error; // Propagate the error
    }
  }
  



module.exports = {AddProduct , updateProduct , deleteProduct , getAllProducts , getProduct , getNewProducts , getFeaturedProducts};