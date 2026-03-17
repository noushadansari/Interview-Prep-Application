import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#0d1117]">
                <h1 className="text-[#e6edf3] text-xl">Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className="w-full min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col items-center justify-center px-6 py-12 gap-8">

            {/* Page Header */}
            <header className="text-center">
                <h1 className="text-[2.25rem] font-bold mb-2">
                    Create Your Custom <span className="text-[#ff2d78]">Interview Plan</span>
                </h1>
                <p className="text-[#7d8590] text-sm max-w-[480px] mx-auto leading-relaxed">
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className="w-full max-w-[900px] bg-[#161b22] border border-[#2a3348] rounded-xl overflow-hidden">

                <div className="flex min-h-[520px]">

                    {/* Left Panel */}
                    <div className="flex-1 flex flex-col gap-4 p-6 relative">
                        <div className="flex items-center gap-2">
                            <span className="text-[#ff2d78]"></span>
                            <h2 className="text-sm font-semibold flex-1">Target Job Description</h2>
                            <span className="text-[10px] uppercase px-2 py-[2px] rounded bg-[#ff2d78]/15 border border-[#ff2d78]/30 text-[#ff2d78]">
                                Required
                            </span>
                        </div>

                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="flex-1 w-full bg-[#1e2535] border border-[#2a3348] rounded-md px-4 py-3 text-sm outline-none focus:border-[#ff2d78] resize-none leading-relaxed placeholder-[#7d8590]"
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />

                        <div className="absolute bottom-9 right-8 text-xs text-[#7d8590]">
                            0 / 5000 chars
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-[#2a3348]" />

                    {/* Right Panel */}
                    <div className="flex-1 flex flex-col gap-3 p-6">

                        <div className="flex items-center gap-2">
                            <span className="text-[#ff2d78]"></span>
                            <h2 className="text-sm font-semibold flex-1">Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 text-sm font-medium">
                                Upload Resume
                                <span className="text-[10px] uppercase px-2 py-[2px] rounded bg-[#ff2d78]/15 border border-[#ff2d78]/30 text-[#ff2d78]">
                                    Best Results
                                </span>
                            </label>

                            <label className="flex flex-col items-center justify-center gap-1 p-6 bg-[#1e2535] border-2 border-dashed border-[#2a3348] rounded-md cursor-pointer transition hover:border-[#ff2d78] hover:bg-[#ff2d78]/5">
                                <span className="text-[#ff2d78]"></span>
                                <p className="text-sm font-medium">Click to upload or drag & drop</p>
                                <p className="text-xs text-[#7d8590]">PDF or DOCX (Max 3MB)</p>
                                <input ref={resumeInputRef} hidden type="file" accept=".pdf,.docx" />
                            </label>
                        </div>

                        {/* OR */}
                        <div className="flex items-center gap-3 text-xs text-[#7d8590]">
                            <div className="flex-1 h-px bg-[#2a3348]" />
                            <span>OR</span>
                            <div className="flex-1 h-px bg-[#2a3348]" />
                        </div>

                        {/* Self Description */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Quick Self-Description</label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                className="h-24 bg-[#1e2535] border border-[#2a3348] rounded-md px-4 py-3 text-sm outline-none focus:border-[#ff2d78] resize-none placeholder-[#7d8590]"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className="flex gap-2 p-3 bg-[#1b2a4a] border border-[#2d4a7a] rounded-md">
                            <p className="text-xs text-[#8ab4f8] leading-relaxed">
                                Either a <strong className="text-[#e6edf3]">Resume</strong> or a <strong className="text-[#e6edf3]">Self Description</strong> is required to generate a personalized plan.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#2a3348]">
                    <span className="text-xs text-[#7d8590]">
                        AI-Powered Strategy Generation • Approx 30s
                    </span>

                    <button
                        onClick={handleGenerateReport}
                        className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-md bg-gradient-to-br from-[#ff2d78] to-[#cc2460] hover:opacity-90 active:scale-95 transition"
                    >
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports */}
            {reports.length > 0 && (
                <section className="flex flex-col gap-3 w-full max-w-[900px]">
                    <h2>My Recent Interview Plans</h2>

                    <ul className="flex gap-3 flex-wrap">
                        {reports.map(report => (
                            <li
                                key={report._id}
                                onClick={() => navigate(`/interview/${report._id}`)}
                                className="bg-[#161b22] border border-[#2a3348] rounded-md p-4 flex flex-col gap-2 cursor-pointer flex-1"
                            >
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className="text-xs text-[#7d8590]">
                                    Generated on {new Date(report.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm font-semibold text-[#ff2d78]">
                                    Match Score: {report.matchScore}%
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Footer */}
            <footer className="flex gap-6">
                <a href="#" className="text-xs text-[#7d8590] hover:text-[#e6edf3]">Privacy Policy</a>
                <a href="#" className="text-xs text-[#7d8590] hover:text-[#e6edf3]">Terms of Service</a>
                <a href="#" className="text-xs text-[#7d8590] hover:text-[#e6edf3]">Help Center</a>
            </footer>
        </div>
    )
}

export default Home


// import React, { useState, useRef } from 'react'
// import "../style/home.scss"
// import { useInterview } from '../hooks/useInterview.js'
// import { useNavigate } from 'react-router'

// const Home = () => {

//     const { loading, generateReport,reports } = useInterview()
//     const [ jobDescription, setJobDescription ] = useState("")
//     const [ selfDescription, setSelfDescription ] = useState("")
//     const resumeInputRef = useRef()

//     const navigate = useNavigate()

//     const handleGenerateReport = async () => {
//         const resumeFile = resumeInputRef.current.files[ 0 ]
//         const data = await generateReport({ jobDescription, selfDescription, resumeFile })
//         navigate(`/interview/${data._id}`)
//     }

//     if (loading) {
//         return (
//             <main className='loading-screen'>
//                 <h1>Loading your interview plan...</h1>
//             </main>
//         )
//     }

//     return (
//         <div className='home-page'>

//             {/* Page Header */}
//             <header className='page-header'>
//                 <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
//                 <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
//             </header>

//             {/* Main Card */}
//             <div className='interview-card'>
//                 <div className='interview-card__body'>

//                     {/* Left Panel - Job Description */}
//                     <div className='panel panel--left'>
//                         <div className='panel__header'>
//                             <span className='panel__icon'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
//                             </span>
//                             <h2>Target Job Description</h2>
//                             <span className='badge badge--required'>Required</span>
//                         </div>
//                         <textarea
//                             onChange={(e) => { setJobDescription(e.target.value) }}
//                             className='panel__textarea'
//                             placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
//                             maxLength={5000}
//                         />
//                         <div className='char-counter'>0 / 5000 chars</div>
//                     </div>

//                     {/* Vertical Divider */}
//                     <div className='panel-divider' />

//                     {/* Right Panel - Profile */}
//                     <div className='panel panel--right'>
//                         <div className='panel__header'>
//                             <span className='panel__icon'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
//                             </span>
//                             <h2>Your Profile</h2>
//                         </div>

//                         {/* Upload Resume */}
//                         <div className='upload-section'>
//                             <label className='section-label'>
//                                 Upload Resume
//                                 <span className='badge badge--best'>Best Results</span>
//                             </label>
//                             <label className='dropzone' htmlFor='resume'>
//                                 <span className='dropzone__icon'>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
//                                 </span>
//                                 <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
//                                 <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
//                                 <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
//                             </label>
//                         </div>

//                         {/* OR Divider */}
//                         <div className='or-divider'><span>OR</span></div>

//                         {/* Quick Self-Description */}
//                         <div className='self-description'>
//                             <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
//                             <textarea
//                                 onChange={(e) => { setSelfDescription(e.target.value) }}
//                                 id='selfDescription'
//                                 name='selfDescription'
//                                 className='panel__textarea panel__textarea--short'
//                                 placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
//                             />
//                         </div>

//                         {/* Info Box */}
//                         <div className='info-box'>
//                             <span className='info-box__icon'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
//                             </span>
//                             <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Card Footer */}
//                 <div className='interview-card__footer'>
//                     <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
//                     <button
//                         onClick={handleGenerateReport}
//                         className='generate-btn'>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
//                         Generate My Interview Strategy
//                     </button>
//                 </div>
//             </div>

//             {/* Recent Reports List */}
//             {reports.length > 0 && (
//                 <section className='recent-reports'>
//                     <h2>My Recent Interview Plans</h2>
//                     <ul className='reports-list'>
//                         {reports.map(report => (
//                             <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
//                                 <h3>{report.title || 'Untitled Position'}</h3>
//                                 <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
//                                 <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
//                             </li>
//                         ))}
//                     </ul>
//                 </section>
//             )}

//             {/* Page Footer */}
//             <footer className='page-footer'>
//                 <a href='#'>Privacy Policy</a>
//                 <a href='#'>Terms of Service</a>
//                 <a href='#'>Help Center</a>
//             </footer>
//         </div>
//     )
// }

// export default Home