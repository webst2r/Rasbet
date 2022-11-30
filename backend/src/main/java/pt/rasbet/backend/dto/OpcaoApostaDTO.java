package pt.rasbet.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.rasbet.backend.entity.OpcaoAposta;
import pt.rasbet.backend.utils.ExceptionConstants;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OpcaoApostaDTO {
    @NotBlank(message = "type " + ExceptionConstants.REQUIRED)
    private String type;
    private Float odd;

    public OpcaoAposta toEntity(){
        return new OpcaoAposta(this.getOdd(), this.type);
    }

}
