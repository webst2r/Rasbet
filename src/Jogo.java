import java.util.ArrayList;
import java.util.List;

public class Jogo {
    private Desporto desporto;
    private List<Resultado> resultados;

    public Jogo(Desporto desporto, List<Resultado> resultados){
        this.desporto = desporto;
        this.resultados = resultados;
    }

    public Jogo(Jogo jogo){
        this.desporto = jogo.getDesporto();
        this.resultados = jogo.getResultados();
    }

    public Desporto getDesporto() {
        return this.desporto;
    }

    public List<Resultado> getResultados() {
        List<Resultado> results = new ArrayList<>();
        for(Resultado r : this.resultados){
            results.add(r.clone());
        }
        return results;
    }

    public Jogo clone() {
        return new Jogo(this);
    }
}
