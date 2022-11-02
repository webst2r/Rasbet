package pt.rasbet.backend.entity;

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

    @CreatedDate
    @CreationTimestamp
    @JsonFormat(pattern="dd-MM-yyyy HH:mm")
    @Column(
            name = "created_at"
    )
    private LocalDateTime createdAt;

    @ManyToOne()
    @JoinColumn(name= "id_user", nullable = false)
    private User user;


    @OneToMany(mappedBy="apostasMultiplas", cascade = CascadeType.ALL)
    private Set<Aposta> apostas =  new HashSet<>();

}
