package pt.rasbet.backend.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import pt.rasbet.backend.entity.*;
import pt.rasbet.backend.enumeration.EApostaEstado;
import pt.rasbet.backend.enumeration.ETRansationType;
import pt.rasbet.backend.repository.CarteiraRepository;
import pt.rasbet.backend.repository.TransacoesRepository;
import pt.rasbet.backend.service.ApostaMultiplaService;
import pt.rasbet.backend.service.ApostaService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Component
@RequiredArgsConstructor
@Log4j2
public class JogoExecutor {

    private final ApostaService apostaService;

    private final ApostaMultiplaService apostaMultiplaService;
    private final TransacoesRepository transacoesRepository;
    private final CarteiraRepository carteiraRepository;

    @Transactional
    public void cancelAllApostas(Jogo jogo) {
        List<Aposta> apostas = apostaService.getApostasTerminated(jogo);
         apostas.addAll(apostaService.getApostasMultipleTerminated(jogo));
        apostas.forEach(aposta -> {
            aposta.setEstado(EApostaEstado.CANCEL.name());
        });
        apostaService.saveAll(apostas);
    }

    @Transactional
    public void cancelAllApostasMultiplas(Jogo jogo) {
        List<ApostasMultiplas> apostasMultiplas = apostaMultiplaService.getApostasMultiplasByJogo(jogo);
        apostasMultiplas.forEach(apostasMultipla ->  {
            apostasMultipla.setEstado(EApostaEstado.CANCEL.name());
            apostasMultipla.getApostas().stream().filter(aposta -> !aposta.getEstado().equals(EApostaEstado.CANCEL.name()))
                    .forEach(aposta -> {
                        aposta.setEstado(EApostaEstado.CANCEL.name());
                        apostaService.save(aposta);
                    });
            apostaMultiplaService.save(apostasMultipla);
        });
    }

    @Transactional
    public void updateAllApostas(Jogo jogo) {
        List<Aposta> apostas = apostaService.getApostasTerminated(jogo);
        apostas.forEach(aposta -> {
            if (aposta.getOpcaoAposta().getType().equals(jogo.getVencedor())) {
                float valor = aposta.getValor() * aposta.getValorOdd();
                aposta.setValorGanho(valor);
                aposta.setEstado(EApostaEstado.WON.name());
                apostaService.save(aposta);
                Carteira carteira = aposta.getUser().getCarteira();
                carteira.setSaldo(carteira.getSaldo() + valor);
                carteiraRepository.save(carteira);
                transacoesRepository.save(new Transacoes(carteira, valor, "DEPOSIT", ETRansationType.BET.name()));
            } else {
                aposta.setEstado(EApostaEstado.LOST.name());
                apostaService.save(aposta);
            }
        });
    }

    @Transactional
    public void updateApostasMultiplas(Jogo jogo){
        List<Aposta> apostas = apostaService.getApostasMultipleTerminated(jogo);
        apostas.forEach(aposta -> {
            if(aposta.getOpcaoAposta().getType().equals(jogo.getVencedor())){
                aposta.setEstado(EApostaEstado.WON.name());
            }else {
                aposta.setEstado(EApostaEstado.LOST.name());
            }
            apostaService.save(aposta);
        });
        System.out.println("entrou");
    }

    @Transactional
    public void updateAllApostasMultiplas(Jogo jogo) {
        List<ApostasMultiplas> apostasMultiplas = apostaMultiplaService.getApostasMultiplasByJogo(jogo);
        if (!apostasMultiplas.isEmpty()) {
            apostasMultiplas.forEach(pm -> {
                long lost = pm.getApostas().stream().filter(aposta -> aposta.getEstado().equals(EApostaEstado.LOST.name())).count();
                if(lost > 0){
                    pm.setEstado(EApostaEstado.LOST.name());
                    apostaMultiplaService.save(pm);
                    return;
                }

                long won = pm.getApostas().stream().filter(aposta -> aposta.getEstado().equals(EApostaEstado.WON.name())).count();
                if(won == pm.getApostas().size()){
                    pm.setEstado(EApostaEstado.WON.name());
                    AtomicReference<Float> odd = new AtomicReference<>(1f);
                    pm.getApostas().forEach(aposta -> {
                        odd.updateAndGet(o -> o*aposta.getValorOdd());
                    });
                    pm.setValorTotalGanho(pm.getValor()* odd.get());
                    apostaMultiplaService.save(pm);
                    Carteira carteira = pm.getUser().getCarteira();
                    transacoesRepository.save(new Transacoes(carteira, pm.getValorTotalGanho(), "DEPOSIT", ETRansationType.BET.name()));
                    carteira.setSaldo(carteira.getSaldo() + pm.getValorTotalGanho());
                    carteiraRepository.save(carteira);
                }
            });
        }
        System.out.println("entrou multiplas");
    }

}
