<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!--//////////////////////////////////////////////////////////////////////////
//
//   Copyright (c) 2020 Forcepoint. Forcepoint and the FORCEPOINT logo are
//   trademarks of Forcepoint. All other trademarks used in this document
//   are the property of their respective owner.
//
///////////////////////////////////////////////////////////////////////////-->

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Access to this site is blocked</title>
<link rel="stylesheet" href="/en/Default/master.css" type="text/css">
<script type="text/javascript" language="javascript" src="/en/Default/master.js"></script>
<script type="text/javascript" language="javascript" src="/en/Default/base64.js"></script>
<script type="text/javascript" language="javascript" src="/en/Default/security.js"></script>
</head>
<body>
	<noscript>
		<style>
			iframe.top {
				height: 15em;
			}
			iframe.bottom {
				height: 17.5em;
			}
		</style>
	</noscript>
	<div class="master-frame">
		<iframe onload="resizeIframe(this);" class="top" src="http://10.200.105.14:15871/cgi-bin/block_message.cgi?ws-session=-1233014156" name="ws_block" frameborder="0" scrolling="auto" style="width:100%; padding-bottom:15px;">
		</iframe>

		<iframe onload="resizeIframe(this);" class="bottom" src="http://10.200.105.14:15871/cgi-bin/blockOptions.cgi?ws-session=-1233014156" name="ws_blockoption" frameborder="0" scrolling="auto" style="width:100%;">
			<p>To enable further options, view this page with a browser that supports iframes</p>
		</iframe>
		<div style="border: 1px dotted #A6A6A6"></div>
		<div><img title="Forcepoint" src="/Images/logo_block_page.png" alt="Forcepoint Logo" style="float: left;clear: both; margin: 15px 10px 10px 10px; padding: 2px 0px;">
			<div style="clear: both; overflow: hidden; height:1px;"></div>
		</div>
	</div>

	<div id="fade" class="black_overlay">
		<div id="light" class="white_content">
			<div id="titlebar" class="header">Switch Credentials</div>
			<form action="/cgi-bin/useraccount_overrider.cgi" method="POST" target="_top" name="UAOverrideForm" onsubmit="encode();">
				<input type="HIDDEN" name="ws-session" value="-1233014156">
				<input type="HIDDEN" id="ws-credentials" name="ws-credentials" value="">
				<div style="padding:10px 16px">
					<p id="reauth-text">
						Enter your user name and password to attempt to access this site.
					</p>
					<p id="reauth-text-timeout">
						If access is permitted, the new policy will be applied to Internet requests for  minutes.
					</p>
					<p>
						<label for="ws-credentials-user">User name: </label>
						<input type="text" id="ws-credentials-user" name="ws-credentials-user" size="55" maxlength="65"> 
					</p>
					<p>
						<label for="ws-credentials-pass">Password: </label>
						<input type="password" id="ws-credentials-pass" name="ws-credentials-pass" size="55" maxlength="65"> 
					</p>
					<div style="float:right">
						<input TYPE="SUBMIT" VALUE="Switch Credentials" name="ws-credentials-button">
						<input TYPE="SUBMIT" VALUE="Cancel"  name="ws-credentials-cancel-button" onclick="return closePopup();">
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
