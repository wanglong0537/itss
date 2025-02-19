/**
 * @Probject Name: 10_InfoFramework
 * @Path: com.digitalchina.info.framework.security.service.implConcurrentSessionControllerImpl.java
 * @Create By ����
 * @Create In Nov 10, 2008 2:13:55 PM
 * TODO
 */
package com.digitalchina.info.framework.security.service.impl;

import org.acegisecurity.AcegiMessageSource;
import org.acegisecurity.Authentication;
import org.acegisecurity.AuthenticationException;
import org.acegisecurity.concurrent.ConcurrentLoginException;
import org.acegisecurity.concurrent.ConcurrentSessionController;
import org.acegisecurity.concurrent.SessionInformation;
import org.acegisecurity.concurrent.SessionRegistry;
import org.acegisecurity.concurrent.SessionRegistryUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.util.Assert;

/**
 * @Class Name ConcurrentSessionControllerImpl
 * @Author ����
 * @Create In Nov 10, 2008
 */
public class ConcurrentSessionControllerImpl implements
		ConcurrentSessionController, InitializingBean, MessageSourceAware {
	protected MessageSourceAccessor messages = AcegiMessageSource.getAccessor();
	private SessionRegistry sessionRegistry;
	private boolean exceptionIfMaximumExceeded = false;
	private int maximumSessions = 1;

	public void afterPropertiesSet() throws Exception {
		Assert.notNull(sessionRegistry, "SessionRegistry required");
		Assert
				.isTrue(
						maximumSessions != 0,
						"MaximumLogins must be either -1 to allow unlimited logins, or a positive integer to specify a maximum");
		Assert.notNull(this.messages, "A message source must be set");
	}

	/**
	 * Allows subclasses to customise behaviour when too many sessions are
	 * detected.
	 * 
	 * @param sessionId
	 *            the session ID of the present request
	 * @param sessions
	 *            either <code>null</code> or all unexpired sessions
	 *            associated with the principal
	 * @param allowableSessions
	 *            DOCUMENT ME!
	 * @param registry
	 *            an instance of the <code>SessionRegistry</code> for subclass
	 *            use
	 * 
	 * @throws ConcurrentLoginException
	 *             DOCUMENT ME!
	 */
	protected void allowableSessionsExceeded(String sessionId,
			SessionInformation[] sessions, int allowableSessions,
			SessionRegistry registry) {
		if (exceptionIfMaximumExceeded || (sessions == null)) {
			throw new ConcurrentLoginException(messages.getMessage(
					"ConcurrentSessionControllerImpl.exceededAllowed",
					new Object[] { new Integer(allowableSessions) },
					"Maximum sessions of {0} for this principal exceeded"));
		}

		// Determine least recently used session, and mark it for invalidation
		SessionInformation leastRecentlyUsed = null;

		for (int i = 0; i < sessions.length; i++) {
			if ((leastRecentlyUsed == null)
					|| sessions[i].getLastRequest().before(
							leastRecentlyUsed.getLastRequest())) {
				leastRecentlyUsed = sessions[i];
			}
		}

		leastRecentlyUsed.expireNow();
	}

	public void checkAuthenticationAllowed(Authentication request)
			throws AuthenticationException {
		Assert
				.notNull(request,
						"Authentication request cannot be null (violation of interface contract)");

		Object principal = SessionRegistryUtils
				.obtainPrincipalFromAuthentication(request);
		String sessionId = SessionRegistryUtils
				.obtainSessionIdFromAuthentication(request);

		SessionInformation[] sessions = sessionRegistry.getAllSessions(
				principal, false);

		int sessionCount = 0;

		if (sessions != null) {
			sessionCount = sessions.length;
		}

		int allowableSessions = getMaximumSessionsForThisUser(request);
		Assert
				.isTrue(
						allowableSessions != 0,
						"getMaximumSessionsForThisUser() must return either -1 to allow "
								+ "unlimited logins, or a positive integer to specify a maximum");

		if (sessionCount < allowableSessions) {
			// They haven't got too many login sessions running at present
			return;
		} else if (allowableSessions == -1) {
			// We permit unlimited logins
			return;
		} else if (sessionCount == allowableSessions) {
			// Only permit it though if this request is associated with one of
			// the sessions
			for (int i = 0; i < sessionCount; i++) {
				if (sessions[i].getSessionId().equals(sessionId)) {
					return;
				}
			}
		}

		allowableSessionsExceeded(sessionId, sessions, allowableSessions,
				sessionRegistry);
	}

	/**
	 * Method intended for use by subclasses to override the maximum number of
	 * sessions that are permitted for a particular authentication. The default
	 * implementation simply returns the <code>maximumSessions</code> value
	 * for the bean.
	 * 
	 * @param authentication
	 *            to determine the maximum sessions for
	 * 
	 * @return either -1 meaning unlimited, or a positive integer to limit
	 *         (never zero)
	 */
	protected int getMaximumSessionsForThisUser(Authentication authentication) {
		return maximumSessions;
	}

	public void registerSuccessfulAuthentication(Authentication authentication) {
		Assert
				.notNull(authentication,
						"Authentication cannot be null (violation of interface contract)");

		Object principal = SessionRegistryUtils
				.obtainPrincipalFromAuthentication(authentication);
		String sessionId = SessionRegistryUtils
				.obtainSessionIdFromAuthentication(authentication);

		sessionRegistry.registerNewSession(sessionId, principal);
	}

	public void setExceptionIfMaximumExceeded(boolean exceptionIfMaximumExceeded) {
		this.exceptionIfMaximumExceeded = exceptionIfMaximumExceeded;
	}

	public void setMaximumSessions(int maximumSessions) {
		this.maximumSessions = maximumSessions;
	}

	public void setMessageSource(MessageSource messageSource) {
		this.messages = new MessageSourceAccessor(messageSource);
	}

	public void setSessionRegistry(SessionRegistry sessionRegistry) {
		this.sessionRegistry = sessionRegistry;
	}

}
