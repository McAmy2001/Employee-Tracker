INSERT INTO departments (dept_name)
VALUES 
  ('Executive'),
  ('Management'),
  ('Customer Service'),
  ('Sales'),
  ('Accounting'),
  ('Reception');

  INSERT INTO roles (job_title, salary, dept_id)
  VALUES 
    ('CEO', 100000, 1),
    ('Regional Manager', 100000, 2),
    ('Assistant to the Regional Manager', 100000, 4),
    ('Customer Service Manager', 100000, 3),
    ('Salesperson', 100000, 4),
    ('Accountant', 100000, 5),
    ('Receptionist', 100000, 6);

    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES 
      ('David', 'Wallace', 1, null),
      ('Michael', 'Scott', 2, null),
      ('Dwight', 'Schrute', 3, null),
      ('Kelly', 'Kapoor', 4, null),
      ('Stanley', 'Hudson', 5, null),
      ('Phyllis', 'Lapin', 5, null),
      ('Jim', 'Halpert', 5, null),
      ('Angela', 'Martin', 6, null),
      ('Oscar', 'Martinez', 6, null),
      ('Kevin', 'Malone', 6, null),
      ('Pam', 'Beesly', 7, null);