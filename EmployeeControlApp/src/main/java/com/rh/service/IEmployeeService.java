package com.rh.service;

import com.rh.model.Employee;

import java.util.List;

public interface IEmployeeService {

        public List<Employee> getAllEmployees();
        public Employee getEmployeeById(Integer id);

        public Employee saveEmployee(Employee employee);

        public void deleteEmployee(Employee employee);

        List<Employee> searchEmployees(String query);
}

