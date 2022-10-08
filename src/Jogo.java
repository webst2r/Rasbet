import java.util.ArrayList;
import java.util.List;

public class Jogo {
    private String ladoA;
    private String ladoB;
    private List<Resultado> resultados;

    public Jogo(String ladoA, String ladoB, List<Resultado> resultados){
        this.ladoA = ladoA;
        this.ladoB = ladoB;
        this.resultados = resultados;
    }

    public Jogo(Jogo jogo){
        this.ladoA = jogo.getLadoA();
        this.ladoB = jogo.getLadoB();
        this.resultados = jogo.getResultados();
    }

    public String getLadoA() {
        return this.ladoA;
    }

    public String getLadoB() {
        return this.ladoB;
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
