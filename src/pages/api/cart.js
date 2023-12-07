const { Product } = require("../../../lib/model/Product");
const { moongooseConnect } = require("../../../lib/mongoose")

export default  async function handler (req,res){
    await moongooseConnect();
    const ids = req.body.ids;
    res.json(await Product.find({_id:ids}))
}