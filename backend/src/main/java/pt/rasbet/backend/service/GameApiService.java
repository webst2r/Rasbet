package pt.rasbet.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pt.rasbet.backend.dto.GameApiDTO;
import pt.rasbet.backend.entity.Jogo;
import pt.rasbet.backend.entity.OpcaoAposta;
import pt.rasbet.backend.entity.Tipo;
import pt.rasbet.backend.repository.TipoRepository;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static pt.rasbet.backend.enumeration.EOutcomeType.*;
import static pt.rasbet.backend.enumeration.ETipo.FOOTBALL;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameApiService {

    @Value("${gamesURL}")
    private String url;

    private final TipoRepository tipoRepository;
    private final ObjectMapper objectMapper;

    public List<Jogo> getGames() {

        RestTemplate restTemplate = new RestTemplate();
        Object object = restTemplate.getForObject(url, Object.class);
        List<GameApiDTO> gameApiDTOS = objectMapper.convertValue(object, new TypeReference<List<GameApiDTO>>() {
        });
        assert gameApiDTOS != null;
        return convertToJogo(gameApiDTOS);
    }

    public List<Jogo> convertToJogo(List<GameApiDTO> gameApiDTOS) {
        List<Jogo> jogos = new ArrayList<>();
        Tipo tipo = tipoRepository.findByNome(FOOTBALL.name()).get();
        gameApiDTOS.forEach(gameApiDTO -> {
            Jogo jogo = new Jogo();
            jogo.setIdApi(gameApiDTO.getId());
            jogo.setDate(gameApiDTO.getCommenceTime());
            jogo.setHomeTeam(gameApiDTO.getHomeTeam());
            jogo.setAwayTeam(gameApiDTO.getAwayTeam());
            jogo.setComplete(gameApiDTO.getCompleted());
            if (gameApiDTO.getCompleted()) {
                jogo.setResultado(gameApiDTO.getScores());
                Integer homeTeam = getHomeTeamResult(gameApiDTO.getScores());
                Integer awayTeam = getAwayTeamResult(gameApiDTO.getScores());
                if (homeTeam > awayTeam) {
                    jogo.setVencedor(HOME_TEAM.name());
                } else if (awayTeam > homeTeam) {
                    jogo.setVencedor(AWAY_TEAM.name());
                }else {
                    jogo.setVencedor(DRAW.name());
                }

            }
            Set<OpcaoAposta> opcaoApostas = new HashSet<>();
            gameApiDTO.getBookmakers().stream().filter(bookmakerDTO -> bookmakerDTO.getKey().equals("betclic"))
                    .forEach(bookmaker -> {
                        bookmaker.getMarkets().get(0).getOutcomes().forEach(outcomeDTO -> {
                            if (outcomeDTO.getName().equals(jogo.getHomeTeam())) {
                                opcaoApostas.add(new OpcaoAposta(outcomeDTO.getPrice(), HOME_TEAM.name()));
                            } else if (outcomeDTO.getName().equals(jogo.getAwayTeam())) {
                                opcaoApostas.add(new OpcaoAposta(outcomeDTO.getPrice(), AWAY_TEAM.name()));
                            } else {
                                opcaoApostas.add(new OpcaoAposta(outcomeDTO.getPrice(), DRAW.name()));
                            }
                        });
                    });
            jogo.setOpcaoApostas(opcaoApostas);
            jogo.setTipo(tipo);
            jogos.add(jogo);
        });
        return jogos;
    }

    private Integer getHomeTeamResult(String result) {
        Pattern pattern = Pattern.compile("([^x]+)");
        Matcher matcher = pattern.matcher(result);

        int value = 0;
        if (matcher.find()) {
            System.out.println("home team - " + matcher.group(0));
            value = Integer.parseInt(matcher.group(0));
        }
        return value;
    }

    private Integer getAwayTeamResult(String result) {
        Pattern pattern = Pattern.compile("([^x]*$)");
        Matcher matcher = pattern.matcher(result);
        int value = 0;
        if(matcher.find()) {
            System.out.println("away team - " + matcher.group(0));
            value = Integer.parseInt(matcher.group(0));
        }
        return value;
    }

}
