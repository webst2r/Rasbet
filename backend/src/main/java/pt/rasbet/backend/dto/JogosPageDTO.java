package pt.rasbet.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.rasbet.backend.projection.JogoView;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JogosPageDTO {
    private PageDTO page;
    private List<JogoView> jogo;

}
