package pt.rasbet.backend.projection;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Value;
import pt.rasbet.backend.entity.Aposta;
import pt.rasbet.backend.entity.ApostasMultiplas;
import pt.rasbet.backend.entity.Jogo;

import java.time.LocalDateTime;

public interface UserNotificationView {
    Boolean getRead();

    NotificationView getNotification();

    interface NotificationView {
        Long getId();

        String getType();

        @JsonFormat(pattern="dd-MM-yyyy HH:mm")
        LocalDateTime getDate();

        Jogo getJogo();

        ApostaMultiplaView getApostasMultiplas();

        ApostaView getAposta();
    }

}
