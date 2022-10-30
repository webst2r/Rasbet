package pt.rasbet.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameApiDTO {
    private String id;
    private LocalDateTime commenceTime;
    private Boolean completed;
    private String homeTeam;
    private String awayTeam;
    private String scores;
    private List<Bookmaker> bookmakers = new ArrayList<>();


}

class Market{
    private String key;
    private List<Outcome> outcomes = new ArrayList<>();
}

class Outcome{
    private String name;
    private Float price;
}

class Bookmaker {
    private String key;
    private LocalDateTime lastUpdated;
    private List<Market> markets = new ArrayList<>();
}

