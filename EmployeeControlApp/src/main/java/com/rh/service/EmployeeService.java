package com.rh.service;

import com.rh.model.Employee;
import com.rh.repository.EmployeeRepository;
import com.rh.util.ExcelExportUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired  // Inject repository layer to service
    private EmployeeRepository employeeRepository;

    // Retrieve all employees from the repository
    @Override
    public List<Employee> getAllEmployees() {
        return this.employeeRepository.findAll();
    }

    // Retrieve an employee by ID
    @Override
    public Employee getEmployeeById(Integer id) {
        Employee employee = employeeRepository.findById(id).orElse(null); // Return null if not found
        return employee;

    }

    // Save or update an employee
    @Override
    public Employee saveEmployee(Employee employee) {
        return this.employeeRepository.save(employee);
    }

    // Delete an employee
    @Override
    public void deleteEmployee(Employee employee) {
        this.employeeRepository.delete(employee);
    }

    @Override
    public List<Employee> searchEmployees(String query) {
        return employeeRepository.searchByQuery(query);
    }


}
