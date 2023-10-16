import MaterialOrder from "../models/MaterialOrder.Model.js";
import Material from "../models/Material.Model.js";
import Supplier from "../models/Supplier.Model.js";

// Get all materialOrders
export const getMaterialOrders = async (req, res) => {
  try {
    const materialOrders = await MaterialOrder.find();
    for (let i = 0; i < materialOrders.length; i++) {
      const material = await Material.find({
        _id: materialOrders[i].materialID,
      });
      materialOrders[i].material = material[0];
      const supplier = await Supplier.find({
        _id: materialOrders[i].supplierID,
      });
      materialOrders[i].supplier = supplier[0];
    }
    res.status(200).json(materialOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single materialOrder
export const getMaterialOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const materialOrder = await MaterialOrder.findById(id);
    const material = await Material.find({ _id: materialOrder.materialID });
    materialOrder.material = material[0];
    const supplier = await Supplier.find({ _id: materialOrder.supplierID });
    materialOrder.supplier = supplier[0];
    res.status(200).json(materialOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create materialOrder
export const createMaterialOrder = async (req, res) => {
  const materialOrder = req.body;

  const newMaterialOrder = new MaterialOrder(materialOrder);

  try {
    await newMaterialOrder.save();
    res.status(201).json(newMaterialOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update materialOrder
export const updateMaterialOrder = async (req, res) => {
  const { id } = req.params;
  const materialOrder = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No materialOrder with that id");

  const updatedMaterialOrder = await MaterialOrder.findByIdAndUpdate(
    id,
    materialOrder,
    {
      new: true,
    }
  );
  res.json(updatedMaterialOrder);
};

// Delete materialOrder
export const deleteMaterialOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No materialOrder with that id");

  await MaterialOrder.findByIdAndRemove(id);

  res.json({ message: "MaterialOrder deleted successfully." });
};

// get material orders by supplier id
export const getMaterialOrdersBySupplierID = async (req, res) => {
  const { id } = req.params;

  try {
    const materialOrders = await MaterialOrder.find({ supplierID: id });
    for (let i = 0; i < materialOrders.length; i++) {
      const material = await Material.find({
        _id: materialOrders[i].materialID,
      });
      materialOrders[i].material = material[0];
      const supplier = await Supplier.find({
        _id: materialOrders[i].supplierID,
      });
      materialOrders[i].supplier = supplier[0];
    }
    res.status(200).json(materialOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get material orders by status
export const getMaterialOrdersByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const materialOrders = await MaterialOrder.find({ status: status });
    for (let i = 0; i < materialOrders.length; i++) {
      const material = await Material.find({
        _id: materialOrders[i].materialID,
      });
      materialOrders[i].material = material[0];
      const supplier = await Supplier.find({
        _id: materialOrders[i].supplierID,
      });
      materialOrders[i].supplier = supplier[0];
    }
    res.status(200).json(materialOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get material orders by supplier id and status
export const getMaterialOrdersBySupplierIDAndStatus = async (req, res) => {
  const { id, status } = req.params;

  try {
    const materialOrders = await MaterialOrder.find({
      supplierID: id,
      status: status,
    });
    for (let i = 0; i < materialOrders.length; i++) {
      const material = await Material.find({
        _id: materialOrders[i].materialID,
      });
      materialOrders[i].material = material[0];
      const supplier = await Supplier.find({
        _id: materialOrders[i].supplierID,
      });
      materialOrders[i].supplier = supplier[0];
    }
    res.status(200).json(materialOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getMaterialOrders,
  getMaterialOrder,
  createMaterialOrder,
  updateMaterialOrder,
  deleteMaterialOrder,
  getMaterialOrdersBySupplierID,
  getMaterialOrdersByStatus,
  getMaterialOrdersBySupplierIDAndStatus,
};