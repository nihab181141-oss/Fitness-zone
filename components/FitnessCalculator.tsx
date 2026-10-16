'use client'

import React, { useState, useMemo } from 'react'
import {
  Activity,
  ArrowUpRight,
  Calculator,
  Check,
  Copy,
  Dumbbell,
  Flame,
  HeartPulse,
  Info,
  RotateCcw,
  Scale,
  Sparkles,
  Waves
} from 'lucide-react'

interface FitnessCalculatorProps {
  onSelectPlan?: (planId: string) => void
}

type UnitSystem = 'metric' | 'imperial'
type Gender = 'male' | 'female'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active'
type Goal = 'loss' | 'maintain' | 'gain'

export default function FitnessCalculator({ onSelectPlan }: FitnessCalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric')
  const [gender, setGender] = useState<Gender>('male')
  const [age, setAge] = useState<number>(24)

  // Metric values
  const [heightCm, setHeightCm] = useState<number>(175)
  const [weightKg, setWeightKg] = useState<number>(72)

  // Imperial values
  const [heightFt, setHeightFt] = useState<number>(5)
  const [heightIn, setHeightIn] = useState<number>(9)
  const [weightLbs, setWeightLbs] = useState<number>(158)

  const [activity, setActivity] = useState<ActivityLevel>('moderate')
  const [goal, setGoal] = useState<Goal>('loss')
  const [copied, setCopied] = useState<boolean>(false)
  const [updatedFeedback, setUpdatedFeedback] = useState<boolean>(false)

  // Unit switch handlers that convert current numbers
  const handleUnitChange = (newUnit: UnitSystem) => {
    if (newUnit === unitSystem) return
    if (newUnit === 'imperial') {
      const totalInches = Math.round(heightCm / 2.54)
      const ft = Math.floor(totalInches / 12)
      const inch = totalInches % 12
      const lbs = Math.round(weightKg * 2.20462)
      setHeightFt(ft || 5)
      setHeightIn(inch || 9)
      setWeightLbs(lbs || 158)
    } else {
      const cm = Math.round((heightFt * 12 + heightIn) * 2.54)
      const kg = Math.round(weightLbs * 0.453592)
      setHeightCm(cm || 175)
      setWeightKg(kg || 72)
    }
    setUnitSystem(newUnit)
  }

  // Calculate normalized metric values
  const normalized = useMemo(() => {
    let effectiveCm = heightCm
    let effectiveKg = weightKg

    if (unitSystem === 'imperial') {
      const totalInches = Math.max(1, heightFt * 12 + heightIn)
      effectiveCm = Math.round(totalInches * 2.54)
      effectiveKg = Math.round(weightLbs * 0.453592)
    }

    const safeCm = Math.max(100, Math.min(240, effectiveCm || 175))
    const safeKg = Math.max(30, Math.min(250, effectiveKg || 70))
    const safeAge = Math.max(14, Math.min(90, age || 24))

    const heightM = safeCm / 100
    const rawBmi = safeKg / (heightM * heightM)
    const bmi = Number(rawBmi.toFixed(1))

    let bmiStatus: {
      category: string
      color: string
      bg: string
      desc: string
      rangeText: string
      percentPosition: number
    } = {
      category: 'Healthy Weight',
      color: '#15803d',
      bg: 'rgba(34,197,94,0.14)',
      desc: 'Optimal range for overall longevity, energy, and muscle retention.',
      rangeText: '18.5 – 24.9',
      percentPosition: 42,
    }

    if (bmi < 18.5) {
      bmiStatus = {
        category: 'Underweight',
        color: '#0284c7',
        bg: 'rgba(14,165,233,0.15)',
        desc: 'Focus on caloric surplus, progressive resistance workouts, and muscle building.',
        rangeText: '< 18.5',
        percentPosition: 14,
      }
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      const offset = ((bmi - 18.5) / 6.4) * 30
      bmiStatus = {
        category: 'Healthy Weight',
        color: '#15803d',
        bg: 'rgba(34,197,94,0.14)',
        desc: 'Great baseline! Maintain consistent strength workouts and clean nutrition.',
        rangeText: '18.5 – 24.9',
        percentPosition: Math.min(55, Math.max(25, 25 + offset)),
      }
    } else if (bmi >= 25 && bmi <= 29.9) {
      const offset = ((bmi - 25) / 4.9) * 20
      bmiStatus = {
        category: 'Overweight',
        color: '#b45309',
        bg: 'rgba(245,158,11,0.18)',
        desc: 'A moderate caloric deficit and structured workout routine will shed body fat rapidly.',
        rangeText: '25.0 – 29.9',
        percentPosition: Math.min(75, Math.max(55, 55 + offset)),
      }
    } else {
      bmiStatus = {
        category: 'Obese Class',
        color: '#b91c1c',
        bg: 'rgba(239,68,68,0.16)',
        desc: 'Prioritize guided resistance training, dedicated cardio, and dietary consistency.',
        rangeText: '≥ 30.0',
        percentPosition: 90,
      }
    }

    // Mifflin-St Jeor BMR
    let bmr = 10 * safeKg + 6.25 * safeCm - 5 * safeAge
    if (gender === 'male') {
      bmr += 5
    } else {
      bmr -= 161
    }

    // Activity multiplier
    const activityMultipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    }

    const tdee = Math.round(bmr * activityMultipliers[activity])

    // Calorie adjustments based on goal
    let targetCalories = tdee
    let goalDescription = ''
    let recommendedPlan = '6-month'
    let planBadge = '6-Month Plan Recommended'

    if (goal === 'loss') {
      targetCalories = Math.max(1200, Math.round(tdee - 450))
      goalDescription = '450 kcal deficit to promote safe, steady 0.5kg/week body fat loss.'
      recommendedPlan = '6-month'
      planBadge = '6-Month Plan (BDT 6,500 - Lowest Admission BDT 300)'
    } else if (goal === 'gain') {
      targetCalories = Math.round(tdee + 350)
      goalDescription = '350 kcal surplus to fuel progressive muscle hypertrophy and strength gains.'
      recommendedPlan = '6-month'
      planBadge = '6-Month Plan (BDT 6,500 - Complete Muscle Routine)'
    } else {
      targetCalories = Math.round(tdee)
      goalDescription = 'Maintenance calories to preserve weight while recomposing body fat into muscle.'
      recommendedPlan = '3-month'
      planBadge = '3-Month Plan (BDT 4,200 - Focused Routine Cycle)'
    }

    // Macro targets
    const proteinLow = Math.round(safeKg * 1.8)
    const proteinHigh = Math.round(safeKg * 2.2)
    const waterLiters = (safeKg * 0.04).toFixed(1)

    return {
      safeCm,
      safeKg,
      safeAge,
      bmi,
      bmiStatus,
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      goalDescription,
      proteinLow,
      proteinHigh,
      waterLiters,
      recommendedPlan,
      planBadge,
    }
  }, [unitSystem, heightCm, heightFt, heightIn, weightKg, weightLbs, age, gender, activity, goal])

  // Presets
  const applyPreset = (preset: 'fatLoss' | 'muscleGain' | 'maintain' | 'reset') => {
    if (preset === 'fatLoss') {
      setUnitSystem('metric')
      setGender('male')
      setAge(26)
      setHeightCm(174)
      setWeightKg(85)
      setActivity('moderate')
      setGoal('loss')
    } else if (preset === 'muscleGain') {
      setUnitSystem('metric')
      setGender('male')
      setAge(22)
      setHeightCm(178)
      setWeightKg(65)
      setActivity('active')
      setGoal('gain')
    } else if (preset === 'maintain') {
      setUnitSystem('metric')
      setGender('male')
      setAge(25)
      setHeightCm(175)
      setWeightKg(70)
      setActivity('moderate')
      setGoal('maintain')
    } else {
      setUnitSystem('metric')
      setGender('male')
      setAge(24)
      setHeightCm(175)
      setWeightKg(72)
      setActivity('moderate')
      setGoal('loss')
    }
    setUpdatedFeedback(true)
    setTimeout(() => setUpdatedFeedback(false), 1500)
  }

  const handleCopySummary = async () => {
    const text = `Fitness Zone Rajshahi - Body Assessment Summary
• BMI: ${normalized.bmi} (${normalized.bmiStatus.category})
• Daily Caloric Target: ${normalized.targetCalories.toLocaleString()} kcal/day (${goal.toUpperCase()})
• Daily Protein: ${normalized.proteinLow}g - ${normalized.proteinHigh}g
• Hydration Target: ${normalized.waterLiters} Liters/day
• Dual-Branch Access: New Market & Bhadra branches with Free Steam Bath`

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch {
      // fallback
    }
  }

  return (
    <div className="calculator-widget-container" id="calculator">
      <div className="calculator-header-row">
        <div>
          <div className="section-kicker" style={{ marginBottom: '8px' }}>
            <Activity size={14} style={{ color: 'var(--brand-red, #EA1E29)' }} />
            <span>INTERACTIVE FITNESS ASSESSMENT</span>
          </div>
          <h3 className="calculator-title">
            Calculate Your <em>BMI &amp; Daily Calorie Target</em>
          </h3>
          <p className="calculator-subtitle">
            Get instant, science-backed guidance on your body mass index, daily maintenance and goal calories,
            protein targets, and ideal workout plan at Fitness Zone Rajshahi.
          </p>
        </div>

        {/* Quick Presets & Reset */}
        <div className="calculator-preset-bar">
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 800, opacity: 0.6 }}>
            Quick Presets:
          </span>
          <button
            type="button"
            className="preset-pill-btn"
            onClick={() => applyPreset('fatLoss')}
          >
            🔥 Fat Loss (85kg)
          </button>
          <button
            type="button"
            className="preset-pill-btn"
            onClick={() => applyPreset('muscleGain')}
          >
            💪 Muscle Build (65kg)
          </button>
          <button
            type="button"
            className="preset-pill-btn"
            onClick={() => applyPreset('maintain')}
          >
            ⚖️ Maintain (70kg)
          </button>
          <button
            type="button"
            className="preset-pill-btn reset-btn"
            onClick={() => applyPreset('reset')}
            title="Reset to default"
          >
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      <div className="calculator-card-grid">
        {/* LEFT COLUMN: INTERACTIVE INPUTS (Color: #ffffff) */}
        <div className="calculator-inputs-card">
          <div>
            <div className="calc-card-title-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '15px' }}>
                <Scale size={18} style={{ color: 'var(--ink)' }} />
                <span>Your Body Parameters</span>
              </div>

              {/* Metric / Imperial toggle */}
              <div className="unit-toggle-group" role="radiogroup" aria-label="Unit System">
                <button
                  type="button"
                  className={`unit-toggle-btn ${unitSystem === 'metric' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('metric')}
                >
                  Metric (kg / cm)
                </button>
                <button
                  type="button"
                  className={`unit-toggle-btn ${unitSystem === 'imperial' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('imperial')}
                >
                  Imperial (lbs / ft)
                </button>
              </div>
            </div>

            {/* Gender Selector */}
            <div className="calc-input-block">
              <label className="calc-label">Gender (for metabolic formula)</label>
              <div className="calc-btn-group">
                <button
                  type="button"
                  className={`calc-option-btn ${gender === 'male' ? 'active' : ''}`}
                  onClick={() => setGender('male')}
                >
                  👨 Male {gender === 'male' && <Check size={14} />}
                </button>
                <button
                  type="button"
                  className={`calc-option-btn ${gender === 'female' ? 'active' : ''}`}
                  onClick={() => setGender('female')}
                >
                  👩 Female (Separate Slots Available) {gender === 'female' && <Check size={14} />}
                </button>
              </div>
            </div>

            {/* Age & Height */}
            <div className="calc-inputs-row">
              {/* Age block with stepper */}
              <div className="calc-input-block" style={{ flex: 1 }}>
                <div className="calc-label">
                  <span>Age</span>
                  <div className="stepper-row">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => setAge((prev) => Math.max(14, prev - 1))}
                      aria-label="Decrease age"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={14}
                      max={90}
                      value={age}
                      onChange={(e) => setAge(Math.max(14, Math.min(90, Number(e.target.value) || 14)))}
                      className="stepper-num-input"
                      aria-label="Age"
                    />
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => setAge((prev) => Math.min(90, prev + 1))}
                      aria-label="Increase age"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  id="calc-age"
                  type="range"
                  min={14}
                  max={85}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="calc-range-slider"
                  aria-label="Age slider"
                />
                <div className="range-marks">
                  <span>14 yrs</span>
                  <span>45 yrs</span>
                  <span>85 yrs</span>
                </div>
              </div>

              {/* Height input with stepper */}
              {unitSystem === 'metric' ? (
                <div className="calc-input-block" style={{ flex: 1.2 }}>
                  <div className="calc-label">
                    <span>Height (cm)</span>
                    <div className="stepper-row">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setHeightCm((prev) => Math.max(100, prev - 1))}
                        aria-label="Decrease height"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={100}
                        max={240}
                        value={heightCm}
                        onChange={(e) => setHeightCm(Math.max(100, Math.min(240, Number(e.target.value) || 100)))}
                        className="stepper-num-input"
                        aria-label="Height in cm"
                      />
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setHeightCm((prev) => Math.min(240, prev + 1))}
                        aria-label="Increase height"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <input
                    id="calc-height-cm"
                    type="range"
                    min={120}
                    max={220}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="calc-range-slider"
                    aria-label="Height slider"
                  />
                  <div className="range-marks">
                    <span>120 cm</span>
                    <span>175 cm</span>
                    <span>220 cm</span>
                  </div>
                </div>
              ) : (
                <div className="calc-input-block" style={{ flex: 1.2 }}>
                  <div className="calc-label">
                    <span>Height (ft &amp; in)</span>
                    <strong>{heightFt}&apos;{heightIn}&quot;</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      className="calc-select"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      aria-label="Height feet"
                    >
                      {[4, 5, 6, 7].map((f) => (
                        <option key={f} value={f}>
                          {f} ft
                        </option>
                      ))}
                    </select>
                    <select
                      className="calc-select"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      aria-label="Height inches"
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inch) => (
                        <option key={inch} value={inch}>
                          {inch} in
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Weight with stepper */}
            <div className="calc-input-block">
              {unitSystem === 'metric' ? (
                <>
                  <div className="calc-label">
                    <span>Current Weight (kg)</span>
                    <div className="stepper-row">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setWeightKg((prev) => Math.max(30, prev - 1))}
                        aria-label="Decrease weight"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={30}
                        max={220}
                        value={weightKg}
                        onChange={(e) => setWeightKg(Math.max(30, Math.min(220, Number(e.target.value) || 30)))}
                        className="stepper-num-input"
                        aria-label="Weight in kg"
                      />
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setWeightKg((prev) => Math.min(220, prev + 1))}
                        aria-label="Increase weight"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <input
                    id="calc-weight-kg"
                    type="range"
                    min={35}
                    max={160}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="calc-range-slider"
                    aria-label="Weight slider"
                  />
                  <div className="range-marks">
                    <span>35 kg</span>
                    <span>75 kg</span>
                    <span>160 kg</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="calc-label">
                    <span>Current Weight (lbs)</span>
                    <div className="stepper-row">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setWeightLbs((prev) => Math.max(70, prev - 2))}
                        aria-label="Decrease weight"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={70}
                        max={450}
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(Math.max(70, Math.min(450, Number(e.target.value) || 70)))}
                        className="stepper-num-input"
                        aria-label="Weight in lbs"
                      />
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setWeightLbs((prev) => Math.min(450, prev + 2))}
                        aria-label="Increase weight"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <input
                    id="calc-weight-lbs"
                    type="range"
                    min={80}
                    max={350}
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="calc-range-slider"
                    aria-label="Weight lbs slider"
                  />
                  <div className="range-marks">
                    <span>80 lbs</span>
                    <span>165 lbs</span>
                    <span>350 lbs</span>
                  </div>
                </>
              )}
            </div>

            {/* Activity Level */}
            <div className="calc-input-block">
              <label className="calc-label">Workout / Activity Frequency</label>
              <div className="activity-grid">
                {[
                  { id: 'sedentary', label: 'Sedentary', sub: 'Desk job, low activity' },
                  { id: 'light', label: 'Light', sub: '1–2 gym sessions/wk' },
                  { id: 'moderate', label: 'Moderate', sub: '3–5 days at Fitness Zone' },
                  { id: 'active', label: 'Intense / Athlete', sub: '6+ hard sessions/wk' },
                ].map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    className={`activity-choice-btn ${activity === act.id ? 'active' : ''}`}
                    onClick={() => setActivity(act.id as ActivityLevel)}
                  >
                    <div className="act-title">
                      {act.label} {activity === act.id && <Check size={12} style={{ display: 'inline', marginLeft: '4px' }} />}
                    </div>
                    <div className="act-sub">{act.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Goal */}
            <div className="calc-input-block" style={{ marginBottom: 0 }}>
              <label className="calc-label">Target Fitness Goal</label>
              <div className="calc-btn-group">
                {[
                  { id: 'loss', icon: Flame, label: 'Fat Loss & Tone' },
                  { id: 'maintain', icon: HeartPulse, label: 'Maintain / Recompose' },
                  { id: 'gain', icon: Dumbbell, label: 'Build Muscle' },
                ].map((g) => {
                  const IconComponent = g.icon
                  return (
                    <button
                      key={g.id}
                      type="button"
                      className={`calc-option-btn ${goal === g.id ? 'active' : ''}`}
                      onClick={() => setGoal(g.id as Goal)}
                    >
                      <IconComponent size={14} />
                      <span>{g.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Action button to trigger instant recalculate feedback */}
          <div style={{ marginTop: '22px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
            <button
              type="button"
              className="lime-button"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setUpdatedFeedback(true)
                setTimeout(() => setUpdatedFeedback(false), 2000)
              }}
            >
              {updatedFeedback ? (
                <>
                  <Check size={16} /> Targets Updated!
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Update &amp; Calculate Targets
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: CALIBRATED RESULTS & RECOMMENDATIONS (Color: #ffffff - Identical to left card) */}
        <div className="calculator-results-card">
          <div>
            <div className="calc-card-title-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '15px' }}>
                <Calculator size={18} style={{ color: 'var(--ink)' }} />
                <span>Your Live Health &amp; Goal Metrics</span>
              </div>

              <button
                type="button"
                className="copy-summary-btn"
                onClick={handleCopySummary}
                title="Copy your calculated stats"
              >
                {copied ? (
                  <>
                    <Check size={13} style={{ color: '#16a34a' }} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={13} /> Copy Stats
                  </>
                )}
              </button>
            </div>

            {/* PRIMARY STATS ROW */}
            <div className="calc-key-metrics-grid">
              {/* BMI Display */}
              <div className="metric-box">
                <div className="metric-header">
                  <span className="metric-label">Body Mass Index (BMI)</span>
                  <span
                    className="metric-status-badge"
                    style={{
                      color: normalized.bmiStatus.color,
                      background: normalized.bmiStatus.bg,
                    }}
                  >
                    {normalized.bmiStatus.category}
                  </span>
                </div>
                <div className="metric-huge-value">
                  {normalized.bmi}
                  <span className="metric-unit">kg/m²</span>
                </div>

                {/* Visual gauge bar */}
                <div className="bmi-gauge-container">
                  <div className="bmi-gauge-bar">
                    <div className="gauge-segment under" title="Underweight (<18.5)" />
                    <div className="gauge-segment normal" title="Normal (18.5 - 24.9)" />
                    <div className="gauge-segment over" title="Overweight (25 - 29.9)" />
                    <div className="gauge-segment obese" title="Obese (≥30)" />
                  </div>
                  {/* Pointer marker */}
                  <div
                    className="bmi-gauge-pointer"
                    style={{ left: `${normalized.bmiStatus.percentPosition}%` }}
                  />
                </div>
                <div className="bmi-legend">
                  <span>&lt;18.5</span>
                  <span>18.5 - 24.9</span>
                  <span>25 - 29.9</span>
                  <span>30+</span>
                </div>
                <p className="metric-note">{normalized.bmiStatus.desc}</p>
              </div>

              {/* Daily Calorie Goal */}
              <div className="metric-box highlight">
                <div className="metric-header">
                  <span className="metric-label">Daily Calorie Target</span>
                  <span className="calorie-goal-tag">
                    {goal === 'loss' ? '🔥 450 kcal Deficit' : goal === 'gain' ? '💪 350 kcal Surplus' : '⚖️ Maintenance'}
                  </span>
                </div>
                <div className="metric-huge-value">
                  {normalized.targetCalories.toLocaleString()}
                  <span className="metric-unit">kcal / day</span>
                </div>
                <div className="tdee-subrow">
                  <span>Estimated Maintenance (TDEE):</span>
                  <strong>{normalized.tdee.toLocaleString()} kcal</strong>
                </div>
                <p className="metric-note">{normalized.goalDescription}</p>
              </div>
            </div>

            {/* SECONDARY MACRO & HYDRATION TARGETS */}
            <div className="calc-secondary-targets">
              <div className="macro-chip">
                <div className="macro-icon-wrap" style={{ background: 'rgba(234, 30, 41, 0.15)', color: 'var(--brand-red, #EA1E29)' }}>
                  <Dumbbell size={15} />
                </div>
                <div>
                  <div className="macro-label">Target Protein</div>
                  <div className="macro-value">
                    {normalized.proteinLow}g – {normalized.proteinHigh}g
                    <span className="macro-sub"> / day</span>
                  </div>
                </div>
              </div>

              <div className="macro-chip">
                <div className="macro-icon-wrap" style={{ background: 'rgba(14,165,233,0.18)', color: '#0284c7' }}>
                  <Waves size={15} />
                </div>
                <div>
                  <div className="macro-label">Hydration Target</div>
                  <div className="macro-value">
                    {normalized.waterLiters} Liters
                    <span className="macro-sub"> / day</span>
                  </div>
                </div>
              </div>

              <div className="macro-chip">
                <div className="macro-icon-wrap" style={{ background: 'rgba(234,179,8,0.18)', color: '#b45309' }}>
                  <Flame size={15} />
                </div>
                <div>
                  <div className="macro-label">Basal Metabolic Rate</div>
                  <div className="macro-value">
                    {normalized.bmr.toLocaleString()}
                    <span className="macro-sub"> kcal (BMR)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* TAILORED GYM RECOMMENDATION BOX */}
            <div className="calc-recommendation-box">
              <div className="recom-content">
                <div className="recom-badge">
                  <Sparkles size={12} /> Recommended at Fitness Zone
                </div>
                <div className="recom-title">{normalized.planBadge}</div>
                <p className="recom-text">
                  Includes dual-branch access at both <strong>New Market</strong> &amp; <strong>Bhadra</strong> branches,
                  free steam bath facilities for faster recovery, and merchant partner discounts.
                </p>
              </div>

              <button
                type="button"
                className="lime-button recom-cta-btn"
                onClick={() => onSelectPlan && onSelectPlan(normalized.recommendedPlan)}
              >
                Apply to Admission <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="calc-disclaimer">
              <Info size={13} style={{ flexShrink: 0, marginTop: '2px', opacity: 0.7 }} />
              <span>
                Calculated using the validated Mifflin-St Jeor metabolic formula. For personalized workout routines and
                nutrition guidance, our certified trainers at both branches assist members upon admission.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
