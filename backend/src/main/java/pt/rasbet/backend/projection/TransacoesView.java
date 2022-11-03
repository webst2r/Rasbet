package pt.rasbet.backend.projection;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public interface TransacoesView {

    Long getId();

    @JsonFormat(pattern="dd-MM-yyyy HH:mm")
    LocalDateTime getCreatedAt();

    Float getValor();

    String getTipo();

    String getTipoDeposit();
}
