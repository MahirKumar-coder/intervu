import { useParams, useNavigate } from "react-router-dom";
import { useInterview } from "../Hook/useInterview";
import { useInterviewSession } from "../Hook/useInterviewSession";
import { useState, useEffect, useRef } from "react";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import AnswerInput from "../components/AnswerInput";
import NavigationButtons from "../components/NavigationButtons";
import { useInterviewStore } from "../Hook/useInterviewStore";
import { useAutoSave } from "../Hook/useAutoSave";
import { useSubmitInterview } from "../Hook/useSubmitInterview";
import { toast } from "sonner";

export default function InterviewSessionPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useInterview(id!);

    const questions = data?.data?.questions || [];
    const { currentQuestion, next, previous } = useInterviewSession(questions.length);
    const current = questions[currentQuestion];

    const { updateAnswer, getAnswer, setAnswers } = useInterviewStore();
    const autoSave = useAutoSave(id!);
    const submitMutation = useSubmitInterview(id!);

    // Camera Stream State
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    // Speech-to-Text State
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);

    // Proctoring State
    const [warningCount, setWarningCount] = useState(0);
    const warningCountRef = useRef(0);
    const hasSubmittedRef = useRef(false);

    // Exit Interview Handler
    const handleExit = () => {
        if (window.confirm("Are you sure you want to exit the interview? Any unsaved answers will be lost.")) {
            navigate("/dashboard");
        }
    };

    // Initial Answers Loading
    useEffect(() => {
        const map: Record<string, string> = {};
        for (const q of questions) {
            map[q._id] = q.userAnswer ?? "";
        }
        setAnswers(map);
    }, [questions, setAnswers]);

    // Webcam Stream Init
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(s => {
                setStream(s);
                if (videoRef.current) {
                    videoRef.current.srcObject = s;
                }
            })
            .catch(err => {
                console.error("Camera access denied or unavailable:", err);
            });

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Proctoring tab-switching listeners
    useEffect(() => {
        let lastViolationTime = 0;

        const handleViolation = () => {
            if (hasSubmittedRef.current) return;
            
            const now = Date.now();
            if (now - lastViolationTime < 2500) return; // Throttle events to once every 2.5s
            lastViolationTime = now;

            warningCountRef.current += 1;
            const currentWarnings = warningCountRef.current;
            setWarningCount(currentWarnings);

            if (currentWarnings >= 3) {
                hasSubmittedRef.current = true;
                window.speechSynthesis.cancel();
                toast.error("Auto-submitting test due to 3 cheating violations!", { duration: 5000 });
                
                const utterance = new SpeechSynthesisUtterance("Test auto submitted due to proctoring warnings.");
                window.speechSynthesis.speak(utterance);
                
                submitMutation.mutate();
            } else {
                window.speechSynthesis.cancel();
                toast.error(`Warning ${currentWarnings}/3: Do not switch tabs or leave this screen!`, { duration: 4000 });
                
                const utterance = new SpeechSynthesisUtterance(`Warning ${currentWarnings}. Please stay on this screen.`);
                window.speechSynthesis.speak(utterance);
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleViolation();
            }
        };

        const handleWindowBlur = () => {
            handleViolation();
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleWindowBlur);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleWindowBlur);
        };
    }, [submitMutation]);

    // Text-to-Speech (Speak Question)
    const speakQuestion = (text: string) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    };

    // Auto-speak question on navigation
    useEffect(() => {
        if (current?.question) {
            // Delay slightly to allow page transition
            const timer = setTimeout(() => {
                speakQuestion(current.question);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [currentQuestion, current?.question]);

    // Speech Recognition setup (re-runs when question id changes to bind correctly)
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = true;
            rec.interimResults = true;
            rec.lang = "en-US";

            rec.onresult = (event: any) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                if (transcript && current?._id) {
                    const updated = transcript.trim();
                    updateAnswer(current._id, updated);
                    autoSave(current._id, updated);
                }
            };

            rec.onerror = (err: any) => {
                console.error("Speech recognition error:", err);
                setIsRecording(false);
            };

            rec.onend = () => {
                setIsRecording(false);
            };

            setRecognition(rec);
        }
    }, [current?._id, updateAnswer, autoSave]);

    // Clean up Speech on unmount
    useEffect(() => {
        return () => {
            if (recognition) {
                recognition.stop();
            }
            window.speechSynthesis.cancel();
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [recognition, stream]);

    const toggleRecording = () => {
        if (!recognition) {
            toast.error("Speech recognition is not supported in this browser.");
            return;
        }

        if (isRecording) {
            recognition.stop();
            setIsRecording(false);
        } else {
            window.speechSynthesis.cancel();
            recognition.start();
            setIsRecording(true);
            toast.info("Microphone listening... Speak your answer now.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-zinc-400 font-medium">Loading session...</span>
                </div>
            </div>
        );
    }

    if (!data || questions.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center bg-zinc-950 text-red-500 font-semibold">
                No session data found.
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-zinc-950 text-white p-6 md:p-10 overflow-hidden">
            {/* Glowing background blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-6xl space-y-6">
                {/* Header bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">AI Interview Room</h1>
                            <button
                                onClick={handleExit}
                                className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold rounded-lg transition-all cursor-pointer"
                            >
                                Exit Interview
                            </button>
                        </div>
                        <p className="text-zinc-400 text-xs mt-0.5">Answer the questions using text or voice dictation</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        {warningCount > 0 && (
                            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                Warnings: {warningCount}/3
                            </span>
                        )}
                        <Timer seconds={300} />
                    </div>
                </div>

                <ProgressBar current={currentQuestion} total={questions.length} />

                <div className="grid gap-6 md:grid-cols-5 items-start">
                    {/* Left Side: Video Preview */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="relative aspect-video md:aspect-[4/3] rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm overflow-hidden shadow-2xl">
                            {/* Camera Video Stream */}
                            <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline 
                                muted 
                                className="w-full h-full object-cover scale-x-[-1]"
                            />
                            
                            {/* Camera overlay indicators */}
                            <div className="absolute top-4 left-4 flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 text-[10px] font-semibold text-zinc-300">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                REC PREVIEW
                            </div>
                            
                            {/* Camera status mask if no stream */}
                            {!stream && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-zinc-500 p-4 text-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">📷</div>
                                    <p className="text-xs font-semibold">Camera connecting...</p>
                                    <p className="text-[10px] text-zinc-600 max-w-[200px]">Ensure camera permission is allowed in your browser settings</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Voice helper card */}
                        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 backdrop-blur-sm space-y-2.5">
                            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Voice Guidelines</h3>
                            <ul className="space-y-1.5 text-[11px] text-zinc-400 font-medium">
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-500 font-bold">•</span> Click "Answer with Voice" to start dictation.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-500 font-bold">•</span> Speak clearly. The text area updates in real-time.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-500 font-bold">•</span> Click again to pause. You can edit the text manually anytime.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side: Interviewer / Question / Answer Panel */}
                    <div className="md:col-span-3 space-y-6">
                        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm shadow-xl space-y-6">
                            {/* Question Section */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Question {currentQuestion + 1} of {questions.length}</span>
                                    
                                    {/* Speak / Listen Trigger */}
                                    <button 
                                        onClick={() => speakQuestion(current.question)}
                                        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800/40 hover:bg-zinc-800/80 border border-zinc-800 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                                    >
                                        🔊 Replay Voice
                                    </button>
                                </div>
                                <h2 className="text-lg font-bold text-zinc-100 leading-relaxed">
                                    {current.question}
                                </h2>
                            </div>

                            {/* Answer Input Section with Dictation */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">Your Answer</label>
                                    
                                    {/* Voice Dictation Button */}
                                    <button
                                        type="button"
                                        onClick={toggleRecording}
                                        className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                                            isRecording 
                                                ? "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse" 
                                                : "bg-blue-600/10 text-blue-400 border-blue-500/20 hover:bg-blue-600/20"
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${isRecording ? "bg-red-500 animate-ping" : "bg-blue-500"}`} />
                                        {isRecording ? "Recording (Click to stop)" : "Answer with Voice"}
                                    </button>
                                </div>

                                <AnswerInput
                                    answer={getAnswer(current._id) || ""}
                                    onChange={(value) => {
                                        updateAnswer(current._id, value);
                                        autoSave(current._id, value);
                                    }}
                                />
                            </div>

                            {/* Navigation Buttons */}
                            <NavigationButtons
                                previous={previous}
                                next={next}
                                isFirst={currentQuestion === 0}
                                isLast={currentQuestion === questions.length - 1}
                                submit={() => submitMutation.mutate()}
                                loading={submitMutation.isPending}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
