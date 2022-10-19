public abstract class Aposta {
    private int estado;
    private double valor;

    public static final int OFF = 0;
    public static final int ON = 1;
    public static final int SUSPENSA = 2;

    public Aposta(){
        this.estado = OFF;
        this.valor = 0.0;
    }

    public Aposta(double valor){
        this.valor = valor;
    }

    public Aposta(Aposta a){
            this.estado = a.getEstado();
            this.valor = a.getValor();
    }

    public int getEstado() {
        return this.estado;
    }

    public double getValor() {
        return this.valor;
    }

    public abstract Aposta clone();
}
