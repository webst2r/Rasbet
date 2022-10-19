public class ApostaSimples extends Aposta{
    private int idJogo;
    private Resultado resultadoEscolhido;

    public ApostaSimples(){
        super();
        this.idJogo = 0;
        this.resultadoEscolhido = null;
    }

    public ApostaSimples(ApostaSimples as){
        this.idJogo = as.getIdJogo();
        this.resultadoEscolhido = as.getResultadoEscolhido();
    }

    public int getIdJogo() {
        return this.idJogo;
    }

    public Resultado getResultadoEscolhido() {
        return this.resultadoEscolhido.clone();
    }

    public ApostaSimples clone() {
        return new ApostaSimples(this);
    }
}
