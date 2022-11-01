package pt.rasbet.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "carteira")
@Getter
@Setter
@NoArgsConstructor
public class Carteira {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private Float saldo;

    @JsonBackReference(value = "user")
    @OneToOne(mappedBy = "carteira")
    private User user;

    @JsonBackReference(value = "transacoes")
    @OneToMany(mappedBy="carteira")
    private Set<Transacoes> transacoes =  new HashSet<>();

    public Carteira(Float saldo, User user){
        this.saldo = saldo;
        this.user = user;
    }

}
