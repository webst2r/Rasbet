package pt.rasbet.backend.event.common;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;
import pt.rasbet.backend.entity.Jogo;

@Getter
public class UpdateApostasEvent extends ApplicationEvent {

    private final Jogo jogo;

    public UpdateApostasEvent(Jogo jogo) {
        super(jogo);
        this.jogo = jogo;
    }

    public static UpdateApostasEvent of(Jogo jogo){
        return new UpdateApostasEvent(jogo);
    }
}
