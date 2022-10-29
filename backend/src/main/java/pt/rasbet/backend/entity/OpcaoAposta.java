package pt.rasbet.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "opcaoAposta")
@Getter
@Setter
@NoArgsConstructor
public class OpcaoAposta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private Float odd;

    private String type;

    @ManyToOne()
    @JoinColumn(name= "id_jogo", nullable = false)
    private Jogo jogo;

    @JsonBackReference
    @OneToMany(mappedBy="opcaoAposta")
    private Set<Aposta> apostas =  new HashSet<>();
}
