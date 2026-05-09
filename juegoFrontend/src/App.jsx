import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [screen, setScreen] = useState('start')
  const [playerName, setPlayerName] = useState('')
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [levelIndex, setLevelIndex] = useState(0)
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isChecking, setIsChecking] = useState(false)

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'

  const currentQuestion = useMemo(() => {
    if (questions.length === 0) return null
    return questions[levelIndex] || null
  }, [questions, levelIndex])

  const fetchQuestions = async () => {
    setIsLoading(true)
    setLoadError('')
    try {
      const response = await fetch(`${apiBase}/questions/`)
      if (!response.ok) {
        throw new Error('No se pudieron cargar las preguntas.')
      }
      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No hay preguntas disponibles.')
      }
      const ordered = [...data].sort((a, b) => a.level - b.level)
      setQuestions(ordered)
    } catch (error) {
      setLoadError(error.message || 'Error al cargar preguntas.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const startGame = () => {
    if (!playerName.trim()) return
    setLives(3)
    setScore(0)
    setLevelIndex(0)
    setFeedback('')
    setScreen('question')
  }

  const resetGame = () => {
    setScreen('start')
    setPlayerName('')
    setLives(3)
    setScore(0)
    setLevelIndex(0)
    setFeedback('')
  }

  const handleAnswer = async (optionIndex) => {
    if (!currentQuestion || isChecking) return
    setIsChecking(true)
    setFeedback('')
    try {
      const response = await fetch(`${apiBase}/validate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: currentQuestion.id,
          selected_index: optionIndex,
        }),
      })
      const result = await response.json()
      const isCorrect = result?.correct === true

      if (isCorrect) {
        const nextScore = score + 100
        setScore(nextScore)
        setFeedback('Correcto. Avanzas al siguiente nivel.')

        const nextIndex = levelIndex + 1
        if (nextIndex >= questions.length) {
          setScreen('result')
        } else {
          setLevelIndex(nextIndex)
        }
      } else {
        const remaining = lives - 1
        setLives(remaining)
        setFeedback('Respuesta incorrecta. Pierdes una vida.')

        if (remaining <= 0) {
          setScreen('result')
        }
      }
    } catch (error) {
      setFeedback('No se pudo validar la respuesta.')
    } finally {
      setIsChecking(false)
    }
  }

  const hasWon = screen === 'result' && lives > 0 && levelIndex >= questions.length - 1

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <span className="eyebrow">Juego educativo</span>
          <h1>Desafio de Programacion</h1>
          <p className="subtitle">
            Preguntas de opcion multiple para practicar conceptos basicos.
          </p>
        </div>
        <div className="status-card">
          <div>
            <span>Jugador</span>
            <strong>{playerName || '---'}</strong>
          </div>
          <div>
            <span>Vidas</span>
            <strong>{lives}</strong>
          </div>
          <div>
            <span>Puntuacion</span>
            <strong>{score}</strong>
          </div>
        </div>
      </header>

      {screen === 'start' && (
        <section className="card start-card">
          <h2>Inicio</h2>
          <p>
            Ingresa tu nombre de usuario y presiona iniciar para comenzar.
          </p>
          <label className="field">
            Nombre de usuario
            <input
              type="text"
              placeholder="Escribe tu nombre"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            />
          </label>

          {loadError && <p className="alert">{loadError}</p>}
          {isLoading && <p className="helper">Cargando preguntas...</p>}

          <button
            className="primary"
            onClick={startGame}
            disabled={!playerName.trim() || isLoading || loadError}
          >
            Iniciar
          </button>
        </section>
      )}

      {screen === 'question' && (
        <section className="card question-card">
          {currentQuestion ? (
            <>
              <div className="question-header">
                <span className="badge">Nivel {currentQuestion.level}</span>
                <span className="muted">
                  Pregunta {levelIndex + 1} de {questions.length}
                </span>
              </div>
              <h2>{currentQuestion.text}</h2>
              <div className="options-grid">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={`${currentQuestion.id}-${index}`}
                    className="option"
                    onClick={() => handleAnswer(index)}
                    disabled={isChecking}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {feedback && <p className="feedback">{feedback}</p>}
            </>
          ) : (
            <p className="helper">No hay preguntas disponibles.</p>
          )}
        </section>
      )}

      {screen === 'result' && (
        <section className="card result-card">
          <h2>{hasWon ? 'Ganaste' : 'Fin del juego'}</h2>
          <p>
            {hasWon
              ? 'Completaste todos los niveles.'
              : 'Te quedaste sin vidas.'}
          </p>
          <div className="score-box">
            <span>Puntuacion final</span>
            <strong>{score}</strong>
          </div>
          <button className="primary" onClick={resetGame}>
            Jugar de nuevo
          </button>
        </section>
      )}
    </div>
  )
}

export default App
