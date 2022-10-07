package FireBase;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONObject;

public class FireBase {

    private static final String SERVER_TOKEN_CONDUCTOR = "AAAA18UjXQ0:APA91bFnHw4pI5OYx9N69HDYzQjLX6OgxSSFy9n-SuloceaNV0bmmakYyzxXE3K-otP30im8_W9k9w9GVVXdMBhFesJbGkOxw954eGuK48tNKfn7xAtmqChen8U4YHMDe8Q7p8vyz951";
    private static final String SERVER_TOKEN_CLIENTE = "AAAAHq3hqlI:APA91bEIoPfRe065BeNAsQPs9v_fK6aNfgdSid1U3DFvmnbG_xDDM0d2kGU_LT6EAjAxYRQbWOYc5F0yjxJZCbIItOldBgkmFkb8dMD1MTX7ChVVUS5I34pnlWLeQjC049eKGlwXM67D";

    public static JSONObject send(String token, String fbapp, String data) {
        JSONObject objSend = new JSONObject();
        objSend.put("to", token);
        objSend.put("priority", "high");
        objSend.put("data", new JSONObject(data));
        String serverToken = "";
        switch (fbapp) {
            case "motonet_conductor":
                serverToken = SERVER_TOKEN_CONDUCTOR;
                break;
            case "motonet_cliente":
                serverToken = SERVER_TOKEN_CLIENTE;
                break;
        }
        System.out.println("Enviando mensaje FB...");
        JSONObject objResp = new JSONObject(executePost("https://fcm.googleapis.com/fcm/send", serverToken, objSend));
        return objResp;
    }

    public static String executePost(String targetURL, String serverToken, JSONObject objSend) {
        HttpURLConnection connection = null;
        try {
            // Create connection
            URL url = new URL(targetURL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");

            connection.setRequestProperty("Content-Length", Integer.toString(objSend.toString().getBytes().length));
            connection.setRequestProperty("Authorization", "key=" + serverToken);

            connection.setUseCaches(false);
            connection.setDoOutput(true);

            // Send request
            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
            wr.writeBytes(objSend.toString());
            wr.close();
            // Get Response
            InputStream is = connection.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            StringBuilder response = new StringBuilder(); // or StringBuffer if Java version 5+
            String line;
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}
