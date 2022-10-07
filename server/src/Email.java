
import java.io.FileReader;
import javax.mail.Message;
import javax.mail.Session;
import org.json.JSONArray;
import Servisofts.SConfig;
import org.json.JSONObject;
import java.util.Properties;
import javax.mail.Transport;
import org.json.JSONException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import javax.mail.internet.InternetAddress;

public class Email extends Thread {

    private String host;
    private String port;
    private String user;
    private String pass;

    private JSONObject data;
    private JSONArray mailTo;
    private JSONObject params;

    public Email(JSONArray mailTo, JSONObject data, JSONObject params) {
        this.data = data;
        this.params = params;
        JSONObject mail_server = SConfig.getJSON("mail_server");
        this.mailTo = mailTo;
        this.host = mail_server.getString("host");
        this.port = mail_server.getInt("port") + "";
        this.user = mail_server.getString("email");
        this.pass = mail_server.getString("password");
        this.start();
    }

    public static void main(String[] args) {
        JSONArray arr = new JSONArray();
        arr.put("carlosdanielpaz.cdpa@gmail.com");
        arr.put("ruddypazd@gmail.com");
        arr.put("ricky.paz.d.97@gmail.com");
        JSONObject DATA = new JSONObject();
        DATA.put("subject", "Correo de recuperacion");
        DATA.put("path", "mail/registro_exitoso.html");
        new Email(arr, DATA, new JSONObject());
    }

    @Override
    public void run() {
        try {
            Properties props = new Properties();
            props.setProperty("mail.smtp.host", this.host);
            props.put("mail.smtp.ssl.enable", "true");
            props.setProperty("mail.smtp.port", this.port);
            props.setProperty("mail.smtp.user", this.user);
            props.setProperty("mail.smtp.auth", "true");
            Session session = Session.getDefaultInstance(props);
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(this.user));
            for (int i = 0; i < this.mailTo.length(); i++) {
                message.addRecipient(Message.RecipientType.TO, new InternetAddress(this.mailTo.getString(i)));
            }
            message.setSubject(this.data.getString("subject"));
            message.setContent(getHtml(this.data.getString("path"), this.params), "text/html; charset=UTF-8");
            Transport t = session.getTransport("smtp");
            t.connect(this.user, this.pass);
            t.sendMessage(message, message.getAllRecipients());
            t.close();
            System.out.println("Correo enviado a " + this.mailTo);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private static String getHtml(String path, JSONObject params) throws JSONException {
        String cuerpo = "";
        try {
            FileReader file;
            file = new FileReader(path, StandardCharsets.UTF_8);
            int valor = file.read();
            String configJson = "";
            while (valor != -1) {
                configJson = String.valueOf(((char) valor));
                cuerpo = cuerpo + configJson;
                valor = file.read();
            }
            file.close();
            if (params != null) {
                for (String key : params.keySet()) {
                    cuerpo = cuerpo.replace("{" + key + "}", params.getString(key));
                }
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return cuerpo;
    }
}
