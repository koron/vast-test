(function(w){

const eventURLs = {
  impression: '',
  creativeView: 'https://vast.ladsp.com/vie?ev=creative_view&c=AYcGCysSAcfvCUlfl_36HWGjJMHlxYSgMJ0RhsHQaaoI2mKIarp2rv93JgrjrgUcQefxCnA5wiYJ-Do11--jkF_DRqIsTQ1metlQEopG7SEycEoY4oFt_9XBRQEAzVH6A4RNGhqrIQTiz6F4AcQakASFi_H-fqVaux_-ARAPK4SX-U0OwoUDspE5vDi6cCmU0g&m=AWr07X0srKdo3AC9wMDPAAABY2bXQXbAKc0ndc0nds0neM0ne80newbAwLdodHRwOi8vd3d3LmxvZ2ljYWQuY29tL8AAsTI2MjEwNjk2Njk4MTM5MzQ2vjBsalNBTnFjMU5tamdGaHdkN1NMZ3dFQ3MySVJ4d88AAAECs2IRx8DAwMAJuGh0dHA6Ly93d3cuc28tbmV0Lm5lLmpwL6DApzMwMHgyNTChMcDPAAAJGE5yn__Aw8ABwJSSzgAPQpXKPwAAAJLOAA9Clso-mZmaks4AD0KXyj4ZmZqSzgAPQpjKPUzMzR7PAAAJGE5yn_-iamHOAAEXMMMBAc0EcM0CgMABAcDAwMDAwMDAwKQ4NjgxrTExOC4yNDEuMTk4LjPAwKZkZWFsSWTNJw_NIrjAoVIBAQEBAQEVwMPAwMDAwMDAwMDAwMPCkwECAwDAe8DAwKMxMjMKzR5hAsDNA3rAwK5hZHNlcnZlcjMxLVZQQ65hZHNlcnZlcjMxLVZQQ8DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNoAPmh0dHA6Ly9ldmVudC5sb2dpY2FkLmpwL3Zhc3QvdmFzdF94bWwvMTAxMDEvMTAxMDIvMTAxMDQvMTAxMDcvwMDAwA&sg=d478f5f61b68e8f2b6bbd867c10015a4e8daea4b',
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

function invokeEvent(name) {
  let u = eventURLs[name]
  if (!u) {
    console.log('INVOKE.event:', 'no url:', name)
    return
  }
  console.log('INVOKE.event:', name)
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

function dbglog() {
  //console.log.apply(console, arguments)
}

w.onload = function(ev) {
  events.impression()

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
})(window)
