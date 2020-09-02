CREATE TABLE item (
    item_id int unsigned not null primary key,
    item_name varchar(50) not null,
    item_price int unsigned not null,
    item_desc varchar(200) not null,
    trans_post boolean default false not null,
    trans_face boolean default false not null,
    trans_null boolean default false not null,
    old_new_rate int unsigned not null
);

INSERT INTO item
    (item_name, item_price, item_desc, trans_post, trans_face, trans_null, old_new_rate)
VALUES
    ('SampleName1', 100, 'SampleDesc1', true, true, true, 95);