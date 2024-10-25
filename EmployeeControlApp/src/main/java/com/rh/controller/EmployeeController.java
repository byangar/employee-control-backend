package com.rh.controller;

import com.rh.exception.ResourceNotFoundException;
import com.rh.model.Employee;
import com.rh.service.IEmployeeService;
import com.rh.util.ExcelExportUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
// http://localhost:8080/employees-app/
@RequestMapping("employees-app")
@CrossOrigin(value = "http://localhost:3000") // receive requests from react
public class EmployeeController {

    //Send information to console
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private IEmployeeService employeeService;

    // http://localhost:8080/employees-app/employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        employees.forEach(employee -> logger.info(employee.getName())); // Send to console
        return employees;
    }

    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee employee) {
        return this.employeeService.saveEmployee(employee);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Integer id) {
        Employee employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            throw new ResourceNotFoundException("No employee found with id " + id);
        } else{
            return ResponseEntity.ok(employee);
        }
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Integer id, @RequestBody Employee employeeReceived) {
        Employee employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            throw new ResourceNotFoundException("No employee found with id " + id);
        } else{
            employee.setName(employeeReceived.getName());
            employee.setDepartment(employeeReceived.getDepartment());
            employee.setSalary(employeeReceived.getSalary());
            employeeService.saveEmployee(employee);
            return ResponseEntity.ok(employee);
        }
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable Integer id) {
        Employee employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            throw new ResourceNotFoundException("No employee found with id " + id);
        } else{
            employeeService.deleteEmployee(employee);
            return ResponseEntity.ok(employee);
        }
    }

    // Endpoint to export employee data to Excel
    @GetMapping("/employees/export")
    public ResponseEntity<byte[]> exportEmployees() {
        // Retrieve the list of all employees from the service layer
        List<Employee> employees = employeeService.getAllEmployees();
        try {
            // Use the utility class to convert the list of employees into an Excel file
            ByteArrayOutputStream baos = ExcelExportUtils.exportEmployeesToExcel(employees);
            // Convert the ByteArrayOutputStream to ByteArrayInputStream for use in the response
            ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
            // Set up HTTP headers to specify the content disposition and file name
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=employees.xlsx");

            // Return the Excel file as a byte array, with the appropriate headers and HTTP status code
            return new ResponseEntity<>(bais.readAllBytes(), headers, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint for employee search
    @GetMapping("/employees/search")
    public ResponseEntity<List<Employee>> searchEmployees(@RequestParam("query") String query) {
        List<Employee> employees = employeeService.searchEmployees(query);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

}
