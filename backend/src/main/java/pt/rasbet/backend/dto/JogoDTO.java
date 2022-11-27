package pt.rasbet.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.rasbet.backend.entity.Jogo;
import pt.rasbet.backend.utils.ExceptionConstants;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JogoDTO {
    @NotBlank(message = "homeTeam " + ExceptionConstants.REQUIRED)
    private String homeTeam;
    @NotBlank(message = "awayTeam " + ExceptionConstants.REQUIRED)
    private String awayTeam;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;
    private Long idTipo;

    public Jogo toEntity(){
        return new Jogo(this.homeTeam, this.awayTeam, this.date);
    }
}
