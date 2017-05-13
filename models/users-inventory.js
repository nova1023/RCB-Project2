module.exports = function(sequelize, DataTypes){

    var usersInventory = sequelize.define("usersInventory", 
    {
        item_name: 
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: 
            {
                is: ["^[a-z]+$",'i'],
                notEmpty: true
            }
        },

        quantity: 
        {
            type: DataTypes.INTEGER,
            allowNull: false  
        },
        
        starting_price:
        {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },

        highest_bid:
        {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0            
        },
      
        highest_bidder:
        {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "none",
            validate: 
            {
                isAlpha: true,
                notEmpty: true
            }
        },

        sold:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        was_listed:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },    
     
    {
        classMethods: 
        {
            associate: function(models) 
            {
            
                usersInventory.belongsTo(models.allUsers, 
                {
                    foreignKey: 
                    {
                        allowNull: false
                    }
                });
            }
        },
        
        freezeTableName: true,
        timestamps: false
    });
  return usersInventory;

};
