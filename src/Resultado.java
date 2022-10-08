public class Resultado {
    private double odd;
    private Jogo jogo;

    public Resultado(){
        this.odd = 1.0;
    }

    public Resultado(Resultado result){
        this.odd = result.getOdd();
        this.jogo = result.getJogo();
    }

    public double getOdd() {
        return this.odd;
    }

    public Jogo getJogo() {
        return this.jogo;
    }

    public Resultado clone(){
        return new Resultado(this);
    }
}
