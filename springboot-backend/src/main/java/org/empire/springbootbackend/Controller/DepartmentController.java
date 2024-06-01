package org.empire.springbootbackend.Controller;

import org.empire.springbootbackend.Model.Entity.Department;
import org.empire.springbootbackend.Repository.DepartmentRepository;
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
public class DepartmentController {

    @Autowired
    private final DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    // get all departments rest API
    @GetMapping("/departments")
    public List<Department> getAllDepartment() {
        return departmentRepository.findAll();
    }

    // get department by id rest API
    @GetMapping("/departments/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        return departmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // create department rest API
    @PostMapping("/departments")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        Department saveDepartment = departmentRepository.save(department);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saveDepartment.getId())
                .toUri();
        return ResponseEntity.created(location).body(saveDepartment);
    }

    // update department rest API
    @PutMapping("/departments/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department departmentDetails) {
        Department updatedDepartment = departmentRepository.findById(id)
                .map(department -> {
                    department.setName(departmentDetails.getName());
                    return departmentRepository.save(department);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "department not found with id " + id));

        return ResponseEntity.ok(updatedDepartment);
    }

    // delete department rest API
    @DeleteMapping("/departments/{id}")
    public ResponseEntity<?> deleteDepartment(@PathVariable Long id) {
        return departmentRepository.findById(id)
                .map(department -> {
                    departmentRepository.delete(department);
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "department not found with id "+ id));
    }
}
