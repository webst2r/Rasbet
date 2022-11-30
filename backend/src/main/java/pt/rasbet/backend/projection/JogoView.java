package pt.rasbet.backend.projection;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

public interface JogoView {
    Long getId();
    LocalDateTime getDate();

    String getHomeTeam();

    String getAwayTeam();

    Boolean getComplete();

    String getResultado();

    String getState();

    TipoView getTipo();

    List<OpcaoApostaView> getOpcaoApostas();

    interface TipoView{
        Long getId();

        String getNome();

        Boolean getEmpate();
    }

    interface OpcaoApostaView{
        Long getId();

        Float getOdd();

        String getType();
    }

}
