package pt.rasbet.backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "transacoes")
@Getter
@Setter
@NoArgsConstructor
public class Transacoes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private Float valor;

    @Column(nullable = false)
    private String tipo;

    @ManyToOne()
    @JoinColumn(name= "id_carteira", nullable = false)
    private Carteira carteira;

}
