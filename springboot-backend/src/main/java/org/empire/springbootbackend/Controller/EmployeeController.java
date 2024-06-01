package org.empire.springbootbackend.Controller;

import org.empire.springbootbackend.Model.Entity.Department;
import org.empire.springbootbackend.Model.Entity.Employee;
import org.empire.springbootbackend.Repository.DepartmentRepository;
import org.empire.springbootbackend.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    // get all employees rest API
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    };

    // create employee rest API
    @PostMapping("/employees")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeRepository.save(employee);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedEmployee.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedEmployee);
    };

    // get employee by id rest API
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    };

    // update employee rest API
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = employeeRepository.findById(id)
                .map(employee -> {
                    employee.setFirst_name(employeeDetails.getFirst_name());
                    employee.setLast_name(employeeDetails.getLast_name());
                    return employeeRepository.save(employee);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found with id:" + id));

        return ResponseEntity.ok(updatedEmployee);
    };

    // delete employee by id rest API
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employeeRepository.delete(employee);
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found with id: " + id));
    };

    // API to get employees working under a manager
    @GetMapping("employees/manager/{id}")
    public ResponseEntity<List<Employee>> getEmployeesByManager(@PathVariable Long id) {
        Employee manager = new Employee();
        manager.setId(id);

        return ResponseEntity.ok(employeeRepository.findByManager(manager));
    }

    // API to get employees by department
    @GetMapping("/employees/department/{id}")
    public ResponseEntity<List<Employee>> getEmployeesByDepartment(@PathVariable Long id) {
        Department department = new Department();
        department.setId(id);

        return ResponseEntity.ok(employeeRepository.findByDepartment(department));
    }

    // API to search employees by criteria
//    @PostMapping("/search")
//   public List<Employee> searchEmployeeByFirstName( String first_name) {
//        return employeeRepository.findByFirstName(first_name);
//   }
}
