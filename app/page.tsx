'use client'

import { useState, useEffect } from 'react'
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Clock3,
  ExternalLink,
  MapPin,
  Menu,
  MessageCircle,
  Percent,
  Sparkles,
  Users2,
  X
} from 'lucide-react'
import BrandLogo from '@/components/BrandLogo'

// Centralized verified business information for Fitness Zone Rajshahi
export const BUSINESS_INFO = {
  brand: 'Fitness Zone Rajshahi',
  tagline: 'Premier Dual-Branch Gym in Rajshahi',
  dualBranchBenefit:
    'A customer who takes admission at either branch can work out at BOTH Fitness Zone branches.',
  steamBathHighlight:
    'Fitness Zone Rajshahi offers free steam bath facilities at both branches. It is the only gym in Rajshahi offering free steam bath facilities.',
  monthlyRenewalPolicy:
    'After any membership package expires, the monthly renewal fee is BDT 1,000.',
}

export const BRANCHES = [
  {
    id: 'new-market',
    name: 'New Market Branch',
    shortName: 'New Market',
    address:
      '3rd Floor, Bangali Bhoj Building, beside Nadia Furniture, next to P.G. Tower and Theme Omar Plaza, New Market, Rajshahi, Bangladesh.',
    landmarks: 'Beside Nadia Furniture, next to P.G. Tower & Theme Omar Plaza',
    floor: '3rd Floor, Bangali Bhoj Building',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Fitness+Zone+Bangali+Bhoj+Building+New+Market+Rajshahi',
    features: [
      'Dual-Branch access included',
      'Free steam bath facilities',
      'Dedicated female-only workout hours',
      'Full strength & cardiovascular zone',
    ],
  },
  {
    id: 'bhadra',
    name: 'Bhadra Branch',
    shortName: 'Bhadra More',
    address:
      'Ismail Heights Building (Tasty Treat), Bhadra More, Rajshahi, Bangladesh.',
    landmarks: 'Ismail Heights Building (Tasty Treat), Bhadra More',
    floor: 'Ismail Heights Building',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Fitness+Zone+Ismail+Heights+Tasty+Treat+Bhadra+More+Rajshahi',
    features: [
      'Dual-Branch access included',
      'Free steam bath facilities',
      'Dedicated female-only workout hours',
      'Advanced conditioning & weight room',
    ],
  },
]

export const MEMBERSHIP_PACKAGES = [
  {
    id: '1-month',
    name: '1-Month Membership',
    duration: '1 Month',
    totalPrice: 'BDT 3,200',
    priceNumber: 3200,
    featured: false,
    badge: 'Standard Starter',
    description: 'Ideal starting plan for individuals building routine.',
    breakdown: [
      { label: 'Admission Fee', amount: 'BDT 2,000' },
      { label: 'Monthly Membership Fee', amount: 'BDT 1,000' },
      { label: 'Membership Card Fee', amount: 'BDT 200' },
    ],
    features: [
      'Access to BOTH New Market & Bhadra branches',
      'Free steam bath facilities at both locations',
      'Access during Combined & Female-only hours',
      'Member discount card for 8 local merchant partners',
    ],
  },
  {
    id: '3-month',
    name: '3-Month Membership',
    duration: '3 Months',
    totalPrice: 'BDT 4,200',
    priceNumber: 4200,
    featured: false,
    badge: 'Quarterly Value',
    description: 'Reduced admission fee for a focused 90-day progress cycle.',
    breakdown: [
      { label: 'Admission Fee', amount: 'BDT 1,000' },
      { label: 'Membership Fee (3 Months)', amount: 'BDT 3,000' },
      { label: 'Membership Card Fee', amount: 'BDT 200' },
    ],
    features: [
      'Access to BOTH New Market & Bhadra branches',
      'Free steam bath facilities at both locations',
      'Admission fee discounted to BDT 1,000',
      'Member discount card for 8 local merchant partners',
    ],
  },
  {
    id: '6-month',
    name: '6-Month Membership',
    duration: '6 Months',
    totalPrice: 'BDT 6,500',
    priceNumber: 6500,
    featured: false,
    badge: 'Most Popular',
    description: 'Exceptional value with admission reduced to just BDT 300.',
    breakdown: [
      { label: 'Admission Fee', amount: 'BDT 300' },
      { label: 'Membership Fee (6 Months)', amount: 'BDT 6,000' },
      { label: 'Membership Card Fee', amount: 'BDT 200' },
    ],
    features: [
      'Access to BOTH New Market & Bhadra branches',
      'Free steam bath facilities at both locations',
      'Lowest admission fee at only BDT 300',
      'Member discount card for 8 local merchant partners',
      'Renewal at BDT 1,000/month after completion',
    ],
  },
  {
    id: '12-month',
    name: '12-Month Membership',
    duration: '12 Months (1 Year)',
    totalPrice: 'BDT 11,000',
    priceNumber: 11000,
    featured: false,
    badge: 'Best Annual Value',
    description: 'Full year of unrestricted fitness and premium health perks.',
    breakdown: null, // Exact pricing rule: do not invent breakdowns
    features: [
      'Access to BOTH New Market & Bhadra branches',
      'Free steam bath facilities at both locations',
      'Comprehensive 365-day access pass',
      'Member discount card for 8 local merchant partners',
    ],
  },
  {
    id: 'lifetime',
    name: 'Lifetime Membership',
    duration: 'Lifetime Access',
    totalPrice: 'BDT 50,000',
    priceNumber: 50000,
    featured: false,
    badge: 'Ultimate Tier',
    description: 'Permanent admission and lifetime membership privileges.',
    breakdown: null, // Exact pricing rule: do not invent breakdowns
    features: [
      'Permanent lifetime access to BOTH branches',
      'Unlimited free steam bath facilities',
      'No monthly renewal fees ever',
      'Lifetime partner discount card privileges',
    ],
  },
]

export const SCHEDULES = {
  'new-market': {
    branchName: 'New Market Branch',
    location: '3rd Floor, Bangali Bhoj Building, New Market',
    combined: [
      { period: 'Morning Session', time: '8:30 AM – 12:30 PM' },
      { period: 'Evening Session', time: '5:00 PM – 11:30 PM' },
    ],
    femaleOnly: [
      { period: 'Morning Session', time: '6:00 AM – 8:30 AM' },
      { period: 'Afternoon Session', time: '12:30 PM – 5:00 PM' },
    ],
  },
  'bhadra': {
    branchName: 'Bhadra Branch',
    location: 'Ismail Heights Building (Tasty Treat), Bhadra More',
    combined: [
      { period: 'Morning Session', time: '6:00 AM – 11:00 AM' },
      { period: 'Evening Session', time: '5:00 PM – 11:30 PM' },
    ],
    femaleOnly: [
      { period: 'Dedicated Daytime Slot', time: '11:00 AM – 5:00 PM' },
    ],
  },
}

export const DISCOUNT_PARTNERS = [
  {
    name: 'Kazi Castle',
    discount: '10–50% discount',
    category: 'Dining & Hospitality',
  },
  {
    name: 'Aurora — All Branches',
    discount: '15% discount',
    category: 'Lifestyle & Retail',
  },
  {
    name: 'Ibn Sina',
    discount: '35% discount',
    category: 'Healthcare & Diagnostics',
  },
  {
    name: 'Fleet Buy',
    discount: '5–10% discount',
    category: 'Shopping & Retail',
  },
  {
    name: 'Adi International Hotel & Restaurant',
    discount: '15% discount',
    category: 'Hotel & Dining',
  },
  {
    name: 'Usha Silk',
    discount: '20% discount',
    category: 'Traditional & Silk Wear',
  },
  {
    name: 'Gleams',
    discount: '10% discount',
    category: 'Fashion & Apparel',
  },
  {
    name: 'Samiul Khan Makeover',
    discount: '10% discount',
    category: 'Grooming & Salon',
  },
]

export const FAQS = [
  {
    question: 'Can I work out at both branches with one membership?',
    answer:
      'Yes, absolutely. A customer who takes admission at either the New Market branch or the Bhadra branch can work out at BOTH Fitness Zone branches across Rajshahi with no additional admission fee.',
  },
  {
    question: 'Is the steam bath facility really free?',
    answer:
      'Yes! Fitness Zone Rajshahi offers free steam bath facilities at both branches. Fitness Zone is proudly the only gym in Rajshahi providing free steam bath facilities to its members.',
  },
  {
    question: 'What is the monthly renewal policy after my package expires?',
    answer:
      'After any membership package expires (1-month, 3-month, 6-month, or 12-month), the ongoing monthly renewal fee is simply BDT 1,000.',
  },
  {
    question: 'Are there separate workout hours for female members?',
    answer:
      'Yes, both branches have dedicated female-only hours. At New Market: 6:00 AM – 8:30 AM and 12:30 PM – 5:00 PM. At Bhadra: 11:00 AM – 5:00 PM. During these slots, access is exclusively for female members with dedicated privacy.',
  },
  {
    question: 'How do I claim discounts at the partner businesses?',
    answer:
      'Simply show your active Fitness Zone Rajshahi membership card at any of our 8 participating partner businesses (Kazi Castle, Aurora, Ibn Sina, Fleet Buy, Adi International Hotel & Restaurant, Usha Silk, Gleams, Samiul Khan Makeover) to receive discounts ranging from 5% up to 50%.',
  },
]

export default function Page() {
  const [activeBranchSchedule, setActiveBranchSchedule] = useState<'all' | 'new-market' | 'bhadra'>('all')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('6-month')
  const [selectedBranch, setSelectedBranch] = useState('new-market')
  const [sessionPreference, setSessionPreference] = useState<'combined' | 'female-only'>('combined')
  const [admissionFormSubmitted, setAdmissionFormSubmitted] = useState(false)
  const [applicantName, setApplicantName] = useState('')
  const [applicantPhone, setApplicantPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [admissionReceipt, setAdmissionReceipt] = useState<{ id: string; submittedAt: string } | null>(null)

  const handleOpenAdmission = (planId?: string, branchId?: string) => {
    if (planId) setSelectedPlan(planId)
    if (branchId) setSelectedBranch(branchId)
    setAdmissionFormSubmitted(false)
    setSubmitError(null)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const cleanPhone = applicantPhone.replace(/[\s\-()]/g, '')
    if (!applicantName.trim() || applicantName.trim().length < 2) {
      setSubmitError('Please enter your full name (minimum 2 characters).')
      return
    }

    if (!cleanPhone || cleanPhone.length < 9 || !/^\+?[0-9]{9,16}$/.test(cleanPhone)) {
      setSubmitError('Please enter a valid phone number (e.g. 017XXXXXXXX).')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: applicantName.trim(),
          phone: cleanPhone,
          planId: selectedPlan,
          branchId: selectedBranch,
          sessionPreference,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Unable to record admission request. Please try again.')
      }

      setAdmissionReceipt({
        id: data.admissionId || `FZ-${Date.now().toString().slice(-6)}`,
        submittedAt: data.submittedAt || new Date().toISOString(),
      })

      try {
        localStorage.setItem(
          'fz_admission_record',
          JSON.stringify({
            id: data.admissionId,
            name: applicantName.trim(),
            phone: cleanPhone,
            planId: selectedPlan,
            branchId: selectedBranch,
            sessionPreference,
            submittedAt: new Date().toISOString(),
          })
        )
      } catch {
        // Safe fallback if local storage is restricted
      }

      setAdmissionFormSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An error occurred during submission.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetAdmissionForm = () => {
    setAdmissionFormSubmitted(false)
    setSubmitError(null)
    setAdmissionReceipt(null)
  }

  const currentPlanObj = MEMBERSHIP_PACKAGES.find((p) => p.id === selectedPlan) || MEMBERSHIP_PACKAGES[2]
  const currentBranchObj = BRANCHES.find((b) => b.id === selectedBranch) || BRANCHES[0]

  return (
    <main className="site-shell">
      {/* SECTION 02: ANNOUNCEMENT BAR */}
      <aside className="announcement-bar" aria-label="Important Announcement">
        <div className="container announcement-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="announcement-badge">
              <Sparkles size={11} /> Dual-Branch Privilege
            </span>
            <span>
              Admission at either branch grants workout access to <strong>BOTH</strong> branches!
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span>Exclusive: Free Steam Bath Facilities at Both Branches</span>
            <a
              href="#pricing"
              style={{
                textDecoration: 'underline',
                fontWeight: 700,
                color: 'var(--brand-red, #EA1E29)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              View Rates <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </aside>

      {/* SECTION 01: STICKY HEADER & ACCESSIBLE NAVIGATION */}
      <header className="site-header">
        <div className="container nav">
          <BrandLogo variant="header" />

          <nav className={`nav-links ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Primary Navigation">
            <a href="#branches" onClick={() => setMobileMenuOpen(false)}>Branches</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Memberships</a>
            <a href="#schedule" onClick={() => setMobileMenuOpen(false)}>Schedule</a>
            <a href="#benefits" onClick={() => setMobileMenuOpen(false)}>Steam Bath</a>
            <a href="#discounts" onClick={() => setMobileMenuOpen(false)}>Discounts</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <button
              type="button"
              className="nav-cta"
              onClick={() => {
                setMobileMenuOpen(false)
                handleOpenAdmission('6-month', 'new-market')
              }}
            >
              Take Admission <ArrowUpRight size={14} />
            </button>
          </nav>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* SECTION 03: HERO SECTION */}
      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="hero-content container">
          <p className="eyebrow light">
            <span className="eyebrow-line" /> RAJSHAHI, BANGLADESH · NEW MARKET &amp; BHADRA <span className="eyebrow-line" />
          </p>
          <h1>
            Fitness<br />
            <em>redefined.</em>
          </h1>
          <p className="hero-copy">
            Rajshahi&apos;s premier destination for strength, conditioning, and healthy living.
            Join at either New Market or Bhadra and enjoy workout access at <strong>both branches</strong>,
            complimentary steam bath facilities, and dedicated female-only hours.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="lime-button"
              onClick={() => handleOpenAdmission('6-month', 'new-market')}
            >
              Take Admission Now <ArrowUpRight size={17} />
            </button>
            <a className="outline-button-light" href="#schedule">
              Check Schedules <ArrowDownRight size={17} />
            </a>
          </div>

          <div className="hero-badge-strip">
            <div className="hero-badge-item">
              <Check size={14} /> 1 Admission = Both Branches Access
            </div>
            <div className="hero-badge-item">
              <Users2 size={14} /> Dedicated Female-Only Hours
            </div>
          </div>
        </div>
      </section>

      {/* PROMINENT DUAL-BRANCH PRIVILEGE CALLOUT */}
      <section className="dual-branch-strip" id="dual-branch">
        <div className="container dual-branch-card">
          <div>
            <h3>
              One Membership.<br />
              <em>Two Strategic Branches.</em>
            </h3>
            <p>
              {BUSINESS_INFO.dualBranchBenefit} Whether you are near New Market for shopping and work
              or near Bhadra More for commuting and home, your Fitness Zone membership travels with you
              freely across Rajshahi.
            </p>
            <a className="outline-button-light" href="#branches">
              Explore Branch Locations <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="dual-branch-pills">
            <div className="branch-mini-box">
              <span className="branch-mini-tag">Branch 01</span>
              <div className="branch-mini-title">New Market Branch</div>
              <div className="branch-mini-addr">
                3rd Floor, Bangali Bhoj Building, beside Nadia Furniture, next to P.G. Tower &amp; Theme Omar Plaza
              </div>
            </div>

            <div className="branch-mini-box">
              <span className="branch-mini-tag">Branch 02</span>
              <div className="branch-mini-title">Bhadra Branch</div>
              <div className="branch-mini-addr">
                Ismail Heights Building (Tasty Treat), Bhadra More, Rajshahi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 08 / 02: BUSINESS LOCATIONS */}
      <section className="branches-section container" id="branches">
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              <span>01</span>
              <span className="kicker-line" />
              <span>FACILITIES IN RAJSHAHI</span>
            </div>
            <h2>
              Two premium <em>locations.</em>
            </h2>
          </div>
          <p>
            Both branches are equipped with modern strength gear, cardio lines, clean locker facilities,
            and dedicated steam bath chambers.
          </p>
        </div>

        <div className="branch-grid">
          {BRANCHES.map((branch) => (
            <article className="branch-card" key={branch.id}>
              <div>
                <span className="branch-badge">
                  <MapPin size={12} /> {branch.name}
                </span>
                <h3 className="branch-title">{branch.shortName}</h3>
                <p className="branch-address">{branch.address}</p>

                <ul className="branch-perks">
                  {branch.features.map((feat, idx) => (
                    <li key={idx}>
                      <Check size={16} /> <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="lime-button"
                  onClick={() => handleOpenAdmission('6-month', branch.id)}
                >
                  Join at {branch.shortName} <ArrowUpRight size={15} />
                </button>
                <button
                  type="button"
                  className="outline-button"
                  onClick={() => {
                    setActiveBranchSchedule(branch.id as 'new-market' | 'bhadra')
                    const el = document.getElementById('schedule')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  View Schedule
                </button>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-button"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  Directions <ExternalLink size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 14 / 15: MEMBERSHIP PACKAGES AND PRICING */}
      <section className="pricing-section container" id="pricing">
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              <span>02</span>
              <span className="kicker-line" />
              <span>TRANSPARENT ADMISSION &amp; PLANS</span>
            </div>
            <h2>
              Membership <em>packages.</em>
            </h2>
          </div>
          <div>
            <p>
              All prices are strictly in BDT. Every package includes dual-branch access across both New Market
              and Bhadra, complimentary steam bath facilities, and local merchant discounts.
            </p>
            <a className="text-link" href="#schedule">
              See workout timings before joining <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* First 3 packages (1-Month, 3-Month, 6-Month with detailed breakdowns) */}
        <div className="pricing-grid">
          {MEMBERSHIP_PACKAGES.slice(0, 3).map((pkg) => (
            <div
              className={`pricing-card ${pkg.featured ? 'featured' : ''}`}
              key={pkg.id}
            >
              <div>
                <div className="plan-header">
                  <span className="plan-duration">{pkg.duration}</span>
                  <h3 className="plan-name">{pkg.name}</h3>
                  <p style={{ fontSize: '13px', opacity: 0.8, margin: 0 }}>
                    {pkg.description}
                  </p>
                </div>

                <div className="plan-price-block">
                  <div className="plan-price-label">Total Package Price</div>
                  <div className="plan-price">{pkg.totalPrice}</div>
                </div>

                {pkg.breakdown && (
                  <div className="breakdown-box">
                    <div style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '.1em', marginBottom: '6px' }}>
                      Exact Fee Breakdown
                    </div>
                    {pkg.breakdown.map((item, idx) => (
                      <div className="breakdown-row" key={idx}>
                        <span>{item.label}</span>
                        <strong>{item.amount}</strong>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="plan-features">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx}>
                      <Check size={16} /> <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={pkg.featured ? 'lime-button' : 'outline-button'}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => handleOpenAdmission(pkg.id)}
              >
                Choose {pkg.duration} ({pkg.totalPrice}) <ArrowUpRight size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Long-term tiers: 12-Month & Lifetime (without invented breakdowns) */}
        <div className="pricing-grid-extended">
          {MEMBERSHIP_PACKAGES.slice(3).map((pkg) => (
            <div className="pricing-card" key={pkg.id}>
              <div>
                <div className="plan-header">
                  <span className="plan-duration">{pkg.duration}</span>
                  <h3 className="plan-name">{pkg.name}</h3>
                  <p style={{ fontSize: '13px', opacity: 0.8, margin: 0 }}>
                    {pkg.description}
                  </p>
                </div>

                <div className="plan-price-block">
                  <div className="plan-price-label">Total Package Price</div>
                  <div className="plan-price">{pkg.totalPrice}</div>
                </div>

                <ul className="plan-features">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx}>
                      <Check size={16} /> <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="outline-button"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => handleOpenAdmission(pkg.id)}
              >
                Choose {pkg.name} ({pkg.totalPrice}) <ArrowUpRight size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Monthly Renewal Policy Box */}
        <div className="renewal-notice-box">
          <div>
            <h4>Monthly Renewal Policy</h4>
            <p>{BUSINESS_INFO.monthlyRenewalPolicy}</p>
          </div>
          <div className="renewal-badge">Renewal Fee: BDT 1,000 / Month</div>
        </div>
      </section>

      {/* SECTION 09: WORKOUT SCHEDULE */}
      <section className="schedule container" id="schedule">
        <div className="section-heading schedule-heading">
          <div>
            <div className="section-kicker">
              <span>03</span>
              <span className="kicker-line" />
              <span>HOURS OF OPERATION</span>
            </div>
            <h2>
              Workout <em>schedules.</em>
            </h2>
          </div>
          <p>
            Clearly separated by branch and gender access. Female members have dedicated exclusive slots
            for maximum comfort and privacy, alongside flexible combined hours.
          </p>
        </div>

        {/* Branch Switcher Tabs */}
        <div className="schedule-tabs-wrap" role="tablist" aria-label="Workout Schedule by Branch">
          <button
            type="button"
            role="tab"
            aria-selected={activeBranchSchedule === 'all'}
            className={`branch-tab-btn ${activeBranchSchedule === 'all' ? 'active' : ''}`}
            onClick={() => setActiveBranchSchedule('all')}
          >
            <Sparkles size={14} /> Both Branches (All Timings)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeBranchSchedule === 'new-market'}
            className={`branch-tab-btn ${activeBranchSchedule === 'new-market' ? 'active' : ''}`}
            onClick={() => setActiveBranchSchedule('new-market')}
          >
            <MapPin size={14} /> New Market Branch
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeBranchSchedule === 'bhadra'}
            className={`branch-tab-btn ${activeBranchSchedule === 'bhadra' ? 'active' : ''}`}
            onClick={() => setActiveBranchSchedule('bhadra')}
          >
            <MapPin size={14} /> Bhadra Branch
          </button>
        </div>

        {/* Schedule Display Container */}
        <div>
          {/* NEW MARKET BRANCH BLOCK */}
          {(activeBranchSchedule === 'all' || activeBranchSchedule === 'new-market') && (
            <div className="branch-schedule-block">
              <div className="branch-schedule-header">
                <div className="branch-schedule-info">
                  <h3>
                    <MapPin size={18} style={{ color: 'var(--ink)' }} />
                    New Market Branch — Verified Schedule
                  </h3>
                  <p>
                    3rd Floor, Bangali Bhoj Building, beside Nadia Furniture, next to P.G. Tower &amp; Theme Omar Plaza
                  </p>
                </div>
                <div className="branch-schedule-actions">
                  <button
                    type="button"
                    className="lime-button small-btn"
                    onClick={() => handleOpenAdmission('6-month', 'new-market')}
                  >
                    Join at New Market <ArrowUpRight size={13} />
                  </button>
                  <a
                    href={BRANCHES[0].mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="outline-button small-btn"
                  >
                    <MapPin size={13} /> Maps
                  </a>
                  <a
                    href="https://wa.me/?text=Hello%20Fitness%20Zone%20Rajshahi%2C%20I%20would%20like%20to%20inquire%20about%20the%20New%20Market%20Branch%20schedule%20and%20admission."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="outline-button small-btn"
                  >
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="schedule-card-grid">
                {/* Combined Hours */}
                <div className="schedule-box">
                  <div className="schedule-box-header">
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800 }}>
                        Combined Hours
                      </h4>
                      <span style={{ fontSize: '12px', color: '#777971' }}>
                        Male &amp; Female Members
                      </span>
                    </div>
                    <span className="schedule-type-badge combined">
                      <Users2 size={13} /> Combined
                    </span>
                  </div>

                  <div>
                    {SCHEDULES['new-market'].combined.map((slot, idx) => (
                      <div className="slot-row" key={idx}>
                        <span className="slot-period">{slot.period}</span>
                        <span className="slot-time">
                          <Clock3 size={15} /> {slot.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Female-Only Hours */}
                <div className="schedule-box" style={{ borderLeft: '4px solid #a21b5e' }}>
                  <div className="schedule-box-header">
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800, color: '#a21b5e' }}>
                        Female-Only Hours
                      </h4>
                      <span style={{ fontSize: '12px', color: '#777971' }}>
                        Exclusive access for female members
                      </span>
                    </div>
                    <span className="schedule-type-badge female">
                      Women Only
                    </span>
                  </div>

                  <div>
                    {SCHEDULES['new-market'].femaleOnly.map((slot, idx) => (
                      <div className="slot-row" key={idx}>
                        <span className="slot-period">{slot.period}</span>
                        <span className="slot-time" style={{ color: '#a21b5e' }}>
                          <Clock3 size={15} /> {slot.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BHADRA BRANCH BLOCK */}
          {(activeBranchSchedule === 'all' || activeBranchSchedule === 'bhadra') && (
            <div className="branch-schedule-block">
              <div className="branch-schedule-header">
                <div className="branch-schedule-info">
                  <h3>
                    <MapPin size={18} style={{ color: 'var(--ink)' }} />
                    Bhadra Branch — Verified Schedule
                  </h3>
                  <p>
                    Ismail Heights Building (Tasty Treat), Bhadra More, Rajshahi
                  </p>
                </div>
                <div className="branch-schedule-actions">
                  <button
                    type="button"
                    className="lime-button small-btn"
                    onClick={() => handleOpenAdmission('6-month', 'bhadra')}
                  >
                    Join at Bhadra More <ArrowUpRight size={13} />
                  </button>
                  <a
                    href={BRANCHES[1].mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="outline-button small-btn"
                  >
                    <MapPin size={13} /> Maps
                  </a>
                  <a
                    href="https://wa.me/?text=Hello%20Fitness%20Zone%20Rajshahi%2C%20I%20would%20like%20to%20inquire%20about%20the%20Bhadra%20Branch%20schedule%20and%20admission."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="outline-button small-btn"
                  >
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="schedule-card-grid">
                {/* Combined Hours */}
                <div className="schedule-box">
                  <div className="schedule-box-header">
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800 }}>
                        Combined Hours
                      </h4>
                      <span style={{ fontSize: '12px', color: '#777971' }}>
                        Male &amp; Female Members
                      </span>
                    </div>
                    <span className="schedule-type-badge combined">
                      <Users2 size={13} /> Combined
                    </span>
                  </div>

                  <div>
                    {SCHEDULES['bhadra'].combined.map((slot, idx) => (
                      <div className="slot-row" key={idx}>
                        <span className="slot-period">{slot.period}</span>
                        <span className="slot-time">
                          <Clock3 size={15} /> {slot.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Female-Only Hours */}
                <div className="schedule-box" style={{ borderLeft: '4px solid #a21b5e' }}>
                  <div className="schedule-box-header">
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800, color: '#a21b5e' }}>
                        Female-Only Hours
                      </h4>
                      <span style={{ fontSize: '12px', color: '#777971' }}>
                        Continuous daytime dedicated session
                      </span>
                    </div>
                    <span className="schedule-type-badge female">
                      Women Only
                    </span>
                  </div>

                  <div>
                    {SCHEDULES['bhadra'].femaleOnly.map((slot, idx) => (
                      <div className="slot-row" key={idx}>
                        <span className="slot-period">{slot.period}</span>
                        <span className="slot-time" style={{ color: '#a21b5e' }}>
                          <Clock3 size={15} /> {slot.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 05 / 07: BENEFITS & FREE STEAM BATH FACILITY */}
      <section className="benefits-section container" id="benefits">
        {/* Steam Bath Spotlight Card */}
        <div className="steam-spotlight">
          <div className="steam-inner">
            <div>
              <h3>
                Free Steam Bath.<br />
                <em>At Both Branches.</em>
              </h3>
              <p>
                Fitness Zone Rajshahi offers free steam bath facilities at both branches.
                Fitness Zone states that it is the <strong>only gym in Rajshahi offering free steam bath facilities</strong>.
                Speed up muscle recovery, cleanse your skin, and unwind after demanding workouts.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 05: MEMBERSHIP CARD DISCOUNTS */}
        <div id="discounts">
          <div className="discounts-heading">
            <div className="section-kicker">
              <span>04</span>
              <span className="kicker-line" />
              <span>LOCAL MERCHANT PARTNERS</span>
            </div>
            <h3>Membership Card Discounts</h3>
            <p>
              Members receive these exclusive discounts simply by showing their official Fitness Zone membership card
              at participating businesses across Rajshahi.
            </p>
          </div>

          <div className="discount-grid">
            {DISCOUNT_PARTNERS.map((partner, idx) => (
              <div className="discount-card" key={idx}>
                <div>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.12em', color: '#777971', fontWeight: 700 }}>
                    {partner.category}
                  </span>
                  <h4 className="discount-partner-name">{partner.name}</h4>
                </div>
                <div>
                  <div className="discount-percent-badge">
                    <Percent size={14} /> {partner.discount}
                  </div>
                  <div className="discount-notice">
                    Present Fitness Zone card at checkout
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 17: FAQ SECTION */}
      <section className="faq-section container" id="faq">
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              <span>05</span>
              <span className="kicker-line" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2>
              Everything you need <em>to know.</em>
            </h2>
          </div>
          <p>
            Clear answers about dual-branch workouts, admission pricing, renewal policies, and steam bath access.
          </p>
        </div>

        <div className="faq-grid">
          {FAQS.map((faq, idx) => (
            <div className="faq-card" key={idx}>
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-header-${idx}`}
              >
                <span>{faq.question}</span>
                <span style={{ fontSize: '20px', lineHeight: 1 }}>
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div
                  className="faq-answer-content"
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-header-${idx}`}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 18 / 19: FINAL CTA SECTION */}
      <section className="join-section" id="join">
        <div className="join-content container">
          <p className="eyebrow light">
            <span className="eyebrow-line" /> RAJSHAHI&apos;S DUAL-BRANCH FITNESS COMMUNITY
          </p>
          <h2>
            Ready to train<br />
            <em>at both branches?</em>
          </h2>
          <p className="join-copy">
            Start at New Market or Bhadra. Train at both. Enjoy Rajshahi&apos;s only complimentary steam bath
            facilities and dedicated female-only hours.
          </p>

          <div style={{ display: 'flex', gap: '14px', marginTop: '30px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="lime-button"
              onClick={() => handleOpenAdmission('6-month', 'new-market')}
            >
              Get Your Admission <ArrowUpRight size={17} />
            </button>
            <a className="outline-button-light" href="#pricing">
              Review Pricing (BDT) <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="join-mark">FZ<span>×</span></div>
      </section>

      {/* SECTION 20: FOOTER */}
      <footer id="contact">
        <div className="container footer-top">
          <div className="footer-brand">
            <BrandLogo variant="footer" className="footer-brand-logo" />
            <p>
              Premier fitness club in Rajshahi. One membership grants full workout privileges across both New Market
              and Bhadra branches, with free steam bath facilities.
            </p>
          </div>

          <div className="footer-col">
            <h5>New Market Branch</h5>
            <div className="footer-branch-item">
              <strong>3rd Floor, Bangali Bhoj Building</strong>
              Beside Nadia Furniture, next to P.G. Tower &amp; Theme Omar Plaza, New Market, Rajshahi, Bangladesh.
              <a
                href={BRANCHES[0].mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-map-link"
              >
                <MapPin size={12} /> Open in Google Maps <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Bhadra Branch</h5>
            <div className="footer-branch-item">
              <strong>Ismail Heights Building</strong>
              Tasty Treat, Bhadra More, Rajshahi, Bangladesh.
              <a
                href={BRANCHES[1].mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-map-link"
              >
                <MapPin size={12} /> Open in Google Maps <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Quick Navigation</h5>
            <ul>
              <li><a href="#branches">Our Branches</a></li>
              <li><a href="#pricing">Memberships &amp; Pricing</a></li>
              <li><a href="#schedule">Workout Schedule</a></li>
              <li><a href="#benefits">Free Steam Bath</a></li>
              <li><a href="#discounts">Partner Discounts</a></li>
              <li><a href="#faq">Questions &amp; Answers</a></li>
              <li>
                <a
                  href="https://wa.me/?text=Hello%20Fitness%20Zone%20Rajshahi%2C%20I%20would%20like%20to%20inquire%20about%20gym%20admission."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                >
                  <MessageCircle size={13} style={{ color: 'var(--brand-red, #EA1E29)' }} /> WhatsApp Desk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Fitness Zone Rajshahi. All rights reserved.</span>
          <span>Dual Branch Access: New Market &amp; Bhadra More · Rajshahi, Bangladesh</span>
          <span>Only Gym in Rajshahi with Free Steam Bath Facilities</span>
        </div>
      </footer>

      {/* ADMISSION INQUIRY MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close dialog"
            >
              <X size={22} />
            </button>

            {!admissionFormSubmitted ? (
              <div>
                <BrandLogo variant="modal" linkToTop={false} className="modal-brand-badge" />
                <span className="section-kicker" style={{ marginBottom: '8px' }}>
                  <span>ADMISSION INQUIRY</span>
                </span>
                <h3 id="modal-title" style={{ fontSize: '26px', fontWeight: 900, margin: '6px 0 12px', letterSpacing: '-.04em' }}>
                  Join Fitness Zone Rajshahi
                </h3>
                <p style={{ fontSize: '13px', color: '#555750', marginBottom: '20px', lineHeight: 1.5 }}>
                  Select your package and preferred primary branch. Remember: admission at either branch allows you to work out at <strong>BOTH</strong> branches!
                </p>

                {submitError && (
                  <div className="form-error-banner" role="alert">
                    <AlertCircle size={16} />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit}>
                  <div className="form-field">
                    <label className="form-label" htmlFor="plan-select">
                      Select Membership Package
                    </label>
                    <select
                      id="plan-select"
                      className="form-select"
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                    >
                      {MEMBERSHIP_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — {pkg.totalPrice}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="branch-select">
                      Primary Branch for Card Pickup
                    </label>
                    <select
                      id="branch-select"
                      className="form-select"
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                    >
                      {BRANCHES.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.shortName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="session-select">
                      Preferred Workout Shift
                    </label>
                    <select
                      id="session-select"
                      className="form-select"
                      value={sessionPreference}
                      onChange={(e) => setSessionPreference(e.target.value as 'combined' | 'female-only')}
                    >
                      <option value="combined">Combined Session (Male &amp; Female)</option>
                      <option value="female-only">Dedicated Female-Only Session</option>
                    </select>
                  </div>

                  {currentPlanObj.breakdown && (
                    <div className="breakdown-box" style={{ marginBottom: '16px' }}>
                      <div style={{ fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Selected Package Breakdown
                      </div>
                      {currentPlanObj.breakdown.map((item, idx) => (
                        <div className="breakdown-row" key={idx}>
                          <span>{item.label}</span>
                          <strong>{item.amount}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="form-field">
                    <label className="form-label" htmlFor="applicant-name">
                      Full Name
                    </label>
                    <input
                      id="applicant-name"
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      className="form-input"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="applicant-phone">
                      Contact / Phone Number
                    </label>
                    <input
                      id="applicant-phone"
                      type="tel"
                      required
                      placeholder="e.g. 017XXXXXXXX"
                      className="form-input"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div style={{ background: '#e5e3dd', padding: '14px 18px', fontSize: '12px', marginBottom: '20px', borderRadius: '14px', border: '1px solid rgba(23,24,23,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Total Amount Payable:</span>
                      <strong style={{ fontSize: '18px', fontWeight: 900 }}>
                        {currentPlanObj.totalPrice}
                      </strong>
                    </div>
                    <div style={{ fontSize: '11px', color: '#686a64', marginTop: '4px' }}>
                      Includes dual-branch access and free steam bath facilities.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="lime-button"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="form-spinner" /> Processing Admission...
                      </>
                    ) : (
                      <>
                        Submit Admission Request <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <BrandLogo variant="compact" linkToTop={false} className="modal-receipt-logo" />
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--brand-red, #EA1E29)',
                    color: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 18px',
                    boxShadow: '0 4px 14px rgba(234, 30, 41, 0.35)',
                  }}
                >
                  <Check size={30} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>
                  Admission Request Received!
                </h3>
                {admissionReceipt && (
                  <div
                    style={{
                      display: 'inline-block',
                      background: 'rgba(23,24,23,0.08)',
                      padding: '4px 14px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 800,
                      marginBottom: '16px',
                      letterSpacing: '.06em',
                    }}
                  >
                    REF ID: {admissionReceipt.id}
                  </div>
                )}
                <p style={{ fontSize: '14px', color: '#555750', lineHeight: 1.6, marginBottom: '20px' }}>
                  Thank you, <strong>{applicantName || 'Member'}</strong>. Your admission request for the{' '}
                  <strong>{currentPlanObj.name}</strong> ({currentPlanObj.totalPrice}) at{' '}
                  <strong>{currentBranchObj.name}</strong> has been recorded.
                </p>

                <div
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(23,24,23,0.12)',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: '6px' }}>
                    Card Pickup &amp; Orientation:
                  </div>
                  <div style={{ color: '#44463f', lineHeight: 1.5 }}>
                    Visit the <strong>{currentBranchObj.name}</strong> ({currentBranchObj.floor}) to collect your membership card and activate your dual-branch access.
                  </div>
                </div>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Hello Fitness Zone Rajshahi! I have submitted my admission request.\n\nRef: ${admissionReceipt?.id || 'Pending'}\nName: ${applicantName}\nPhone: ${applicantPhone}\nPlan: ${currentPlanObj.name} (${currentPlanObj.totalPrice})\nBranch: ${currentBranchObj.name}\nShift: ${sessionPreference === 'female-only' ? 'Female-Only Session' : 'Combined Session'}\n\nPlease confirm my membership card pickup.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lime-button"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '12px', textDecoration: 'none' }}
                >
                  <MessageCircle size={16} /> Confirm on WhatsApp <ExternalLink size={14} />
                </a>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="outline-button"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={handleResetAdmissionForm}
                  >
                    Select Another Plan
                  </button>
                  <button
                    type="button"
                    className="outline-button"
                    style={{ flex: 1, justifyContent: 'center', background: 'var(--ink)', color: '#fff' }}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FLOATING ACTION BAR FOR QUICK ADMISSION */}
      <aside className="floating-bottom-bar" aria-label="Quick admission action">
        <div className="floating-content">
          <div className="floating-text">
            <Sparkles size={14} className="floating-icon" />
            <span>Admission Open: <strong>1 Membership = Both Branches</strong></span>
          </div>
          <div className="floating-actions">
            <a className="floating-link" href="#schedule">
              Schedule
            </a>
            <button
              type="button"
              className="lime-button floating-btn"
              onClick={() => handleOpenAdmission('6-month', 'new-market')}
            >
              Get Admission <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </aside>
    </main>
  )
}
