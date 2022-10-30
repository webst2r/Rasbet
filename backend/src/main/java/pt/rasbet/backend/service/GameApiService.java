package pt.rasbet.backend.service;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pt.rasbet.backend.dto.GameApiDTO;

import java.util.List;

@Service
@Slf4j
public class GameApiService {

    public List<GameApiDTO> getGames() {

        RestTemplate restTemplate = new RestTemplate();
        List<GameApiDTO> quote = restTemplate.getForObject(
                "http://ucras.di.uminho.pt/v1/games/", List.class);
        return quote;
    }

}
