module.exports = function(sequelize, DataTypes) 
{
    var warehouseItems = sequelize.define("warehouseItems",
    {  
        item_name: 
        {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: 
            {
                notEmpty: true
            }    
        },      
            
        category:
        {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: 
            {
                notEmpty: true
            }      
        },

        units_sold:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0   
        },

        price:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, 
            validate: 
            {
                isInt: true
            }      
        },

        warehouse_name:
        {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: 
            {
                notEmpty: true       
            }      
        }         

    },

    {
        freezeTableName: true,
        timestamps: false  

    });

    return warehouseItems;
};

