package pt.rasbet.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Column(nullable = false)
    private String tipoDeposit;

    @CreatedDate
    @CreationTimestamp
    @JsonFormat(pattern="dd-MM-yyyy HH:mm")
    @Column(
            name = "created_at"
    )
    private LocalDateTime createdAt;

    @ManyToOne()
    @JoinColumn(name= "id_carteira", nullable = false)
    private Carteira carteira;

    public Transacoes (Carteira carteira, Float valor, String tipo, String tipoDeposit){
        this.carteira = carteira;
        this.tipoDeposit = tipoDeposit;
        this.valor = valor;
        this.tipo = tipo;
    }

}
