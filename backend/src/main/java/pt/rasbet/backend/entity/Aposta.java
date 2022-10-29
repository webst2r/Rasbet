package pt.rasbet.backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "aposta")
@Getter
@Setter
@NoArgsConstructor
public class Aposta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private Float valor;

    private Float valorOdd;

    private String estado;

    private Float valorGanho;

    @ManyToOne()
    @JoinColumn(name= "id_odd", nullable = false)
    private OpcaoAposta opcaoAposta;

    @ManyToOne()
    @JoinColumn(name= "id_user", nullable = false)
    private User user;

}
