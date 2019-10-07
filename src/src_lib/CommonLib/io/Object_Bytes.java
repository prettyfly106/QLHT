package CommonLib.io;

import java.io.*;

/**
 * File : CommonLib.io.Object_Bytes
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 * Operation description: 
 * Output:
 * Date of creation: Aug 28, 2003 - 5:19:46 PM
 * Date of last changes:
 */

public class Object_Bytes {
    private static final String myDebugName = "Object_Bytes : Error:";
    public static byte[] ObjectToBytes(Object obj)
    {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ObjectOutputStream oos;
        try
        {
            oos = new ObjectOutputStream(byteArrayOutputStream);
            oos.writeObject(obj);
            oos.flush();
            oos.close();
            byteArrayOutputStream.close();
        } catch (IOException ioe)
        {
            throw new RuntimeException(myDebugName + " ObjectToBytes");
//            return null;
        }
        return byteArrayOutputStream.toByteArray();
    }
    public static byte[] InputStreamToBytes(InputStream is)
    {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        int bytesRead;
        byte[] Buffer = new byte[1024];
        try
        {
            while ((bytesRead=is.read(Buffer))!=-1)
            {
                byteArrayOutputStream.write(Buffer,0,bytesRead);
            }
            byteArrayOutputStream.close();
        } catch (IOException ioe)
        {
            throw new RuntimeException(myDebugName + " ObjectToBytes");
//            return null;
        }
        return byteArrayOutputStream.toByteArray();
    }
}
