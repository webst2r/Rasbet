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
public class BookmakerDTO {
    private String key;
    private LocalDateTime lastUpdated;
    private List<MarketDTO> markets = new ArrayList<>();
}
