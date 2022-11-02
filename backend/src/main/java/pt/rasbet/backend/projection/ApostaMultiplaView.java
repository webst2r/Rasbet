package pt.rasbet.backend.projection;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

public interface ApostaMultiplaView {
    Long getId();

    Float getValor();

    String getEstado();

    Float getValorTotalGanho();

    @JsonFormat(pattern="dd-MM-yyyy HH:mm")
    LocalDateTime getCreatedAt();

    List<ApostaView> getApostas();

}
