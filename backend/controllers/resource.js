const { getUser } = require("../services/auth");
const Resources = require("../models/resource")
const mongoose = require("mongoose");
async function handleResourceCreation(req, res) {
  let { itemName, availability, price, location } = req.body;
  price = parseInt(price,10);
  availability = Boolean(availability);
  console.log({
    itemName,
    availability,
    price,
    location
  });
  await Resources.create({
    itemName,
    availability,
    price,
    location,
    owner: req.user.id
  });
  return res.status(200).send("Done");
}

async function handleResourceDeletion(req, res) {
  const itemId = req.params.id;
  try {
    await Resources.findByIdAndDelete(itemId);
    res.status(204).send("Done");
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
}

async function handleResourceUpdation(req, res) {
  const itemId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedItem = await Resources.findByIdAndUpdate(itemId, updatedData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(updatedItem);

  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

module.exports = {
  handleResourceCreation,
  handleResourceDeletion,
  handleResourceUpdation
};