# VAST2 simple player

## Gettings started

*   Add elements
    *   `<video id="mediaElement" muted>` : Ad video play area.
    *   `<input id="muteRequest" type="checkbox" checked>` : Mute request checkbox, default `checked`.
    *   `<input id="pauseRequest" type="checkbox">` : Pause request checkbox, default no `checked`.
    *   Optional: `<input id="visibleIndicator" type="checkbox">` : Indicate video area visible over 50%.

*   Add codes (`<script>` elements)

    *   at last of `<body>` element.

        ```html
        <script type="text/javascript" src="ads4.js"></script>
        <script type="text/javascript">
          vast2.load({VAST2_URL})
        </script>
        ```

See <./index.html> as example.

## JavaScript objects

*   `vast2.load({VAST2_URL}, [EVENTLOG_ENABLE])` : Entrypoint of the player.
    *   `{VAST2_URL}` : A string for URL of VAST2.0 document
    *   `[EVENTLOG_ENABLE]` : Enable logs for event invocation if `true`.
*   `vast2.dom` : VAST2.0 document which loaded.
*   `vast2.medias` : Array of summaries of `<MediaFile>`.
*   `vast2.hitMedia` : Media information which was chosen.
