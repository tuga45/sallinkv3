'use client'

import * as React from "react";
import { Box, Lock, Search, Settings, Sparkles, Brain, Zap, BarChart3, Shield, MessageSquare, Eye, TrendingUp, Target, Users, Mail, Phone, Bot } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
// No routes/links needed; we'll open in-page popups

interface ServicesProps {
  title?: string
  subtitle?: string
  className?: string
}

export function Services({
  title = "AI for Lead Gen & Marketing",
  subtitle = "Acquisition, activation, and pipeline — powered by agentic AI",
  className = ""
}: ServicesProps) {
  return (
    <section className={`py-24 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Target className="h-4 w-4" />}
            title="AI Consulting"
            description={
              "We help small and medium-sized businesses harness AI strategically to drive real results by implementing practical workflow automation, optimizing costs, and providing data‑driven insights."
            }
            moreTitle="AI Consulting"
            moreContent={
              <div>
                <p>
                  We assess your processes, data, and goals to design a pragmatic AI roadmap. Engagements include quick‑win automations, model/tool selection, proofs of concept, and implementation support with governance.
                </p>
                <ul>
                  <li>Opportunity discovery workshops</li>
                  <li>Automation of manual workflows</li>
                  <li>Cost and ROI modeling</li>
                  <li>Security, privacy, and policy guidance</li>
                </ul>
              </div>
            }
          />
          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Users className="h-4 w-4" />}
            title="ICP Targeting & List Building"
            description={
              "Identify your ideal customer profiles across channels. Build verified outreach lists with AI-powered enrichment, add firmographic/technographic data, validate emails, and de‑duplicate across sources."
            }
            moreTitle="ICP Targeting & List Building"
            moreContent={
              <div>
                <p>
                  Build high‑quality, de‑duplicated prospect lists matched to your ICP. Enrich with firmographic and technographic signals and keep data fresh with scheduled refresh.
                </p>
                <ul>
                  <li>Multi‑source aggregation and enrichment</li>
                  <li>Email validation and risk scoring</li>
                  <li>Deduping and CRM sync</li>
                </ul>
              </div>
            }
          />
          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Mail className="h-4 w-4" />}
            title="AI‑Personalized Outreach & Lead Scoring"
            description={
              "Hyper‑personalized multi‑channel outreach that adapts to each buyer. Generate emails and LinkedIn messages in your brand voice, enrich with live context, score leads by intent and fit, trigger sequences based on behavior (opens, replies, site visits), and sync outcomes to your CRM for continuous learning and prioritization."
            }
            moreTitle="AI‑Personalized Outreach & Lead Scoring"
            moreContent={
              <div>
                <p>
                  Go beyond templates. Outreach adapts per lead using company news, website behavior, and CRM history. Lead scoring prioritizes reps on the highest intent accounts.
                </p>
                <ul>
                  <li>Channel support: Email, LinkedIn, chat handoffs</li>
                  <li>Behavioral triggers: opens, replies, visits</li>
                  <li>Adaptive sequencing with auto‑pause/branch</li>
                  <li>Two‑way CRM sync and analytics</li>
                </ul>
              </div>
            }
          />
          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Bot className="h-4 w-4" />}
            title="Agentic SDR & Chatbots"
            description={
              "AI agents that capture, qualify, and book meetings 24/7 across website chat, WhatsApp, and email. They handle FAQs and objections, qualify with dynamic flows, escalate to humans when needed, and push booked meetings to your calendar/CRM."
            }
            moreTitle="Agentic SDR & Chatbots"
            moreContent={
              <div>
                <p>
                  Always‑on conversational agents qualify and route leads, while human‑in‑the‑loop controls ensure safety and brand alignment.
                </p>
                <ul>
                  <li>Website, WhatsApp, and email entry points</li>
                  <li>Dynamic qualification flows</li>
                  <li>Calendar booking and CRM notes</li>
                </ul>
              </div>
            }
          />
          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Settings className="h-4 w-4" />}
            title="Custom AI Workflows & Integrations"
            description={
              "We design and implement tailored AI automations that connect your stack (CRM, email, Slack, Notion, Sheets, databases) with human‑in‑the‑loop controls, approvals, and monitoring."
            }
            moreTitle="Custom AI Workflows & Integrations"
            moreContent={
              <div>
                <p>
                  From intake to fulfillment, we orchestrate reliable, auditable workflows across your tools. Triggers, branching logic, retries, and observability are built‑in, with safeguards for brand and compliance.
                </p>
                <ul>
                  <li>Connectors for HubSpot/Salesforce, Slack, Notion, Google Workspace, Webhooks</li>
                  <li>Role‑based approvals and human review queues</li>
                  <li>Error handling, retries, logging, and SLAs</li>
                  <li>Dashboards for run history and performance</li>
                </ul>
              </div>
            }
          />
        </ul>
      </div>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  moreTitle?: string;
  moreContent?: React.ReactNode;
}

const GridItem = ({ area, icon, title, description, moreTitle, moreContent }: GridItemProps) => {
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Close on ESC and lock body scroll while open
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-purple-200 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-purple-200 bg-white p-6 shadow-sm ring-1 ring-purple-100 md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-purple-200 bg-purple-50 p-2 text-purple-600">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-purple-600">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-purple-500 line-clamp-2">
                {description}
              </h2>
              {moreContent && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                >
                  Learn more
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Centered Dialog */}
      {moreContent && (
        <div
          className={cn(
            "pointer-events-none fixed inset-0 z-[60] flex items-center justify-center p-4",
            open ? "" : "invisible"
          )}
          aria-hidden={!open}
        >
          {/* Backdrop */}
          <div
            className={cn(
              "absolute inset-0 bg-black/60 transition-opacity",
              open ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            className={cn(
              "pointer-events-auto relative w-full max-w-3xl transform rounded-2xl border border-purple-300 bg-white shadow-2xl transition duration-200",
              open ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-purple-100 p-5 sm:p-6">
              <h4 className="text-xl sm:text-2xl font-semibold text-purple-700">{moreTitle ?? title}</h4>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-1 rounded-md p-1 text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6">
              <div className="prose prose-sm max-w-none text-purple-700">
                {/* Full teaser description */}
                <p>{description}</p>
                {/* Extended details */}
                {moreContent}
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export type { ServicesProps }