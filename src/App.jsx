import { useState } from 'react'

// --- Math ---

function calculateSimpleOffset(offset, run) {
  const travel = Math.sqrt(offset * offset + run * run)
  const angleRad = Math.asin(offset / travel)
  const angleDeg = angleRad * (180 / Math.PI)
  return {
    trueOffset: Math.round(offset * 10000) / 10000,
    travel: Math.round(travel * 10000) / 10000,
    angle: Math.round(angleDeg * 100) / 100,
  }
}

function calculateRollingOffset(rise, roll, run) {
  const trueOffset = Math.sqrt(rise * rise + roll * roll)
  const travel = Math.sqrt(trueOffset * trueOffset + run * run)
  const angleRad = Math.asin(trueOffset / travel)
  const angleDeg = angleRad * (180 / Math.PI)
  return {
    trueOffset: Math.round(trueOffset * 10000) / 10000,
    travel: Math.round(travel * 10000) / 10000,
    angle: Math.round(angleDeg * 100) / 100,
  }
}

// Make-in (engagement depth) by pipe size in inches
const MAKE_IN = {
  0.5: 0.5,
  0.625: 0.5,
  0.75: 0.5625,
  0.875: 0.5625,
  1: 0.6875,
  1.125: 0.625,
  1.5: 0.75,
  2: 0.875,
  3: 1.0,
  4: 1.0625,
  6: 1.1875,
  8: 1.375,
}

function getCutLength(travel, pipeSize, fittingType) {
  let takeOut = 0
  if (fittingType === '90_LR') {
    takeOut = 1.5 * pipeSize
  } else if (fittingType === '45') {
    takeOut = 0.625 * pipeSize
  }
  const makeIn = MAKE_IN[pipeSize] || 0
  return travel - (takeOut * 2) + (makeIn * 2)
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

function decimalToFraction(decimalInches) {
  const whole = Math.floor(decimalInches)
  const remainder = decimalInches - whole
  let sixteenths = Math.round(remainder * 16)

  if (sixteenths === 0) return `${whole}"`
  if (sixteenths === 16) return `${whole + 1}"`

  const g = gcd(sixteenths, 16)
  const num = sixteenths / g
  const den = 16 / g
  return `${whole} ${num}/${den}"`
}

// --- Pipe sizes ---
const PIPE_GROUPS = [
  {
    label: 'ACR',
    sizes: [0.5, 0.625, 0.75, 0.875, 1.125],
    labels: ['½"', '⅝"', '¾"', '⅞"', '1⅛"'],
  },
  {
    label: 'Pipe',
    sizes: [0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8],
    labels: ['½"', '¾"', '1"', '1½"', '2"', '3"', '4"', '6"', '8"'],
  },
]

// --- Styles ---
const styles = {
  body: {
    margin: 0,
    padding: '16px',
    minHeight: '100vh',
    background: '#1a1a2e',
    color: '#e0e0e0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 700,
    margin: '0 0 20px 0',
    color: '#ffffff',
  },
  modeRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginBottom: '24px',
  },
  modeBtn: (active) => ({
    padding: '14px 0',
    fontSize: '18px',
    fontWeight: 700,
    border: active ? '2px solid #4ecca3' : '2px solid #333',
    borderRadius: '10px',
    background: active ? '#4ecca3' : '#16213e',
    color: active ? '#1a1a2e' : '#e0e0e0',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  }),
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '6px',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '24px',
    fontWeight: 700,
    border: '2px solid #333',
    borderRadius: '10px',
    background: '#16213e',
    color: '#fff',
    boxSizing: 'border-box',
    marginBottom: '16px',
    WebkitAppearance: 'none',
  },
  inputError: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '24px',
    fontWeight: 700,
    border: '2px solid #e05c5c',
    borderRadius: '10px',
    background: '#16213e',
    color: '#fff',
    boxSizing: 'border-box',
    marginBottom: '4px',
    WebkitAppearance: 'none',
  },
  errorMsg: {
    fontSize: '14px',
    color: '#e05c5c',
    marginBottom: '12px',
  },
  sizeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    marginBottom: '16px',
  },
  sizeBtn: (active) => ({
    padding: '14px 0',
    fontSize: '20px',
    fontWeight: 700,
    border: active ? '2px solid #4ecca3' : '2px solid #333',
    borderRadius: '10px',
    background: active ? '#4ecca3' : '#16213e',
    color: active ? '#1a1a2e' : '#e0e0e0',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  }),
  fittingRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginBottom: '24px',
  },
  fittingBtn: (active) => ({
    padding: '14px 0',
    fontSize: '20px',
    fontWeight: 700,
    border: active ? '2px solid #4ecca3' : '2px solid #333',
    borderRadius: '10px',
    background: active ? '#4ecca3' : '#16213e',
    color: active ? '#1a1a2e' : '#e0e0e0',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  }),
  calcBtn: {
    width: '100%',
    padding: '18px',
    fontSize: '24px',
    fontWeight: 700,
    border: 'none',
    borderRadius: '12px',
    background: '#4ecca3',
    color: '#1a1a2e',
    cursor: 'pointer',
    marginBottom: '24px',
    WebkitTapHighlightColor: 'transparent',
  },
  resultsBox: {
    background: '#16213e',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '10px 0',
    borderBottom: '1px solid #2a2a4a',
  },
  resultLabel: {
    fontSize: '18px',
    color: '#aaa',
  },
  resultValue: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#fff',
  },
  cutLengthBox: {
    textAlign: 'center',
    background: '#0f3460',
    borderRadius: '12px',
    padding: '24px 16px',
    marginBottom: '16px',
  },
  cutLengthLabel: {
    fontSize: '16px',
    color: '#4ecca3',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '8px',
  },
  cutLengthValue: {
    fontSize: '56px',
    fontWeight: 700,
    color: '#fff',
  },
  travelBox: {
    textAlign: 'center',
    background: '#0f3460',
    borderRadius: '12px',
    padding: '24px 16px',
    marginBottom: '16px',
  },
  travelLabel: {
    fontSize: '16px',
    color: '#4ecca3',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '8px',
  },
  travelValue: {
    fontSize: '56px',
    fontWeight: 700,
    color: '#fff',
  },
  clearBtn: {
    width: '100%',
    padding: '16px',
    fontSize: '20px',
    fontWeight: 700,
    border: '2px solid #555',
    borderRadius: '12px',
    background: 'transparent',
    color: '#aaa',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
}

export default function App() {
  const [mode, setMode] = useState('simple') // 'simple' or 'rolling'

  // Simple offset inputs
  const [offset, setOffset] = useState('')
  const [simpleRun, setSimpleRun] = useState('')

  // Rolling offset inputs
  const [rise, setRise] = useState('')
  const [roll, setRoll] = useState('')
  const [rollingRun, setRollingRun] = useState('')

  const [pipeGroup, setPipeGroup] = useState(1)
  const [pipeSize, setPipeSize] = useState(4)
  const [fittingType, setFittingType] = useState('45')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  function handleCalculate() {
    setError('')
    if (mode === 'simple') {
      const o = parseFloat(offset)
      const u = parseFloat(simpleRun)
      if (isNaN(o) || o <= 0) {
        setError('Enter a valid Offset greater than 0')
        return
      }
      if (isNaN(u) || u <= 0) {
        setError('Enter a valid Run greater than 0')
        return
      }
      const calc = calculateSimpleOffset(o, u)
      const cutLen = getCutLength(calc.travel, pipeSize, fittingType)
      setResults({
        trueOffset: calc.trueOffset,
        travel: calc.travel,
        angle: calc.angle,
        cutLength: cutLen,
        cutFraction: decimalToFraction(Math.max(0, cutLen)),
        travelFraction: decimalToFraction(calc.travel),
      })
    } else {
      const r = parseFloat(rise)
      const o = parseFloat(roll)
      const u = parseFloat(rollingRun)
      if (isNaN(r) || r <= 0) {
        setError('Enter a valid Rise greater than 0')
        return
      }
      if (isNaN(o) || o <= 0) {
        setError('Enter a valid Roll greater than 0')
        return
      }
      if (isNaN(u) || u <= 0) {
        setError('Enter a valid Run greater than 0')
        return
      }
      const calc = calculateRollingOffset(r, o, u)
      const cutLen = getCutLength(calc.travel, pipeSize, fittingType)
      setResults({
        trueOffset: calc.trueOffset,
        travel: calc.travel,
        angle: calc.angle,
        cutLength: cutLen,
        cutFraction: decimalToFraction(Math.max(0, cutLen)),
        travelFraction: decimalToFraction(calc.travel),
      })
    }
  }

  function handleClear() {
    setOffset('')
    setSimpleRun('')
    setRise('')
    setRoll('')
    setRollingRun('')
    setResults(null)
    setError('')
  }

  function handleModeSwitch(newMode) {
    setMode(newMode)
    setResults(null)
    setError('')
  }

  return (
    <div style={styles.body}>
      <h1 style={styles.title}>Pipe Offset Calc</h1>

      {/* Mode Toggle */}
      <div style={styles.modeRow}>
        <button
          style={styles.modeBtn(mode === 'simple')}
          onClick={() => handleModeSwitch('simple')}
        >
          Simple
        </button>
        <button
          style={styles.modeBtn(mode === 'rolling')}
          onClick={() => handleModeSwitch('rolling')}
        >
          Rolling
        </button>
      </div>

      {/* Simple Offset Inputs */}
      {mode === 'simple' && (
        <>
          <label style={styles.label}>Offset (inches)</label>
          <input
            style={styles.input}
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
          />

          <label style={styles.label}>Run (inches)</label>
          <input
            style={styles.input}
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={simpleRun}
            onChange={(e) => setSimpleRun(e.target.value)}
          />
        </>
      )}

      {/* Rolling Offset Inputs */}
      {mode === 'rolling' && (
        <>
          <label style={styles.label}>Rise (inches)</label>
          <input
            style={styles.input}
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={rise}
            onChange={(e) => setRise(e.target.value)}
          />

          <label style={styles.label}>Roll (inches)</label>
          <input
            style={styles.input}
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />

          <label style={styles.label}>Run (inches)</label>
          <input
            style={styles.input}
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={rollingRun}
            onChange={(e) => setRollingRun(e.target.value)}
          />
        </>
      )}

      {/* Error message */}
      {error && <div style={styles.errorMsg}>{error}</div>}

      {/* Pipe Size */}
      <label style={styles.label}>Pipe Size</label>
      <div style={styles.fittingRow}>
        {PIPE_GROUPS.map((group, gi) => (
          <button
            key={group.label}
            style={styles.fittingBtn(pipeGroup === gi)}
            onClick={() => {
              setPipeGroup(gi)
              setPipeSize(PIPE_GROUPS[gi].sizes[0])
            }}
          >
            {group.label}
          </button>
        ))}
      </div>
      <div style={styles.sizeGrid}>
        {PIPE_GROUPS[pipeGroup].sizes.map((size, i) => (
          <button
            key={size}
            style={styles.sizeBtn(pipeSize === size)}
            onClick={() => setPipeSize(size)}
          >
            {PIPE_GROUPS[pipeGroup].labels[i]}
          </button>
        ))}
      </div>

      {/* Fitting Type */}
      <label style={styles.label}>Fitting Type</label>
      <div style={styles.fittingRow}>
        <button
          style={styles.fittingBtn(fittingType === '90_LR')}
          onClick={() => setFittingType('90_LR')}
        >
          90° LR
        </button>
        <button
          style={styles.fittingBtn(fittingType === '45')}
          onClick={() => setFittingType('45')}
        >
          45°
        </button>
      </div>

      {/* Calculate */}
      <button style={styles.calcBtn} onClick={handleCalculate}>
        CALCULATE
      </button>

      {/* Results */}
      {results && (
        <>
          <div style={styles.travelBox}>
            <div style={styles.travelLabel}>Travel</div>
            <div style={styles.travelValue}>{results.travelFraction}</div>
          </div>

          <div style={styles.cutLengthBox}>
            <div style={styles.cutLengthLabel}>Cut Length</div>
            <div style={styles.cutLengthValue}>{results.cutFraction}</div>
          </div>

          <div style={styles.resultsBox}>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>True Offset</span>
              <span style={styles.resultValue}>{results.trueOffset}"</span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Travel</span>
              <span style={styles.resultValue}>{results.travel}"</span>
            </div>
            <div style={{ ...styles.resultRow, borderBottom: 'none' }}>
              <span style={styles.resultLabel}>Angle</span>
              <span style={styles.resultValue}>{results.angle}°</span>
            </div>
          </div>

          <button style={styles.clearBtn} onClick={handleClear}>
            CLEAR
          </button>
        </>
      )}
    </div>
  )
}
