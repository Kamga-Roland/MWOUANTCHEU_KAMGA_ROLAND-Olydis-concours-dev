package org.empire.springbootbackend.Repository;

import org.empire.springbootbackend.Model.Entity.Department;
import org.empire.springbootbackend.Model.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartment(Department department);

    List<Employee> findByManager(Employee manager);

//    List<Employee> findByFirstName(String first_name);
//
//    List<Employee> findByLastName(String last_name);
//
//    List<Employee> findByJobTitle(String job_title);
//
//    List<Employee> findByContractActiveDate(LocalDateTime contract_start_date);
}
