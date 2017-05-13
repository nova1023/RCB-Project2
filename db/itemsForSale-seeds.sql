Use battleBay_db;

INSERT INTO itemsforsale (item_name, quantity, starting_price, highest_bid,  highest_bidder, createdAt, allUserId) 
VALUES ("itemA", 1, 1, 1, "bidderA", current_timestamp, 1);

INSERT INTO itemsforsale (item_name, quantity, starting_price, highest_bid,highest_bidder, createdAt, allUserId) 
VALUES ("itemB", 1, 3, 1, "bidderB", current_timestamp, 3);

INSERT INTO itemsforsale (item_name, quantity, starting_price, highest_bid,highest_bidder, createdAt, allUserId) 
VALUES ("itemC", 1, 2, 1, "bidderC", current_timestamp, 2);


