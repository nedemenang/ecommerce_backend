module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'review',
      timestamps: false,
    }
  );
  Review.associate = ({ Customer, Product }) => {
    Review.belongsTo(Customer, {
      foreignKey: 'customer_id',
    });
    Review.belongsTo(Product, {
      foreignKey: 'product_id',
    });
  };
  return Review;
};
