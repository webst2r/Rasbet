package pt.rasbet.backend.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import pt.rasbet.backend.event.common.CancelJogoEvent;
import pt.rasbet.backend.event.common.UpdateApostasEvent;

@Component
@RequiredArgsConstructor
@Log4j2
public class EventListenerHandler {
    private final JogoExecutor jogoExecutor;

    @Async
    @EventListener
    public void handleAsyncCancelJogoEvent(CancelJogoEvent cancelJogoEvent) {
        var jogo = cancelJogoEvent.getJogo();
        jogoExecutor.cancelAllApostas(jogo);
        jogoExecutor.cancelAllApostasMultiplas(jogo);
        log.info("Cancel all bets of game: {}", jogo.getId());
    }

    @Async
    @EventListener
    public void handleAsyncCompleteJogoEvent(UpdateApostasEvent updateApostasEvent) {
        var jogo = updateApostasEvent.getJogo();
        jogoExecutor.updateAllApostas(jogo);
        jogoExecutor.updateApostasMultiplas(jogo);
        jogoExecutor.updateAllApostasMultiplas(jogo);
        log.info("Complete all bets of game: {}", jogo.getId());
    }
}
