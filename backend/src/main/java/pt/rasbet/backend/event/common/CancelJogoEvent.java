package pt.rasbet.backend.event.common;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;
import pt.rasbet.backend.entity.Jogo;

@Getter
public class CancelJogoEvent extends ApplicationEvent {

    private final Jogo jogo;
    private CancelJogoEvent(Jogo jogo) {
        super(jogo);
        this.jogo = jogo;

    }

    public static CancelJogoEvent of(Jogo jogo) {
        return new CancelJogoEvent(jogo);
    }

}
