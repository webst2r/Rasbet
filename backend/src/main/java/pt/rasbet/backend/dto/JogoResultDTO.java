package pt.rasbet.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.rasbet.backend.utils.ExceptionConstants;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JogoResultDTO {
    @NotBlank(message = "homeTeam " + ExceptionConstants.REQUIRED)
    private String resultado;
    @NotBlank(message = "awayTeam " + ExceptionConstants.REQUIRED)
    private String vencedor;
}