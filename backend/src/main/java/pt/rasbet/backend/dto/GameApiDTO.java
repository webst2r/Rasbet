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
    private List<BookmakerDTO> bookmakers = new ArrayList<>();


}

