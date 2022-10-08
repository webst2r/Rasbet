import java.util.List;

public class ApostaSimples extends Aposta{
    private Resultado resultado;

    public ApostaSimples(){
        super();
    }

    public ApostaSimples(ApostaSimples as){
        this.resultado = as.getResultado();
    }

    public Resultado getResultado() {
        return this.resultado;
    }

    public ApostaSimples clone(){
        return new ApostaSimples(this);
    }
}
