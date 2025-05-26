'use client'
import React, { useState, useRef } from 'react'
import styles from './page.module.css'

export default function HomePage() {
  /* 1. Modo de control */
  const [mode, setMode] = useState<'Autosintonización'|'PID'|'Servosistema'>('Autosintonización')

  /* 2. Nivel */
  const [level, setLevel] = useState<number>(0)
  const levelRef = useRef<HTMLInputElement>(null)
  const gaugeRef = useRef<HTMLDivElement>(null)

  /* 3. Alarmas refs */
  const controlSignalRef = useRef<HTMLDivElement>(null)
  const outOfRangeRef    = useRef<HTMLDivElement>(null)
  const overLevelRef     = useRef<HTMLDivElement>(null)
  const stableRef        = useRef<HTMLDivElement>(null)

  /* 5. Temperatura deseada */
  const [temperature, setTemperature] = useState<number>(0)

  /* 6. Gráfica iframe */
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // TODO: conectar Firebase aquí para:
  //   - actualizar levelRef.current.value y ajustar gaugeFill
  //   - disparar/remover clase 'active' en cada alarmLabel
  //   - cambiar la src del iframe con la URL de tu gráfica

  const handleIncrease = () => setTemperature(t => Math.min(40, t + 1))
  const handleDecrease = () => setTemperature(t => Math.max(0, t - 1))

  const handleStart = () => {
    // TODO: lógica Start
  }
  const handleStop = () => {
    // TODO: lógica Stop
  }
  const handleEmergencyStop = () => {
    // TODO: lógica Emergency Stop
  }

  return (
    <div className={styles.dashboard}>
      {/* Panel izquierdo */}
      <div className={styles.leftPanel}>
        {/* 1. Menú desplegable */}
        <div className={styles.dropdownContainer}>
          <label htmlFor="modeSelect">Modo:</label>
          <select
            id="modeSelect"
            value={mode}
            onChange={e => setMode(e.target.value as any)}
          >
            <option>Autosintonización</option>
            <option>PID</option>
            <option>Servosistema</option>
          </select>
        </div>

        {/* 2. Indicador de nivel */}
        <div className={styles.levelContainer}>
          <label>Nivel:</label>
          <input
            type="text"
            readOnly
            value={String(level).padStart(3, '0')}
            ref={levelRef}
          />
          <div className={styles.gaugeContainer} ref={gaugeRef}>
            <div
              className={styles.gaugeFill}
              style={{ height: `${(level / 40) * 100}%` }}
            />
            <div className={styles.gaugeMarks}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={styles.mark}>
                  {40 - i * 5}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Alarmas */}
        <div className={styles.alarmsContainer}>
          <div ref={controlSignalRef} className={styles.alarmLabel}>
            Señal de control
          </div>
          <div ref={outOfRangeRef} className={styles.alarmLabel}>
            Fuera de Rango
          </div>
          <div ref={overLevelRef} className={styles.alarmLabel}>
            Sobre Nivel
          </div>
          <div ref={stableRef} className={styles.alarmLabel}>
            Estado Estable
          </div>
        </div>

        {/* 5. Temperatura deseada */}
        <div className={styles.temperatureContainer}>
          <label>Temperatura Deseada</label>
          <div className={styles.tempControls}>
            <button onClick={handleIncrease}>+</button>
            <input
              type="number"
              value={temperature}
              onChange={e => {
                const v = parseInt(e.target.value) || 0
                setTemperature(Math.max(0, Math.min(40, v)))
              }}
            />
            <button onClick={handleDecrease}>−</button>
          </div>
          <div className={styles.thermometer}>
            <div
              className={styles.thermometerFill}
              style={{ height: `${(temperature / 40) * 100}%` }}
            />
          </div>
        </div>

        {/* 4. Botones de control */}
        <div className={styles.buttonsContainer}>
          <button className={styles.startButton} onClick={handleStart}>
            Start
          </button>
          <button className={styles.stopButton} onClick={handleStop}>
            Stop
          </button>
          <button
            className={styles.emergencyButton}
            onClick={handleEmergencyStop}
          >
            Emergency Stop
          </button>
        </div>
      </div>

      {/* Panel derecho: placeholder para la gráfica */}
      <div className={styles.rightPanel}>
        <iframe
          ref={iframeRef}
          className={styles.graphFrame}
          title="Gráfica en tiempo real"
          src="about:blank"
        />
      </div>
    </div>
  )
}
