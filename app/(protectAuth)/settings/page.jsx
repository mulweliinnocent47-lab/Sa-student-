"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, CalendarDays } from "lucide-react";
import { AppShell } from "@/components/AppShell";

const PLANS=[
{name:"Free",price:"R0",features:["Maths, English & History","Papers up to 2023","5 downloads a month","Ads"],cta:"Current plan",current:true},
{name:"Go",price:"R49",features:["Every subject","Every year, memos included","Unlimited downloads","No ads"],cta:"Upgrade to Go",current:false},
{name:"Pro",price:"R99",features:["Everything in Go","All Pro notes","Unlimited Practice AI","Priority support"],cta:"Upgrade to Pro",current:false}
];

export default function SettingsPage(){
 const [examDate,setExamDate]=useState("2026-10-19"); const [reminders,setReminders]=useState(true); const [weekly,setWeekly]=useState(false);
 return <AppShell>
  <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1><p className="mt-2 text-sm text-muted-foreground">Your plan and the two reminders that actually change how you study.</p>
  <section className="mt-6 grid gap-4 md:grid-cols-3">{PLANS.map(p=><div key={p.name} className={`rounded-2xl border p-5 shadow-sm ${p.name==="Pro"?"border-gold bg-gold-soft":"border-border bg-card"}`}><p className="text-sm font-semibold text-muted-foreground">{p.name}</p><p className="mt-1 text-3xl font-bold">{p.price}<span className="text-sm font-medium text-muted-foreground">/mo</span></p><ul className="mt-4 space-y-2 text-sm">{p.features.map(f=><li key={f} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success"/>{f}</li>)}</ul><button disabled={p.current} className="mt-5 w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:border disabled:border-input disabled:bg-background disabled:text-muted-foreground">{p.cta}</button></div>)}</section>
  <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm"><h2 className="flex items-center gap-2 text-base font-bold"><CalendarDays className="size-4 text-primary"/> Exam countdown</h2><p className="mt-1 text-sm text-muted-foreground">This date drives the countdown on your dashboard.</p><div className="mt-4 max-w-xs"><label htmlFor="exam-date" className="text-sm font-medium">First exam date</label><input id="exam-date" type="date" value={examDate} onChange={e=>setExamDate(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"/></div>
   <div className="mt-6 space-y-4 border-t border-border pt-5">
    <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-medium">Daily study nudge</p><p className="text-xs text-muted-foreground">One reminder at 18:00, nothing else.</p></div><button aria-pressed={reminders} onClick={()=>setReminders(!reminders)} className={`relative h-6 w-11 rounded-full transition ${reminders?"bg-primary":"bg-muted"}`}><span className={`absolute top-0.5 size-5 rounded-full bg-white transition ${reminders?"left-5":"left-0.5"}`}/></button></div>
    <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-medium">Weekly progress recap</p><p className="text-xs text-muted-foreground">Papers opened and notes read, every Sunday.</p></div><button aria-pressed={weekly} onClick={()=>setWeekly(!weekly)} className={`relative h-6 w-11 rounded-full transition ${weekly?"bg-primary":"bg-muted"}`}><span className={`absolute top-0.5 size-5 rounded-full bg-white transition ${weekly?"left-5":"left-0.5"}`}/></button></div>
   </div>
  </section>
 </AppShell>
}
