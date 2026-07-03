import { useEffect, useState } from 'react'

// A lightweight "Install app" affordance. The service worker itself is
// registered automatically by vite-plugin-pwa, so this component only handles
// the optional install prompt (offline caching works with or without it).
export default function InstallButton() {
  const [promptEvent, setPromptEvent] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Fired by the browser when the app meets installability criteria.
    const onBeforeInstall = (e) => {
      e.preventDefault() // keep the default mini-infobar from showing
      setPromptEvent(e)
    }
    const onInstalled = () => setPromptEvent(null)

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  // Already running as an installed app → nothing to prompt.
  const standalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true)

  if (standalone || dismissed || !promptEvent) return null

  async function install() {
    promptEvent.prompt()
    await promptEvent.userChoice
    setPromptEvent(null)
  }

  return (
    <div className="install-toast" role="dialog" aria-label="Install app">
      <span className="install-text">
        📲 Install <strong>CSC Review</strong> for offline study
      </span>
      <div className="install-actions">
        <button className="btn btn-primary" onClick={install}>
          Install
        </button>
        <button className="link-btn" onClick={() => setDismissed(true)}>
          Not now
        </button>
      </div>
    </div>
  )
}
