/** Persistent shapes interpolate between states instead of swapping SVG nodes. */
export function PlaybackIcon({ playing, size = 18 }: { playing: boolean; size?: number }) {
  return <span className="control-playback" data-playing={playing} aria-hidden="true" style={{ width: size, height: size }}><i /><i /></span>
}

export function SoundIcon({ muted, size = 18 }: { muted: boolean; size?: number }) {
  return <svg className="control-sound" data-muted={muted} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4Z" />
    <g className="control-sound-waves"><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" /></g>
    <g className="control-sound-mute"><path d="m16 9 5 6m0-6-5 6" /></g>
  </svg>
}
