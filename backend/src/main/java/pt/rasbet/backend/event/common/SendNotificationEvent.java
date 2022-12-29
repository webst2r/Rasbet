package pt.rasbet.backend.event.common;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;
import pt.rasbet.backend.entity.*;
import pt.rasbet.backend.enumeration.ENotificationTypeEnum;

import java.util.List;
import java.util.Set;

@Getter
public class SendNotificationEvent extends ApplicationEvent {

    private final List<Notificacao> notificacoes;

    public SendNotificationEvent(List<Notificacao> notificacoes) {
        super(notificacoes);
        this.notificacoes = notificacoes;
    }

    public static SendNotificationEvent of(List<Notificacao> notificacoes) {
        return new SendNotificationEvent(notificacoes);
    }
}
