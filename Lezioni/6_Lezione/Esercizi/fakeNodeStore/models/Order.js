const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const Product = require("./Product");

const Order = sequelize.define("Order", {
  customer_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Customer, key: "id" } },
  product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: "id" } },
  quantity: { type: DataTypes.INTEGER, allowNull: false }
});

Order.belongsTo(Customer, { foreignKey: "customer_id" });
Order.belongsTo(Product, { foreignKey: "product_id" });

module.exports = Order;
