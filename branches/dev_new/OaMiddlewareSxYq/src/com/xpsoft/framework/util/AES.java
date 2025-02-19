package com.xpsoft.framework.util;

import javax.crypto.*;
import javax.crypto.spec.*;
public class AES {
//    public static void main(String[] args) throws Exception {
//        /*
//         加密用的Key
//         可以用26个字母和数字组成，最好不要用保留字符，虽然不会错，至于怎么裁决，个人看情况而定
//         */
//        String cKey = "29dlo*%AO+3i16BaweTw.lc!)61K{9^5";
//        //需要加密的字串
//        String cSrc = "121212";
//
//        //e4ab8a70882b25eaa487ba92b2122ce0
//        //加密
//        long lStart = System.currentTimeMillis();
//        String enString = AES.encrypt(cSrc, cKey);
//        System.out.println("加密后的字串是：" + enString);
//        long lUseTime = System.currentTimeMillis() - lStart;
//        System.out.println("加密耗时：" + lUseTime + "毫秒");
//        //解密
//        enString = "e4ab8a70882b25eaa487ba92b2122ce0";
//        lStart = System.currentTimeMillis();
//        String DeString = AES.decrypt(enString, cKey);
//        System.out.println("解密后的字串是：" + DeString);
//        lUseTime = System.currentTimeMillis() - lStart;
//        System.out.println("解密耗时：" + lUseTime + "毫秒");
//    }
	
	/**
	 * 解密
	 */
    public static String decrypt(String sSrc, String sKey) throws Exception {
        try {
            //判断Key是否正确
            if (sKey == null) {
                System.out.print("Key为空null");
                return null;
            }
            //判断Key是否为16位
            if (sKey.length() != 32) {
                System.out.print("Key长度不是32位");
                return null;
            }
            byte[] raw = sKey.getBytes("ASCII");
            
            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec);
            byte[] encrypted1 = hex2byte(sSrc);
            try {
                byte[] original = cipher.doFinal(encrypted1);
                String originalString = new String(original);
                return originalString;
            } catch (Exception e) {
                System.out.println(e.toString());
                return null;
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

	/**
	 * 解密
	 */
    public static byte[] decrypt(byte[] sSrc, byte[] raw) throws Exception {
        SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, skeySpec);
        byte[] original = cipher.doFinal(sSrc);
        return original;
    }

	/**
	 * 加密
	 */
    public static String encrypt(String sSrc, String sKey) throws Exception {
        if (sKey == null) {
            System.out.print("Key为空null");
            return null;
        }
        //判断Key是否为16位
        if (sKey.length() != 32) {
            System.out.print("Key长度不是32位");
            return null;
        }
        byte[] raw = sKey.getBytes("ASCII");
        
        SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
        byte[] encrypted = cipher.doFinal(sSrc.getBytes());
        return byte2hex(encrypted).toLowerCase();
    }

	/**
	 * 加密
	 */
    public static byte[] encrypt(byte[] sSrc, byte[] raw) throws Exception {

        SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
        byte[] encrypted = cipher.doFinal(sSrc);
        return encrypted;
    }
    
    public static byte[] hex2byte(String strhex) {
        if (strhex == null) {
            return null;
        }
        int l = strhex.length();
        if (l % 2 == 1) {
            return null;
        }
        byte[] b = new byte[l / 2];
        for (int i = 0; i != l / 2; i++) {
            b[i] = (byte) Integer.parseInt(strhex.substring(i * 2, i * 2 + 2), 16);
        }
        return b;
    }
    public static String byte2hex(byte[] b) {
        String hs = "";
        String stmp = "";
        for (int n = 0; n < b.length; n++) {
            stmp = (java.lang.Integer.toHexString(b[n] & 0XFF));
            if (stmp.length() == 1) {
                hs = hs + "0" + stmp;
            } else {
                hs = hs + stmp;
            }
        }
        return hs.toUpperCase();
    }
}