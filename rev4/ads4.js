(function(w){

const eventURLs = {
  error: '',
  impression: '',
  creativeView: '',
  start: '',
  firstQuartile: '',
  midpoint: '',
  thirdQuartile: '',
  complete: '',
  mute: '',
  unmute: '',
  pause: '',
  resume: '',
  clickThrough: '',
  clickTracking: '',
}

let eventlogEnable = false

function eventlog() {
  if (eventlogEnable) {
    console.log.apply(console, arguments)
  }
}

function invokeEvent(name) {
  let u = eventURLs[name]
  if (!u) {
    eventlog('INVOKE.event:', 'no url:', name)
    return
  }
  eventlog('INVOKE.event:', name)
  if (name === 'clickThrough') {
    let win = window.open(u, '_blank')
    win.focus()
    return
  }
  fetch(u) // XXX: IE doesn't support fetch.
}

function newInvokation(name) {
  return function() {
    invokeEvent(name)
  }
}

const events = {
  impression: newInvokation('impression'),
  creativeView: newInvokation('creativeView'),
  start: newInvokation('start'),
  firstQuartile: newInvokation('firstQuartile'),
  midpoint: newInvokation('midpoint'),
  thirdQuartile: newInvokation('thirdQuartile'),
  complete: newInvokation('complete'),
  mute: newInvokation('mute'),
  unmute: newInvokation('unmute'),
  pause: newInvokation('pause'),
  resume: newInvokation('resume'),
  clickThrough: newInvokation('clickThrough'),
  clickTracking: newInvokation('clickTracking'),
}

const fractionEvents = [
  [0.00, function() {
    dbglog('video.timeupdate: 0%')
    events.start()
  }],
  [0.25, function() {
    dbglog('video.timeupdate: 25%')
    events.firstQuartile()
  }],
  [0.50, function() {
    dbglog('video.timeupdate: 50%')
    events.midpoint()
  }],
  [0.75, function() {
    dbglog('video.timeupdate: 75%')
    events.thirdQuartile()
  }],
  [1.0, function() {
    dbglog('video.timeupdate: 100%')
    events.complete()
  }],
]

function warnlog() {
  console.warn.apply(console, arguments)
}

function dbglog() {
  //console.log.apply(console, arguments)
}

function setupAd() {

  const d = w.document

  const me = d.getElementById('mediaElement')
  const mr = d.getElementById('muteRequest')
  const pr = d.getElementById('pauseRequest')
  const vi = d.getElementById('visibleIndicator')

  if (me) {
    events.creativeView()
  }

  let visible = false
  function updatePlayPause() {
    if (me.ended) {
      return
    }
    if (!pr.checked && visible) {
      me.play()
    } else {
      me.pause()
    }
  }

  me.addEventListener('click', function() {
    dbglog('video.click')
    events.clickTracking()
    if (!me.ended && !me.paused) {
      dbglog('video.click:', 'force paused')
      pr.checked = true
      updatePlayPause()
    }
    events.clickThrough()
  })
  me.addEventListener('timeupdate', function() {
    let frac = me.currentTime / me.duration
    while (fractionEvents.length > 0 && frac >= fractionEvents[0][0]) {
      fractionEvents.shift()[1]()
    }
  })
  mr.addEventListener('change', function() {
    me.muted = mr.checked
    if (me.ended) {
      return
    }
    if (me.muted) {
      dbglog('mute.change: muted')
      events.mute()
    } else {
      dbglog('mute.change: unmuted')
      events.unmute()
    }
  })
  pr.addEventListener('change', function() {
    if (pr.checked) {
      dbglog('pause.change: paused')
      events.pause()
    } else {
      dbglog('pause.change: unpaused')
      events.resume()
    }
    updatePlayPause()
  })

  new IntersectionObserver(function(entries, observer) {
    if (entries.length == 0) {
      return
    }
    visible = entries[0].intersectionRatio >= 0.5
    if (vi) {
      vi.checked = visible
    }
    updatePlayPause()
  }, { "threshold": 0.5 }).observe(me)
}

function vast2load(u, eventlogFlag) {
  dbglog('vast2.load:', u)
  let req = new XMLHttpRequest()
  req.addEventListener("load", vast2onload)
  req.open('GET', u)
  req.send()
  if (!!eventlogFlag) {
    eventlogEnable = true
  }
}

function vast2onload(ev) {
  let kbps = ev.loaded * 1000 / ev.timeStamp / 1000
  let dom = ev.target.responseXML
  dbglog('vast2.onload:', kbps, dom)
  w.vast2.dom = dom
  parseEvents(eventURLs, dom)
  media = chooseMedia(dom, kbps)
  if (!media) {
    warnlog('no medias chosen')
    invokeEvent('error')
  }

  const me = w.document.getElementById('mediaElement')
  me.addEventListener('canplaythrough', function() {
    setupAd()
  })
  me.addEventListener('error', function(ev) {
    warnlog('mediaElement.error:', ev)
    invokeEvent('error')
  })
  me.addEventListener('abort', function(ev) {
    warnlog('mediaElement.abort:', ev)
    invokeEvent('error')
  })

  // set media to HTTPMediaElement.
  me.src = media.url
  dbglog('  kbps', kbps)
  dbglog('  chosen media', media)

  events.impression()
}

// chooseMedia chooses a media which match with connection speed.
function chooseMedia(dom, kbps) {
  let files = dom.querySelector('MediaFiles')
  if (!files) {
    return null
  }
  let medias = Array.from(files.querySelectorAll('MediaFile')).map(toMedia).sort(mediaCompare)
  w.vast2.medias = medias
  if (medias.length == 0) {
    return null
  }
  hit = medias[0]
  for (let i = 1; i < medias.length; i++) {
    if (kbps >= medias[i].bitrate) {
      hit = medias[i]
    }
  }
  w.vast2.hitMedia = hit
  return hit
}

function mediaCompare(a, b) {
  if (a.bitrate < b.bitrate) {
    return -1
  }
  if (a.bitrate > b.bitrate) {
    return 1
  }
  if (a.index < b.index) {
    return -1
  }
  return 1
}

let mediaIndex = 0

function toMedia(mf) {
  id = getAttrStr(mf, 'id')
  width = getAttrInt(mf, 'width', -1)
  height = getAttrInt(mf, 'height', -1)
  bitrate = getAttrInt(mf, 'bitrate', -1)
  url = mf.textContent
  return {
    index: mediaIndex++,
    id: id,
    width: width,
    height: height,
    bitrate: bitrate,
    url: url,
  }
}

function getAttrInt(el, name, defval) {
  let n = parseInt(getAttrStr(el, name), 10)
  return isNaN(n) ? defval : n
}

function getAttrStr(el, name) {
  if (!el.hasAttribute(name)) {
    return ''
  }
  return el.getAttribute(name)
}

// parseEvents parses `dom` as VAST2.0 events
function parseEvents(events, dom) {
  events['error'] = queryTextContent(dom, 'Error')
  events['impression'] = queryTextContent(dom, 'Impression')
  events['creativeView'] = queryTextContent(dom, "Tracking[event='creativeView']")
  events['start'] = queryTextContent(dom, "Tracking[event='start']")
  events['firstQuartile'] = queryTextContent(dom, "Tracking[event='firstQuartile']")
  events['midpoint'] = queryTextContent(dom, "Tracking[event='midpoint']")
  events['thirdQuartile'] = queryTextContent(dom, "Tracking[event='thirdQuartile']")
  events['complete'] = queryTextContent(dom, "Tracking[event='complete']")
  events['mute'] = queryTextContent(dom, "Tracking[event='mute']")
  events['unmute'] = queryTextContent(dom, "Tracking[event='unmute']")
  events['pause'] = queryTextContent(dom, "Tracking[event='pause']")
  events['resume'] = queryTextContent(dom, "Tracking[event='resume']")
  events['clickThrough'] = queryTextContent(dom, 'ClickThrough')
  events['clickTracking'] = queryTextContent(dom, 'ClickTracking')
}

function queryTextContent(dom, query) {
  let n = dom.querySelector(query)
  return !!n ? n.textContent : ''
}

w.vast2 = {
  load: vast2load,
}
})(window)
