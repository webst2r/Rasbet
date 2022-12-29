package pt.rasbet.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import pt.rasbet.backend.enumeration.ENotificationTypeEnum;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notificacao")
@Getter
@Setter
@NoArgsConstructor
public class Notificacao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ENotificationTypeEnum type;

    @CreatedDate
    @CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    @Column(
            name = "date"
    )
    private LocalDateTime date;

    @JsonBackReference(value = "jogo")
    @ManyToOne()
    @JoinColumn(name = "id_jogo")
    private Jogo jogo;

    @JsonBackReference(value = "aposta")
    @ManyToOne()
    @JoinColumn(name = "id_aposta")
    private Aposta aposta;

    @JsonBackReference(value = "apostasMultiplas")
    @ManyToOne()
    @JoinColumn(name = "id_aposta_multipla")
    private ApostasMultiplas apostasMultiplas;

    public Notificacao(ENotificationTypeEnum type, Jogo jogo) {
        this.type = type;
        this.jogo = jogo;
    }

    public Notificacao(ENotificationTypeEnum type, Aposta aposta) {
        this.type = type;
        this.aposta = aposta;
    }

    public Notificacao(ENotificationTypeEnum type, ApostasMultiplas apostasMultiplas) {
        this.type = type;
        this.apostasMultiplas = apostasMultiplas;
    }
}
