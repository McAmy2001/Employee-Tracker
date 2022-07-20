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
    ('Receptionist', 100000, 6),
    ('Office Manager', 100000, 2);

    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES 
      ('David', 'Wallace', 1, null),
      ('Michael', 'Scott', 2, 1),
      ('Dwight', 'Schrute', 3, 2),
      ('Kelly', 'Kapoor', 4, 2),
      ('Stanley', 'Hudson', 5, 2),
      ('Phyllis', 'Lapin', 5, 2),
      ('Jim', 'Halpert', 5, 2),
      ('Angela', 'Martin', 6, 2),
      ('Oscar', 'Martinez', 6, 8),
      ('Kevin', 'Malone', 6, 8),
      ('Pam', 'Beesly', 7, 2);