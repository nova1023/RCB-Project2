-- users seeds
INSERT 
allUsers (username, password, balance, money_spent, money_earned) 
VALUES 
("Leslie", "waffles", 650, 900, 1900),
("Ben", "dunshire", 1200, 2300, 6850),
("Tom", "swag", 200, 745, 1000),
("Jerry", "Garry", 150, 2300, 1500);

-- user inventory seeds
INSERT 
usersInventory (item_name, quantity, allUserId) 
VALUES
-- Leslie items
("fashion", 30, 1),
("collectables", 24, 1),
("electronics", 5, 1),
-- Ben items
("fashion", 3, 2),
("collectables", 60, 2),
("electronics", 45, 2),
-- Tom items
("fashion", 90, 3),
("collectables", 40, 3),
("electronics", 9, 3),
-- Jerry items
("fashion", 2, 4),
("collectables", 100, 4),
("electronics", 20, 4);

-- itemsForSale seeds
INSERT 
itemsForSale (item_name, quantity, starting_price, highest_bid, createdAt, allUserId)
VALUES
-- Leslie itemForSale
("fashion", 1, 45, 50, CURRENT_TIMESTAMP, 1),
-- Ben itemForSale
("electronics", 1, 80, 0, CURRENT_TIMESTAMP, 2),
-- Tom itemForSale
("fashion", 1, 90, 120, CURRENT_TIMESTAMP, 3),
-- Jerry itemForSale
("collectables", 1, 20, 0, CURRENT_TIMESTAMP, 4);


-- warehouseItems-seeds
INSERT INTO warehouseItems (item_name, category, units_sold, price, warehouse_name) 
VALUES ("electronics", "electronics", 25, 200, "warehouse1"),
("fashion", "fashion", 53, 15, "warehouse2"),
("collectables", "collectables", 10, 125, "warehouse3");









