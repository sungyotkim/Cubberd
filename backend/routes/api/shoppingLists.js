const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {requireUser} = require("../../config/passport");
const ShoppingListItem = mongoose.model('ShoppingListItem')


//require logged in eventually
router.get("/:itemId", async(req, res) => {
    const shoppingListItem = await ShoppingListItem.findById(req.params.itemId)
    console.log(shoppingListItem)
    return res.json(shoppingListItem)
})

router.put("/:itemId", async(req, res) => {
    const shoppingListItem = await ShoppingListItem.findById(req.params.itemId)
    const quantity = req.body.quantity;
    shoppingListItem.quantity = quantity;
    await shoppingListItem.save();
    return res.json(shoppingListItem);
})

module.exports = router;