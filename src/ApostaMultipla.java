import java.util.ArrayList;
import java.util.List;

public class ApostaMultipla extends Aposta{
    private List<Resultado> resultados;

    public ApostaMultipla(){
        super();
    }

    public ApostaMultipla(ApostaMultipla am){
        this.resultados = am.getResultados();
    }

    public List<Resultado> getResultados() {
        List<Resultado> results = new ArrayList<>();
        for(Resultado r : this.resultados){
            results.add(r.clone());
        }
        return results;
    }

    @Override
    public ApostaMultipla clone() {
        return new ApostaMultipla(this);
    }
}
