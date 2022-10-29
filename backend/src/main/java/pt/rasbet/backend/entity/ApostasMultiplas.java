package pt.rasbet.backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "apostasMultiplas")
@Getter
@Setter
@NoArgsConstructor
public class ApostasMultiplas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private Float valor;

    private String estado;

    private Float valorTotalGanho;

    @ManyToOne()
    @JoinColumn(name= "id_user", nullable = false)
    private User user;

}