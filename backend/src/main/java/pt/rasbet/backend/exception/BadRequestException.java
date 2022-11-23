package pt.rasbet.backend.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import pt.rasbet.backend.enumeration.ExceptionType;

@Getter
@Setter
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

	private ExceptionType type;

	public BadRequestException(String msg) {
		super(msg);
	}

	public BadRequestException() {
		super();
	}

	public BadRequestException(String msg, ExceptionType type) {
		super(msg);

		this.type = type;
	}
}
