"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("ventas", "descripcion", {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn("ventas", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn("ventas", "deleted_at", {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn("gastos", "descripcion", {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn("gastos", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn("gastos", "deleted_at", {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.sequelize.query(
      "UPDATE ventas SET descripcion = '' WHERE descripcion IS NULL"
    );
    await queryInterface.sequelize.query(
      "UPDATE gastos SET descripcion = '' WHERE descripcion IS NULL"
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("ventas", "descripcion");
    await queryInterface.removeColumn("ventas", "user_id");
    await queryInterface.removeColumn("ventas", "deleted_at");
    await queryInterface.removeColumn("gastos", "descripcion");
    await queryInterface.removeColumn("gastos", "user_id");
    await queryInterface.removeColumn("gastos", "deleted_at");
  }
};
