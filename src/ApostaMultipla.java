import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApostaMultipla extends Aposta{
    private Map<Integer, Resultado> escolhas; // ex: JogoA -> V1

    public ApostaMultipla(){
        super();
        this.escolhas = new HashMap<>();
    }

    public ApostaMultipla(ApostaMultipla am){
        super(am.getValor());
        this.escolhas = am.getEscolhas();
    }

    public Map<Integer,Resultado> getEscolhas() {
        Map<Integer, Resultado> es = new HashMap<>();

        for (Map.Entry<Integer, Resultado> entry : es.entrySet()) {
            es.put(entry.getKey(),
                    entry.getValue());
        }
        return es;
    }

    @Override
    public ApostaMultipla clone() {
        return new ApostaMultipla(this);
    }
}
