(function(w){

const events = [
  [0.25, function() {
    console.log('video.timeupdate: 25%')
  }],
  [0.50, function() {
    console.log('video.timeupdate: 50%')
  }],
  [0.75, function() {
    console.log('video.timeupdate: 75%')
  }],
  [1.0, function() {
    console.log('video.timeupdate: 100%')
  }],
]

w.onload = function(ev) {
  const d = w.document

  const me = d.getElementById('mediaElement')
  const mr = d.getElementById('muteRequest')
  const pr = d.getElementById('pauseRequest')
  const vi = d.getElementById('visibleIndicator')

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
    console.log('video.click:', 'TODO: ClickThrough')
    if (!me.paused) {
      console.log('video.click:', 'force paused')
      pr.checked = true
      updatePlayPause()
    }
  })
  me.addEventListener('timeupdate', function() {
    let frac = me.currentTime / me.duration
    while (events.length > 0 && frac >= events[0][0]) {
      events.shift()[1]()
    }
  })
  mr.addEventListener('change', function() {
    me.muted = mr.checked
    if (me.muted) {
      console.log('mute.change: muted')
    } else {
      console.log('mute.change: unmuted')
    }
  })
  pr.addEventListener('change', function() {
    if (pr.checked) {
      console.log('pause.change: paused')
    } else {
      console.log('pause.change: unpaused')
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
