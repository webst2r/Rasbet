import java.util.HashMap;
import java.util.Map;

public class ApostaMultipla extends Aposta{
    private Map<Integer, Resultado> resultadosEscolhidos; // ex: JogoA -> V1

    public ApostaMultipla(){
        super();
        this.resultadosEscolhidos = new HashMap<>();
    }

    public ApostaMultipla(ApostaMultipla am){
        super(am.getValor());
        this.resultadosEscolhidos = am.getResultadosEscolhidos();
    }

    public Map<Integer,Resultado> getResultadosEscolhidos() {
        Map<Integer, Resultado> results = new HashMap<>();

        for (Map.Entry<Integer, Resultado> entry : this.resultadosEscolhidos.entrySet()) {
            results.put(entry.getKey(),
                    entry.getValue());
        }
        return results;
    }

    @Override
    public ApostaMultipla clone() {
        return new ApostaMultipla(this);
    }
}
