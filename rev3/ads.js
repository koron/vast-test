var videoContent = document.getElementById('contentElement')

var adDisplayContainer = new google.ima.AdDisplayContainer(
  document.getElementById('adContainer'));
// Must be done as the result of a user action on mobile
adDisplayContainer.initialize();

// Re-use this AdsLoader instance for the entire lifecycle of your page.
var adsLoader = new google.ima.AdsLoader(adDisplayContainer);

var adsManager;

// Add event listeners
adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false);
adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false);

function onAdError(adErrorEvent) {
  // Handle the error logging and destroy the AdsManager
  console.log(adErrorEvent.getError());
  adsManager.destroy();
}

// An event listener to tell the SDK that our content video
// is completed so the SDK can play any post-roll ads.
var contentEndedListener = function() {adsLoader.contentComplete();};
videoContent.onended = contentEndedListener;

// Request video ads.
var adsRequest = new google.ima.AdsRequest();

adsRequest.adTagUrl = 'https://files.kaoriya.net/var/vast20.xml'

// Specify the linear and nonlinear slot sizes. This helps the SDK to
// select the correct creative if multiple are returned.
adsRequest.linearAdSlotWidth = 640;
adsRequest.linearAdSlotHeight = 400;
adsRequest.nonLinearAdSlotWidth = 640;
adsRequest.nonLinearAdSlotHeight = 150;

var playButton = document.getElementById('playButton');
playButton.addEventListener('click', requestAds);

function requestAds() {
  adsLoader.requestAds(adsRequest);
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
  var settings = new google.ima.AdsRenderingSettings();
  var rate = getBitrate();
  if (rate > 0) {
    settings.bitrate = rate
  }

  // Get the ads manager.
  adsManager = adsManagerLoadedEvent.getAdsManager(
      videoContent, settings);  // See API reference for contentPlayback

  // Add listeners to the required events.
  adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      onContentPauseRequested);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      onContentResumeRequested);

  // 動画再生前に mute された場合はここ(STARTEDイベントリスナ)で反映する。
  adsManager.addEventListener(
      google.ima.AdEvent.Type.STARTED,
      function() { if (muteButton.checked) { mute(); } });

  // TODO: install other event listeners.
  // available events: https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type

  try {
    // Initialize the ads manager. Ad rules playlist will start at this time.
    adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
    // Call start to show ads. Single video and overlay ads will
    // start at this time; this call will be ignored for ad rules, as ad rules
    // ads start when the adsManager is initialized.
    adsManager.start();
  } catch (adError) {
    // An error may be thrown if there was a problem with the VAST response.
    // Play content here, because we won't be getting an ad.
    //videoContent.play();
  }
}

function onContentPauseRequested() {
  // This function is where you should setup UI for showing ads (e.g.
  // display ad timer countdown, disable seeking, etc.)
  videoContent.removeEventListener('ended', contentEndedListener);
  videoContent.pause();
}

function onContentResumeRequested() {
  // This function is where you should ensure that your UI is ready
  // to play content.
  //videoContent.addEventListener('ended', contentEndedListener);
  //videoContent.play();
  contentEndedListener();
}

var muteButton = document.getElementById('muteButton');
muteButton.addEventListener('click', onMuteClick);
var lastVolume;

function onMuteClick(e) {
  if (!adsManager) {
    // AD not started yet
    return;
  }
  if (muteButton.checked) {
    mute();
  } else {
    unmute();
  }
}

function mute() {
  lastVolume = adsManager.getVolume();
  adsManager.setVolume(0);
}

function unmute() {
  adsManager.setVolume(lastVolume);
}

function getBitrate() {
  var el = document.getElementById('bitrate')
  return el.item(el.selectedIndex).value - 0
}
