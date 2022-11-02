package pt.rasbet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pt.rasbet.backend.dto.ApostaMultiplaDTO;
import pt.rasbet.backend.entity.*;
import pt.rasbet.backend.enumeration.EApostaEstado;
import pt.rasbet.backend.enumeration.ETRansationType;
import pt.rasbet.backend.repository.ApostaMultiplaRepository;
import pt.rasbet.backend.repository.CarteiraRepository;
import pt.rasbet.backend.repository.TransacoesRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class ApostaMultiplaService {

    private final ApostaMultiplaRepository apostaMultiplaRepository;
    private final TransacoesRepository transacoesRepository;
    private final CarteiraRepository carteiraRepository;
    private final UserService userService;
    private final OpcaoApostaService opcaoApostaService;

    @Transactional
    public void save(ApostaMultiplaDTO apostaMultiplaDTO){
        User user = this.userService.findById(apostaMultiplaDTO.getId());
        Set<Aposta> apostas = new HashSet<>();
        ApostasMultiplas apostasMultiplas = new ApostasMultiplas();
        apostaMultiplaDTO.getOdds().forEach(odd-> {
            OpcaoAposta opcaoAposta =opcaoApostaService.findById(odd);
            Aposta aposta = new Aposta();
            aposta.setEstado(EApostaEstado.MULTIPLE.name());
            aposta.setValorOdd(opcaoAposta.getOdd());
            aposta.setOpcaoAposta(opcaoAposta);
            aposta.setApostasMultiplas(apostasMultiplas);
            apostas.add(aposta);
        });
        apostasMultiplas.setApostas(apostas);
        apostasMultiplas.setUser(user);
        apostasMultiplas.setValor(apostaMultiplaDTO.getValor());
        apostasMultiplas.setEstado(EApostaEstado.PLACED.name());
        apostaMultiplaRepository.save(apostasMultiplas);
        transacoesRepository.save(createTransaction(user, apostasMultiplas.getValor()));
        user.getCarteira().setSaldo(user.getCarteira().getSaldo() - apostaMultiplaDTO.getValor());
        carteiraRepository.save(user.getCarteira());
    }

    public Transacoes createTransaction(User user, Float value){
        return new Transacoes(user.getCarteira(), value, "RAISE", ETRansationType.BET.name());
    }

    public List<ApostasMultiplas> getApostasMultiplasByJogo(Jogo jogo){
        return apostaMultiplaRepository.findApostasMultiplasByJogos(jogo, EApostaEstado.PLACED.name());
    }

    @Transactional
    public void updateApostasMultiplas(Jogo jogo){
        List<ApostasMultiplas> apostasMultiplas = getApostasMultiplasByJogo(jogo);
        if (!apostasMultiplas.isEmpty()) {
            apostasMultiplas.forEach(pm -> {
                long lost = pm.getApostas().stream().filter(aposta -> aposta.getEstado().equals(EApostaEstado.LOST.name())).count();
                if(lost > 0){
                    pm.setEstado(EApostaEstado.LOST.name());
                    apostaMultiplaRepository.save(pm);
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
                    apostaMultiplaRepository.save(pm);
                    Carteira carteira = pm.getUser().getCarteira();
                    transacoesRepository.save(new Transacoes(carteira, pm.getValorTotalGanho(), "DEPOSIT", ETRansationType.BET.name()));
                    carteira.setSaldo(carteira.getSaldo() + pm.getValorTotalGanho());
                    carteiraRepository.save(carteira);
                }
            });
        }
    }
}
