package pt.rasbet.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tipo")
@Getter
@Setter
@NoArgsConstructor
public class Tipo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nome;

    private Boolean empate;

    @JsonBackReference
    @OneToMany(mappedBy="tipo")
    private Set<Jogo> jogos =  new HashSet<>();

}
