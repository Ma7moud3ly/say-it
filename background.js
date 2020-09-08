//say the selected text with TTS engine.
chrome.runtime.onMessage.addListener(function (request) {
	chrome.tts.speak(request.toSay, { rate: 0.8, onEvent: function (event) { } }, function () { });
});
