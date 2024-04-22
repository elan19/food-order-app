const express = require('express');
const router = express.Router();
const menuModel = require('../models/menu');
router.get("/", (req, res) => menuModel.getAll(res));
router.post("/", (req, res) => menuModel.create(req, res));
router.put("/:menuId", (req, res) => menuModel.update(req.params.menuId, req.body, res));
router.delete("/:menuId", (req, res) => menuModel.delete(req.params.menuId, res));
router.get("/:menuId", (req, res) => menuModel.getOne(req.params.menuId, res));
router.get("/:category", (req, res) => orderModel.getCategory(req.params.orderId, res));

module.exports = router;