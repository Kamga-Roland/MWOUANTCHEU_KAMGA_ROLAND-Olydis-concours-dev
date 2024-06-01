package org.empire.springbootbackend.Model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.empire.springbootbackend.Model.Entity.Department;
import org.empire.springbootbackend.Model.Gender;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String first_name;

    private String last_name;

    private Gender gender;

    private String job_title;

    @Column(nullable = false, updatable = false)
    private String contract_start_date;

    private LocalDateTime contract_end_date;

    // a department can have many employees
    @ManyToOne
    @JsonIgnore
    private Department department;

    // employee self-referenced to create a manager-subordinate relationship
    @ManyToOne
    @JoinColumn(name = "manger_id")
    private Employee manager;

}
