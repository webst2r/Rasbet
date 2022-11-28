package pt.rasbet.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PageDTO {
    private Integer size;
    private Long totalElements;
    private Integer totalPages;
    private Integer number;
}
