package pt.rasbet.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "jogo",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = "id_api")
})
@Getter
@Setter
@NoArgsConstructor
public class Jogo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false)
    private LocalDateTime date;

    @Column(nullable = false)
    private String homeTeam;

    @Column(nullable = false)
    private String awayTeam;

    @Column(nullable = false)
    private String vencedor;

    private String resultado;

    private String id_api;

    @ManyToOne()
    @JoinColumn(name= "id_tipo", nullable = false)
    private Tipo tipo;

    @OneToMany(mappedBy="jogo")
    private Set<OpcaoAposta> opcaoApostas =  new HashSet<>();

}
