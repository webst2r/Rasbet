package pt.rasbet.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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

    private Boolean activeNotification =  true;

    @CreatedDate
    @CreationTimestamp
    @JsonFormat(pattern="dd-MM-yyyy HH:mm")
    @Column(
            name = "created_at"
    )
    private LocalDateTime createdAt;
    @ManyToOne()
    @JoinColumn(name= "id_odd", nullable = false)
    private OpcaoAposta opcaoAposta;

    @ManyToOne()
    @JoinColumn(name= "id_user")
    private User user;

    @JsonBackReference(value = "apostasMultiplas")
    @ManyToOne()
    @JoinColumn(name= "id_multipla")
    private ApostasMultiplas apostasMultiplas;

    @OneToMany(mappedBy="aposta", cascade = CascadeType.ALL)
    private Set<Notificacao> notifications =  new HashSet<>();

}
