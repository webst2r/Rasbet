public abstract class Utilizador {
    private String username;
    private String password;

    public Utilizador(String username, String password){
        this.username = username;
        this.password = password;
    }


    public Utilizador(Utilizador usr){
            this.username = usr.getUsername();
            this.password = usr.getPassword();
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public boolean equals(Object obj){
        if(this == obj) return true;
        if(obj == null || this.getClass() != obj.getClass()) return false;
        Utilizador utilizador = (Utilizador) obj;
        return this.username.equals(utilizador.getUsername())
                && this.password.equals(utilizador.getPassword());
    }
    public abstract Utilizador clone();
}
