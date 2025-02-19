package com.digitalchina.info.framework.util;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.log4j.Logger;
	/**
	* @Functionality: 有关日期工具类
	*/
	public class DateTool extends TimeTool {
	/**
	* Logger for this class
	*/
	private static final Logger     logger = Logger.getLogger( DateUtil.class );


	/** 日期转化 */
	private static final SimpleDateFormat sdf   = new SimpleDateFormat( "yyyy-MM-dd" );

	/**
	* @Functionality: 构造函数
	*/
	  
//	----------------------日期计算---------------------------------------------------------------------------------

	/**
	* 是否开始日期在结束日期之前(不包括相等)
	* @param p_startDate
	* @param p_endDate
	* @return boolean 在结束日期前:ture;否则：false
	* @author zhuqx
	* @Date:   2006-10-31
	*/
	public static boolean isStartDateBeforeEndDate( Date p_startDate, Date p_endDate ) throws ParseException {
	   long l_startTime = getMillisOfDate( p_startDate );
	   long l_endTime = getMillisOfDate( p_endDate );
	   return ( l_startTime - l_endTime > (long) 0 ) ? true : false;
	}

	/**
	* 获取2个字符日期的天数差
	* @param p_startDate
	* @param p_endDate
	* @return 天数差
	* @author zhuqx
	* @Date:   2006-10-31
	*/
	public static long getDaysOfTowDiffDate( String p_startDate, String p_endDate ) throws ParseException {
	  
	   Date l_startDate = toUtilDateFromStrDateByFormat( p_startDate,"yyyy-MM-dd");
	   Date l_endDate = toUtilDateFromStrDateByFormat( p_endDate, "yyyy-MM-dd");
	   long l_startTime = getMillisOfDate( l_startDate );
	   long l_endTime = getMillisOfDate( l_endDate );
	   long betweenDays = (long) ( ( l_endTime - l_startTime ) / ( 1000 * 60 * 60 * 24 ) );
	   return betweenDays;
	}

	public static long getDaysOfTowDiffDate(Date startDate, Date endDate){
	   long l_startTime = getMillisOfDate( startDate );
	   long l_endTime = getMillisOfDate( endDate );
	   long betweenDays = (long) ( ( l_endTime - l_startTime ) / ( 1000 * 60 * 60 * 24 ) );
	   return betweenDays;
	}
	
	/**
	* 获取2个字符日期的周数差
	* @param p_startDate
	* @param p_endDate
	* @return 周数差
	* @author zhuqx
	* @Date:   2006-10-31
	*/
	public static long getWeeksOfTowDiffDate( String p_startDate, String p_endDate ) throws ParseException {
	   return getDaysOfTowDiffDate(p_startDate,p_endDate)/7;
	}

	/**
	* 获取2个字符日期的月数差
	* @param p_startDate
	* @param p_endDate
	* @return 月数差
	* @author zhuqx
	* @Date:   2006-10-31
	*/
	public static long getMonthsOfTowDiffDate( Date startDate, Date endDate){
	   return getDaysOfTowDiffDate(startDate, endDate)/30;
	}
	
	/**
	 * 返回2个日期的月份差值，如果是同一月，返回日差值/30
	 * @Methods Name getMonthDiffIncludeDayOfTwoDate
	 * @Create In 2008-1-10 By peixf
	 * @param startDate
	 * @param endDate
	 * @return double
	 */
	public static double getMonthDiffIncludeDayOfTwoDate( Date startDate, Date endDate){
	   long dayDiff = getDaysOfTowDiffDate(startDate, endDate);
	   long monthDiff = dayDiff/30;
	   if(monthDiff==0&& dayDiff!=0){
		   double temp = (double)dayDiff/30; 
		   temp= Math.round(temp*10);    
		   temp= temp/10;
		   return temp;
	   }else{
		   return monthDiff;
	   }
	}
	
	
	public static long getMonthDiffOnlyOfTwoDate( Date startDate, Date endDate){
		String start = TimeTool.toStrDateFromUtilDateByFormat(startDate, "yyyy-MM-dd");
		String end = TimeTool.toStrDateFromUtilDateByFormat(endDate, "yyyy-MM-dd");
		if(start.equals(end)){ //只比较到月
			return 0;
		}
		return getDaysOfTowDiffDate(startDate, endDate)/30;
	}
	
	
	public static long getMonthsOfTowDiffDate( String p_startDate, String p_endDate ) throws ParseException {
		   return getDaysOfTowDiffDate(p_startDate,p_endDate)/30;
		}
	
	/**
	* 获取2个字符日期的年数差
	* @param p_startDate
	* @param p_endDate
	* @return 年数差
	* @author zhuqx
	* @Date:   2006-10-31
	*/
	public static long getYearsOfTowDiffDate( String p_startDate, String p_endDate ) throws ParseException {
	   return getDaysOfTowDiffDate(p_startDate,p_endDate)/365;
	}

	/**
	* 在给定的日期基础上添加年，月，日、时，分，秒
	* 例如要再2006－10－21（uitl日期）添加3个月，并且格式化为yyyy-MM-dd格式，
	* 这里调用的方式为 addDate(2006－10－21,3,Calendar.MONTH,"yyyy-MM-dd")
	* @param p_startDate 给定的日期
	* @param p_count 时间的数量
	* @param p_field 添加的域
	* @param p_format 时间转化格式，例如：yyyy-MM-dd hh:mm:ss 或者yyyy-mm-dd等
	* @return 添加后格式化的时间
	* @Date:   2006-10-31
	*/
	public static String addDate(Date p_startDate,int p_count,int p_field,String p_format)throws ParseException {
	  
	   //年，月，日、时，分，秒
	   int l_year = getYearOfDate(p_startDate);
	   int l_month = getMonthOfDate( p_startDate )-1;
	   int l_day = getDayOfDate( p_startDate );
	   int l_hour = getHourOfDate( p_startDate );
	   int l_minute = getMinuteOfDate( p_startDate );
	   int l_second = getSecondOfDate( p_startDate );
	   Calendar l_calendar = new GregorianCalendar(l_year,l_month,l_day,l_hour,l_minute,l_second);
	   l_calendar.add(p_field,p_count);
	   return toStrDateFromUtilDateByFormat(l_calendar.getTime(),p_format);
	}
	
	/**
	* 在给定的日期基础上添加年，月，日、时，分，秒
	* 例如要再2006－10－21（uitl日期）添加3个月，并且格式化为yyyy-MM-dd格式，
	* 这里调用的方式为 addDate(2006－10－21,3,Calendar.MONTH)
	* @param p_startDate 给定的日期
	* @param p_count 时间的数量
	* @param p_field 添加的域
	* @return 添加后格式化的时间
	* @Date:   2006-10-31
	*/
	public static java.util.Date addDate(Date p_startDate,int p_count,int p_field){
		  
		   //年，月，日、时，分，秒

		int l_year = getYearOfDate(p_startDate);
	    int l_month = getMonthOfDate( p_startDate )-1;
	    int l_day = getDayOfDate( p_startDate );
	    int l_hour = getHourOfDate( p_startDate );
	    int l_minute = getMinuteOfDate( p_startDate );
	    int l_second = getSecondOfDate( p_startDate );
	    Calendar l_calendar = new GregorianCalendar(l_year,l_month,l_day,l_hour,l_minute,l_second);
	    l_calendar.add(p_field,p_count);
	    return l_calendar.getTime();
		
	}

	/**
	 * 在当前日期之上增减,例如 addDate(3,Calendar.MONTH)表示当前时间加3个月,第一个参数为负数则表示减法操作
	 * @Methods Name addDate
	 * @Create In 2008-1-7 By peixf
	 * @param p_count
	 * @param p_field
	 * @return java.util.Date
	 */
	public static java.util.Date currentDateAddDate(int p_count,int p_field){
		  
		   //年，月，日、时，分，秒
		Date p_startDate = DateTool.getCurrentDateByFormat("yyyy-MM-dd"); //先获取当前日期
		int l_year = getYearOfDate(p_startDate);
	    int l_month = getMonthOfDate( p_startDate )-1;
	    int l_day = getDayOfDate( p_startDate );
	    int l_hour = getHourOfDate( p_startDate );
	    int l_minute = getMinuteOfDate( p_startDate );
	    int l_second = getSecondOfDate( p_startDate );
	    Calendar l_calendar = new GregorianCalendar(l_year,l_month,l_day,l_hour,l_minute,l_second);
	    l_calendar.add(p_field,p_count);
	    return l_calendar.getTime();
		
	}
	
	/**
	* 判断给定日期是不是润年
	* @param p_date 给定日期 
	* @return boolean 如果给定的年份为闰年，则返回 true；否则返回 false。
	* @Date: 2006-10-31
	*/
	   public static boolean isLeapYear(Date p_date) {
	     int l_year = getYearOfDate( p_date );
	     GregorianCalendar l_calendar = new GregorianCalendar();
	     return l_calendar.isLeapYear( l_year );
	   }
	   
	}

