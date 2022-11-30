package pt.rasbet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pt.rasbet.backend.dto.ApostaMultiplaDTO;
import pt.rasbet.backend.dto.CountMultiplasApostasUser;
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
    public CountMultiplasApostasUser getApostasMultiplasCountByUser(Long userId){
     return new CountMultiplasApostasUser(
              this.apostaMultiplaRepository.countApostasMultiplasByUser_IdAndAndEstado(userId,  EApostaEstado.WON.name()),
        this.apostaMultiplaRepository.countApostasMultiplasByUser_IdAndAndEstado(userId,  EApostaEstado.LOST.name())
      );
    }

    public ApostasMultiplas save(ApostasMultiplas apostasMultiplas){
        return apostaMultiplaRepository.save(apostasMultiplas);
    }
}
