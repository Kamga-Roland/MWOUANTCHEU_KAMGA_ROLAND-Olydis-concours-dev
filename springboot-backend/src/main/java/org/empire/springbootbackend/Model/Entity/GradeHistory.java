package org.empire.springbootbackend.Model.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class GradeHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String grade;

    @Column(nullable = false)
    private LocalDateTime from_date;

    private LocalDateTime to_date;

    // an employee can have many grade histories
    @ManyToOne
    private Employee employee;
}
