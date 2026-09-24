"use client";
import { useMemo, useState } from "react";
import { Download, FileText, Lock, Search } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { FREE_PAPER_CUTOFF, FREE_SUBJECTS, PAPERS, SUBJECTS, isPaperLocked } from "@/lib/study-data";

export default function PapersPage() {
  const [query,setQuery]=useState("");
  const [subject,setSubject]=useState("All");
  const [grade,setGrade]=useState("All");
  const [locked,setLocked]=useState(null);
  const results=useMemo(()=>PAPERS.filter(p=>(subject==="All"||p.subject===subject)&&(grade==="All"||String(p.grade)===grade)&&`${p.subject} ${p.year} ${p.province}`.toLowerCase().includes(query.toLowerCase())),[query,subject,grade]);

  return <AppShell>
    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Past papers</h1>
    <p className="mt-2 text-sm text-muted-foreground">On Free you can open {FREE_SUBJECTS.join(", ")} up to {FREE_PAPER_CUTOFF - 1}. Locked papers are marked here, not hidden.</p>

    <div className="sticky top-16 z-30 -mx-4 mt-5 bg-background/90 px-4 py-3 backdrop-blur">
      <div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search subject, year or province" className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm"/></div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">{["All",...SUBJECTS].map(s=><button key={s} onClick={()=>setSubject(s)} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${subject===s?"border-primary bg-brand-soft text-primary":"border-border bg-card text-muted-foreground"}`}>{s}</button>)}</div>
      <div className="mt-2 flex gap-2">{["All","12","11"].map(g=><button key={g} onClick={()=>setGrade(g)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${grade===g?"border-primary bg-brand-soft text-primary":"border-border bg-card text-muted-foreground"}`}>{g==="All"?"All grades":`Grade ${g}`}</button>)}</div>
    </div>

    <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {results.map(p=>{const lockedPaper=isPaperLocked(p,"free");return <div key={p.id} className={`rounded-2xl border bg-card p-4 shadow-sm ${lockedPaper?"border-dashed":"border-border"}`}>
        <div className="flex items-start justify-between gap-2"><FileText className={`size-5 ${lockedPaper?"text-muted-foreground":"text-primary"}`}/>{lockedPaper?<span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2 py-1 text-xs font-medium"><Lock className="size-3"/> Go</span>:p.memo?<span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium">Memo included</span>:null}</div>
        <p className="mt-3 font-semibold">{p.subject}</p><p className="text-xs text-muted-foreground">Grade {p.grade} · {p.year} {p.session} · {p.province} · {p.pages}pp</p>
        <button onClick={()=>lockedPaper&&setLocked(p)} className={`mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium ${lockedPaper?"border-input bg-background":"border-transparent bg-primary text-primary-foreground"}`}>{lockedPaper?<><Lock className="size-4"/>Unlock</>:<><Download className="size-4"/>Download</>}</button>
      </div>})}
    </div>
    {results.length===0&&<p className="py-16 text-center text-sm text-muted-foreground">No papers match that search yet.</p>}
    {locked&&<div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={()=>setLocked(null)}>
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl" onClick={e=>e.stopPropagation()}>
        <h2 className="text-lg font-bold">{locked.year>=FREE_PAPER_CUTOFF?"Recent papers are on Go":`${locked.subject} is on Go`}</h2>
        <p className="mt-2 text-sm text-muted-foreground">Free covers {FREE_SUBJECTS.join(", ")} up to {FREE_PAPER_CUTOFF-1}. Go (R49/month) opens every subject and every year, with memos and no ads.</p>
        <div className="mt-6 flex justify-end gap-2"><button className="rounded-lg border px-3 py-2 text-sm" onClick={()=>setLocked(null)}>Keep browsing</button><Link className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground" href="/settings">Upgrade to Go</Link></div>
      </div>
    </div>}
  </AppShell>
}
