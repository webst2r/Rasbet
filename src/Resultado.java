public class Resultado { // V1
    private double odd;

    public Resultado() {
        this.odd = 1.0;
    }

    public Resultado(Resultado result) {
        this.odd = result.getOdd();
    }

    public double getOdd() {
        return this.odd;
    }

    public void setOdd(double odd) {
        this.odd = odd;
    }

    public Resultado clone() {
        return new Resultado(this);
    }
}
