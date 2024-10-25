package com.rh.repository;

import com.rh.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {


    // Customised query to search for employees by name or department
    @Query("SELECT e FROM Employee e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(e.department) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Employee> searchByQuery(@Param("query") String query);}
