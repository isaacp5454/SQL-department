INSERT INTO department (name)
VALUES ("marketing"),
        ("management"),
        ("security"),
        ("human-resources"),
        ("health");
INSERT INTO role (title,salary,department_id)
VALUES ("graphic designer",60000,1),
        ("regional manager",130000,2),
        ("restaurant manager",87000,2),
        ("bodyguard",70000,3),
        ("security guard", 30000,3),
        ("HR manager",100000,4),
        ("doctor",480000,5),
        ("nurse",40000,5),
        ("chiropractor",80000,5);

    INSERT INTO employee (first_name,last_name,role_id,manager_id)
    VALUES ("Isaac","Park",7,NULL),
            ("George","Kourdahi",2,1),
            ("Desmond","Prado",3,1),
            ("Colby","Saysanith",9,NULL),
            ("Billy","Lutali",5,1),
            ("Ethan","Harber",8,1),
            ("Esther","Park",1,NULL),
            ("Susan","Park",4,1),
            ("Abel","Nigussu",7,1),
            ("Jason","Cho",8,1),
            ("Raymond","Ro",1,1),
            ("Konrad","Green",2,NULL),
            ("Danny","Holzshoe",5,1);