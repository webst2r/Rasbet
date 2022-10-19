package pt.um.rasbet.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pt.um.rasbet.enumeration.ExceptionType;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class ExceptionResponse implements Serializable {

    private Date timestamp;
    private String message;
    private String details;
    private ExceptionType type;

    public ExceptionResponse(Date timestamp, String message, String details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }
}
