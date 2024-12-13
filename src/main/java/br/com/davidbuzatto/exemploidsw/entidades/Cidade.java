package br.com.davidbuzatto.exemploidsw.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Prof. Dr. David Buzatto
 */
@Entity
@Data
@AllArgsConstructor 
@NoArgsConstructor
public class Cidade {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;
    
    @NotNull
    @NotEmpty
    private String nome;
    
    @NotNull
    @ManyToOne
    private Estado estado;
    
}
