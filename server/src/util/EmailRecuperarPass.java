package util;

import java.io.FileReader;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.json.JSONException;
import org.json.JSONObject;

public class EmailRecuperarPass extends Thread {

    /*
     * asunto para pass
     */
    private JSONObject data;

    public EmailRecuperarPass(JSONObject data) {
        this.data = data;
    }

    public static void main(String[] args) {
        JSONObject obj = new JSONObject();
        obj.put("correo", "ricky.paz.d.97@gmail.com");
        new EmailRecuperarPass(obj).start();
    }

    @Override
    public void run() {
        try {
            String emailFrom = "app@clinicaninojesus.com";
            String passEmailFrom = "Appsos12345678";
            String server = "mail.clinicaninojesus.com";
            String asunto = "Recuperacion de contrasena.";
            String dataStr = getHtml(data);

            Properties props = new Properties();
            props.setProperty("mail.smtp.host", server);
            props.put("mail.smtp.ssl.enable", "true");
            props.setProperty("mail.smtp.port", "465");
            props.setProperty("mail.smtp.user", emailFrom);
            props.setProperty("mail.smtp.auth", "true");
            Session session = Session.getDefaultInstance(props);
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(emailFrom));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(data.getString("correo")));
            message.setSubject(asunto);
            message.setContent(dataStr, "text/html");
            Transport t = session.getTransport("smtp");
            t.connect(emailFrom, passEmailFrom);
            t.sendMessage(message, message.getAllRecipients());
            t.close();
            System.out.println("Correo enviado a " + data.getString("correo"));

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private static String getHtml(JSONObject data) throws JSONException {
        String cuerpo = "";
        try {
            FileReader file;
            file = new FileReader("emails/RecuperarPass.html");
            int valor = file.read();
            String configJson = "";
            while (valor != -1) {
                configJson = String.valueOf(((char) valor));
                cuerpo = cuerpo + configJson;
                valor = file.read();
            }
            file.close();
            cuerpo = cuerpo.replaceAll("usuarioServisofts", data.getString("correo"));
            cuerpo = cuerpo.replaceAll("codigoServisofts", data.getString("codigo"));
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return cuerpo;
    }
}
