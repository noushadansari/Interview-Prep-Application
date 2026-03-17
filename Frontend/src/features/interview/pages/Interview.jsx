// import React, { useState, useEffect } from 'react'
// import '../style/interview.scss'
// import { useInterview } from '../hooks/useInterview.js'
// import { useNavigate, useParams } from 'react-router'



// const NAV_ITEMS = [
//     { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
//     { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
//     { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
// ]

// // ── Sub-components ────────────────────────────────────────────────────────────
// const QuestionCard = ({ item, index }) => {
//     const [ open, setOpen ] = useState(false)
//     return (
//         <div className='q-card'>
//             <div className='q-card__header' onClick={() => setOpen(o => !o)}>
//                 <span className='q-card__index'>Q{index + 1}</span>
//                 <p className='q-card__question'>{item.question}</p>
//                 <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
//                 </span>
//             </div>
//             {open && (
//                 <div className='q-card__body'>
//                     <div className='q-card__section'>
//                         <span className='q-card__tag q-card__tag--intention'>Intention</span>
//                         <p>{item.intention}</p>
//                     </div>
//                     <div className='q-card__section'>
//                         <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
//                         <p>{item.answer}</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// const RoadMapDay = ({ day }) => (
//     <div className='roadmap-day'>
//         <div className='roadmap-day__header'>
//             <span className='roadmap-day__badge'>Day {day.day}</span>
//             <h3 className='roadmap-day__focus'>{day.focus}</h3>
//         </div>
//         <ul className='roadmap-day__tasks'>
//             {day.tasks.map((task, i) => (
//                 <li key={i}>
//                     <span className='roadmap-day__bullet' />
//                     {task}
//                 </li>
//             ))}
//         </ul>
//     </div>
// )

// // ── Main Component ────────────────────────────────────────────────────────────
// const Interview = () => {
//     const [ activeNav, setActiveNav ] = useState('technical')
//     const { report, getReportById, loading, getResumePdf } = useInterview()
//     const { interviewId } = useParams()

//     useEffect(() => {
//         if (interviewId) {
//             getReportById(interviewId)
//         }
//     }, [ interviewId ])



//     if (loading || !report) {
//         return (
//             <main className='loading-screen'>
//                 <h1>Loading your interview plan...</h1>
//             </main>
//         )
//     }

//     const scoreColor =
//         report.matchScore >= 80 ? 'score--high' :
//             report.matchScore >= 60 ? 'score--mid' : 'score--low'


//     return (
//         <div className='interview-page'>
//             <div className='interview-layout'>

//                 {/* ── Left Nav ── */}
//                 <nav className='interview-nav'>
//                     <div className="nav-content">
//                         <p className='interview-nav__label'>Sections</p>
//                         {NAV_ITEMS.map(item => (
//                             <button
//                                 key={item.id}
//                                 className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
//                                 onClick={() => setActiveNav(item.id)}
//                             >
//                                 <span className='interview-nav__icon'>{item.icon}</span>
//                                 {item.label}
//                             </button>
//                         ))}
//                     </div>
//                     <button
//                         onClick={() => { getResumePdf(interviewId) }}
//                         className='button primary-button' >
//                         <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
//                         Download Resume
//                     </button>
//                 </nav>

//                 <div className='interview-divider' />

//                 {/* ── Center Content ── */}
//                 <main className='interview-content'>
//                     {activeNav === 'technical' && (
//                         <section>
//                             <div className='content-header'>
//                                 <h2>Technical Questions</h2>
//                                 <span className='content-header__count'>{report.technicalQuestions.length} questions</span>
//                             </div>
//                             <div className='q-list'>
//                                 {report.technicalQuestions.map((q, i) => (
//                                     <QuestionCard key={i} item={q} index={i} />
//                                 ))}
//                             </div>
//                         </section>
//                     )}

//                     {activeNav === 'behavioral' && (
//                         <section>
//                             <div className='content-header'>
//                                 <h2>Behavioral Questions</h2>
//                                 <span className='content-header__count'>{report.behavioralQuestions.length} questions</span>
//                             </div>
//                             <div className='q-list'>
//                                 {report.behavioralQuestions.map((q, i) => (
//                                     <QuestionCard key={i} item={q} index={i} />
//                                 ))}
//                             </div>
//                         </section>
//                     )}

//                     {activeNav === 'roadmap' && (
//                         <section>
//                             <div className='content-header'>
//                                 <h2>Preparation Road Map</h2>
//                                 <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
//                             </div>
//                             <div className='roadmap-list'>
//                                 {report.preparationPlan.map((day) => (
//                                     <RoadMapDay key={day.day} day={day} />
//                                 ))}
//                             </div>
//                         </section>
//                     )}
//                 </main>

//                 <div className='interview-divider' />

//                 {/* ── Right Sidebar ── */}
//                 <aside className='interview-sidebar'>

//                     {/* Match Score */}
//                     <div className='match-score'>
//                         <p className='match-score__label'>Match Score</p>
//                         <div className={`match-score__ring ${scoreColor}`}>
//                             <span className='match-score__value'>{report.matchScore}</span>
//                             <span className='match-score__pct'>%</span>
//                         </div>
//                         <p className='match-score__sub'>Strong match for this role</p>
//                     </div>

//                     <div className='sidebar-divider' />

//                     {/* Skill Gaps */}
//                     <div className='skill-gaps'>
//                         <p className='skill-gaps__label'>Skill Gaps</p>
//                         <div className='skill-gaps__list'>
//                             {report.skillGaps.map((gap, i) => (
//                                 <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
//                                     {gap.skill}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                 </aside>
//             </div>
//         </div>
//     )
// }

// export default Interview

import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-[#1c2230] border border-[#2a3348] rounded-md overflow-hidden hover:border-[#3a455d] transition">
            <div
                onClick={() => setOpen(o => !o)}
                className="flex items-start gap-3 px-4 py-3 cursor-pointer select-none"
            >
                <span className="text-[10px] font-bold text-[#ff2d78] bg-[#ff2d78]/10 border border-[#ff2d78]/20 rounded px-1 py-[2px] mt-[2px]">
                    Q{index + 1}
                </span>

                <p className="flex-1 text-sm font-medium text-[#e6edf3] leading-relaxed">
                    {item.question}
                </p>

                <span className={`text-[#7d8590] mt-[2px] transition ${open ? 'rotate-180 text-[#ff2d78]' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>

            {open && (
                <div className="px-4 pb-4 pt-3 border-t border-[#2a3348] flex flex-col gap-3">

                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-[2px] rounded bg-[#a78bfa]/10 border border-[#a78bfa]/20 text-[#a78bfa] w-fit">
                            Intention
                        </span>
                        <p className="text-xs text-[#9aa4b2] leading-relaxed">
                            {item.intention}
                        </p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-[2px] rounded bg-[#3fb950]/10 border border-[#3fb950]/20 text-[#3fb950] w-fit">
                            Model Answer
                        </span>
                        <p className="text-xs text-[#9aa4b2] leading-relaxed">
                            {item.answer}
                        </p>
                    </div>

                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className="relative flex flex-col gap-2 pl-14 py-3">

        {/* timeline dot */}
        <div className="absolute left-[21px] top-[1.05rem] w-[14px] h-[14px] rounded-full bg-[#161b22] border-2 border-[#ff2d78]" />

        <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#ff2d78] bg-[#ff2d78]/10 border border-[#ff2d78]/25 px-2 py-[2px] rounded-full">
                Day {day.day}
            </span>
            <h3 className="text-sm font-semibold text-[#e6edf3]">{day.focus}</h3>
        </div>

        <ul className="flex flex-col gap-1">
            {day.tasks.map((task, i) => (
                <li key={i} className="flex gap-2 text-xs text-[#9aa4b2] leading-relaxed">
                    <span className="w-[5px] h-[5px] rounded-full bg-[#7d8590] mt-2" />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {

    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#0d1117]">
                <h1 className="text-[#e6edf3]">Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'border-[#3fb950]' :
            report.matchScore >= 60 ? 'border-[#f5a623]' :
                'border-[#ff4d4d]'

    return (
        <div className="w-full min-h-screen bg-[#0d1117] text-[#e6edf3] flex items-stretch p-6">

            <div className="flex w-full max-w-[1280px] mx-auto bg-[#161b22] border border-[#2a3348] rounded-xl">

                {/* NAV */}
                <nav className="w-[220px] p-7 flex flex-col justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#7d8590] mb-2 px-3">
                            Sections
                        </p>

                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-left transition
                                ${activeNav === item.id
                                        ? 'bg-[#ff2d78]/10 text-[#ff2d78]'
                                        : 'text-[#7d8590] hover:bg-[#1c2230] hover:text-[#e6edf3]'}`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => getResumePdf(interviewId)}
                        className="flex items-center px-4 py-2 text-sm font-semibold bg-[#ff2d78] text-white rounded-md"
                    >
                        Download Resume
                    </button>
                </nav>

                <div className="w-px bg-[#2a3348]" />

                {/* CONTENT */}
                <main className="flex-1 px-8 py-7 overflow-y-auto max-h-[calc(100vh-3rem)] pb-20">

                    {activeNav === 'technical' && (
                        <section>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2a3348]">
                                <h2 className="text-lg font-bold">Technical Questions</h2>
                                <span className="text-xs text-[#7d8590] bg-[#1c2230] px-2 py-[2px] rounded-full border border-[#2a3348]">
                                    {report.technicalQuestions.length} questions
                                </span>
                            </div>

                            <div className="flex flex-col gap-3">
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2a3348]">
                                <h2 className="text-lg font-bold">Behavioral Questions</h2>
                                <span className="text-xs text-[#7d8590] bg-[#1c2230] px-2 py-[2px] rounded-full border border-[#2a3348]">
                                    {report.behavioralQuestions.length} questions
                                </span>
                            </div>

                            <div className="flex flex-col gap-3">
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2a3348]">
                                <h2 className="text-lg font-bold">Preparation Road Map</h2>
                                <span className="text-xs text-[#7d8590] bg-[#1c2230] px-2 py-[2px] rounded-full border border-[#2a3348]">
                                    {report.preparationPlan.length}-day plan
                                </span>
                            </div>

                            <div className="relative flex flex-col pl-0">
                                {/* vertical line */}
                                <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff2d78] to-[#ff2d78]/10 rounded" />

                                {report.preparationPlan.map(day => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}

                </main>

                <div className="w-px bg-[#2a3348]" />

                {/* SIDEBAR */}
                <aside className="w-[240px] p-7 flex flex-col gap-5">

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[10px] uppercase tracking-widest text-[#7d8590] self-start">
                            Match Score
                        </p>

                        <div className={`w-[90px] h-[90px] rounded-full border-4 flex flex-col items-center justify-center ${scoreColor}`}>
                            <span className="text-2xl font-extrabold">{report.matchScore}</span>
                            <span className="text-xs text-[#7d8590]">%</span>
                        </div>

                        <p className="text-xs text-[#3fb950] text-center">
                            Strong match for this role
                        </p>
                    </div>

                    <div className="h-px bg-[#2a3348]" />

                    <div className="flex flex-col gap-3">
                        <p className="text-[10px] uppercase tracking-widest text-[#7d8590]">
                            Skill Gaps
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {report.skillGaps.map((gap, i) => (
                                <span
                                    key={i}
                                    className={`text-xs px-3 py-1 rounded border
                                    ${gap.severity === 'high' && 'text-[#ff4d4d] bg-[#ff4d4d]/10 border-[#ff4d4d]/30'}
                                    ${gap.severity === 'medium' && 'text-[#f5a623] bg-[#f5a623]/10 border-[#f5a623]/30'}
                                    ${gap.severity === 'low' && 'text-[#3fb950] bg-[#3fb950]/10 border-[#3fb950]/30'}
                                    `}
                                >
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview