package pt.rasbet.backend.projection;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface ApostaView {
    Long getId();

    Float getValor();

    Float getValorOdd();

    String getEstado();

    Float getValorGanho();

    @JsonFormat(pattern="dd-MM-yyyy HH:mm")
    LocalDateTime getCreatedAt();

    pt.rasbet.backend.projection.JogoView.OpcaoApostaView getOpcaoAposta();

    @Value("#{target.opcaoAposta?.jogo ?: null}")
    JogoView getJogo();

    interface JogoView{
        Long getId();

        @JsonFormat(pattern="dd-MM-yyyy HH:mm")
        LocalDateTime getDate();

        String getHomeTeam();

        String getAwayTeam();

        Boolean getComplete();

        String getResultado();

        String getVencedor();

        pt.rasbet.backend.projection.JogoView.TipoView getTipo();
    }
}
