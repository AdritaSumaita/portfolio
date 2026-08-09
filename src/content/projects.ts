import type { Project } from "@/types/content";

/**
 * Three Power BI projects, each built end to end: synthetic data from a seeded
 * generator, a star-schema model, documented measures, and a report whose every
 * published figure is reconciled against the source CSVs before it ships.
 *
 * Every number on this page is one of those reconciled figures. None is
 * rounded from a screenshot or quoted from memory.
 */

// The three project folders sit at the root of the development branch in that
// repository — there is no `powerbi/` segment in the published layout.
const REPO = "https://github.com/AdritaSumaita/Power_BI_projects/tree/development";

export const projects: Project[] = [
  {
    slug: "resource-planning",
    order: 1,
    title: "Consultancy Utilisation & Bench Cost",
    subtitle: "Turning a Master's thesis into a working decision tool",
    domain: "Professional Services · Workforce Analytics",
    status: "complete",
    decision:
      "Which practice is leaking capacity, and what is it costing us?",
    summary:
      "My Master's thesis researched how to plan resources when knowledge workers split their time between office, home and client site. The research produced a model but no instrument. This is the instrument.",
    centreOfGravity:
      "A target held per person rather than averaged in DAX, a conformed dimension spanning two fact tables, and a ratio converted into money",
    tools: ["Power BI", "DAX", "Power Query", "Python (data generation)"],
    metrics: [
      { label: "Gap to target", value: "−8.8 pp" },
      { label: "Revenue at risk", value: "€2.28M" },
      { label: "Measures", value: "14" },
      { label: "Report pages", value: "2" },
    ],
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Every consultancy runs on utilisation, and most report it as a single company-wide percentage. The firm here sits at 62.7% against a 71.5% target. That reads like uniform mediocrity, and it is not: three practices are within five points of their targets and one is twenty-four points below.",
          "The second failure is subtler. One target applied to everyone is the wrong test. A principal carrying 55% billable is performing exactly as intended — their week is meant to include selling, mentoring and account work. A junior at 55% is a serious problem. Measured against a blanket number, the principal gets flagged and the junior does not, and both conclusions are wrong. The practice leads had stopped trusting the metric entirely.",
        ],
      },
      {
        heading: "Holding the target in the data, not the DAX",
        body: [
          "Each person's target lives as a column on their capacity row, and `Target Utilisation %` divides two pre-computed sums rather than averaging a target column. That distinction is the analytical core of the model.",
          "Averaging targets weights every person equally regardless of how many hours they were available, so a practice of eight managers and two juniors would benchmark near 40%. Weighted by capacity it lands somewhere else entirely — and the two answers diverge most exactly when the role mix differs between practices, which is when the comparison actually matters.",
        ],
      },
      {
        heading: "Pricing the gap",
        body: [
          "A director hears 'we are 8.8 points below target' and nods. They hear 'that is €2.28 million' and act. Same fact, different unit, and only the second one gets a decision made.",
          "`Hours Below Target` uses `MAX(…, 0)` so a practice running over target cannot contribute a negative and quietly offset one running under. Without it, a firm with one practice ten points up and another ten down reports zero risk — the opposite of true, since the shortfall is real and the surplus cannot be transferred.",
        ],
        bullets: [
          "Design — 48.2% against a 72.1% target, −23.9 pp, €1,851,313 at risk",
          "Data — 65.3% against 69.9%, −4.6 pp, €284,754",
          "Advisory — 72.0% against 76.4%, −4.4 pp, €177,627",
          "Delivery — 69.0% against 69.9%, −0.9 pp, €69,278",
        ],
      },
      {
        heading: "Two traps documented rather than hidden",
        body: [
          "`Revenue at Risk` is not additive. The four practice rows sum to €2,382,972 against a firm card of €2,280,493, because each practice values its own gap at its own realised rate while the card uses the firm blend of €119.06. Forcing them to agree would mean valuing every idle hour at the average, which erases the finding that the idle capacity sits in the most expensive practice. The rows stay at practice rates and the behaviour is written into the KPI catalogue.",
          "Utilisation also cannot be sliced by work location. Capacity has no location — it is not worked anywhere, it simply exists — so slicing filters the numerator and leaves the denominator at the firm total. The chart looked entirely plausible and was wrong. It was replaced with `Billable Share %`, which takes both halves from the timesheet. A measure is only valid on dimensions that can reach every table it touches.",
        ],
      },
    ],
    findings: [
      "Design is 28% of the firm and 77% of the shortfall — 14,763 of 19,155 unbilled hours — and bills at the highest effective rate in the firm, €125.40 against a blend of €119.06. Its idle capacity is the expensive kind.",
      "Ranking roles on raw utilisation inverts the truth. Manager reads worst at 25.9% but is second best against its own 30% target; Senior looks unremarkable at 59.5% and is the worst in the firm at −12.5 pp, in the largest role group there is.",
      "There is no senior problem — ten of the firm's twenty-two seniors sit in Design at −23.9 pp, while seniors everywhere else are within five points of target. The same intervention answers both views.",
      "Client-site weeks bill at 77.2% against 62.3% at home, but office and home sit within 1.3 points. The split that matters is client-facing versus not, and it is an association rather than a demonstrated cause.",
    ],
    repoUrl: `${REPO}/01-utilisation`,
  },
  {
    slug: "smart-factory",
    order: 2,
    title: "Smart Textile Factory — OEE & Downtime",
    subtitle: "Separating an equipment problem from a process one",
    domain: "Manufacturing · IoT · ERP",
    status: "complete",
    decision:
      "Which machine and shift should the next improvement week target — and is the problem the equipment or the way it is being run?",
    summary:
      "A Finnish textile mill running twelve machines across three lines and three shifts, reporting OEE as a single monthly number that fuses three different losses with three different owners.",
    centreOfGravity:
      "Decomposing a composite multiplicative KPI into its three components, and using a contrast between lines to distinguish equipment failure from process failure",
    tools: ["Power BI", "DAX", "Power Query", "Python (data generation)"],
    metrics: [
      { label: "Plant OEE", value: "71.0%" },
      { label: "Machines", value: "12" },
      { label: "Downtime rows", value: "53,634" },
      { label: "Report pages", value: "2" },
    ],
    caseStudy: [
      {
        heading: "Why one number is the problem",
        body: [
          "OEE is Availability × Performance × Quality. Reported as a product, it tells a supervisor something is wrong but never what — and each component has a different owner. Availability belongs to maintenance, performance to production, quality to QA. Fused together, nobody is accountable for any of them.",
          "Decomposed, the plant's 71.0% resolves immediately: availability 84.2%, performance 85.7%, quality 98.4%. Quality is not the problem. Machines are stopping, and a card that simply names the largest of the three says so in one line.",
        ],
      },
      {
        heading: "Aiming the improvement week",
        body: [
          "Downtime was reported in total hours rather than by reason, so improvement effort got spread evenly across nine causes instead of aimed at the few that dominate. Three reasons — changeover, mechanical failure and yarn break — account for 65% of all stop time.",
          "That gives the improvement week one place to aim. The plant's downtime carries a cost of €4.34M against a world-class OEE benchmark of 85%, a fourteen-point gap.",
        ],
      },
      {
        heading: "The measure that changed the conclusion",
        body: [
          "The changeover chart originally plotted total downtime minutes, which conflates how often a changeover happened with how long each one took. On that chart every night shift looks worse, and the honest objection is that night shifts simply run more changeovers.",
          "Replacing it with an average — `CALCULATE(AVERAGE(FactDowntime[Downtime Minutes]), DimReason[Reason] = \"Changeover\")` — separates duration from frequency, and the finding survives in a form that withstands the objection. The measure carries its own filter, so the visual needs none.",
        ],
      },
    ],
    findings: [
      "WEV-03, the oldest rapier loom, has the lowest OEE in the plant at 51.3% and declines every quarter — 61.9%, 59.9%, 52.0%, 48.3%, 44.1%, 41.7%. That is an asset heading for unplanned failure, and the case for intervening before it stops entirely.",
      "Finishing changeovers take 83.3 minutes on night shift against 38.3 and 38.5 on mornings and evenings — 2.2 times as long. Spinning and Weaving show no shift difference at all.",
      "That contrast is the whole finding: same machines, same products, different result by shift means a training and handover problem, not an equipment one. Answering it with maintenance spend would fix nothing.",
    ],
    repoUrl: `${REPO}/02-smart-factory`,
  },
  {
    slug: "donor-retention",
    order: 3,
    title: "Donor Retention & Fundraising Performance",
    subtitle: "Gross income flatters whichever channel recruits the most people",
    domain: "Nonprofit fundraising",
    status: "complete",
    decision: "Where should next year's acquisition budget go?",
    summary:
      "Fundraising organisations are very good at counting income and very bad at counting what it cost to raise. Put cost beside income and the channel ranking inverts.",
    centreOfGravity:
      "Power Query cleaning where every decision is documented rather than silently applied, and a cost-side fact table that makes ROI answerable at all",
    tools: ["Power BI", "DAX", "Power Query", "Python (data generation)"],
    metrics: [
      { label: "Total income", value: "€6.46M" },
      { label: "Gifts", value: "124,742" },
      { label: "Donors", value: "12,000" },
      { label: "Channels", value: "7" },
    ],
    caseStudy: [
      {
        heading: "The inversion",
        body: [
          "Face-to-Face recruits 4,768 donors — more than any other channel — and raises €1,141,305, the largest gross income of any mass channel. On an overview page it looks like the strongest performer in the organisation, and it sits at the top of every chart in the annual report.",
          "Put cost beside it and the ranking reverses. Face-to-Face costs €178.49 per donor recruited and returns 34.1%. Direct Mail costs €119.75 and returns 120.4% — more than three times the return on a cost base a third smaller. Digital Organic recruits a quarter as many donors at €12.00 each.",
        ],
        bullets: [
          "Digital Organic — 1,212 donors, €12.00 each, 1598.0% ROI",
          "Telemarketing — 935 donors, €69.88 each, 233.1%",
          "Direct Mail — 1,451 donors, €119.75 each, 120.4%",
          "Face-to-Face — 4,768 donors, €178.49 each, 34.1%",
        ],
      },
      {
        heading: "Cleaning as a documented decision",
        body: [
          "The dataset carries deliberate imperfections so the preparation work has something to do, and each one is a recorded decision rather than a silent fix. Roughly 360 donors are missing a country and are relabelled `Unknown` rather than deleted, because deleting them would understate donor counts. Forty duplicates are removed on name plus acquisition date — name alone would merge genuinely different people. Thirty refunds recorded as negative gifts are kept and netted off, because a refund is a real reduction in income rather than bad data.",
          "One of those steps also produced the project's most useful lesson. A column filter applied to blanks silently reduced `DimDonor` from 12,040 rows to 362, and the measure that looked like it would catch it — a distinct count of donors — reads the fact table, not the dimension, and reported a healthy 12,000 throughout. A dimension has to be validated on its own row count.",
        ],
      },
      {
        heading: "The channel that is not a channel",
        body: [
          "Major Gifts is excluded from the comparison above, and saying why matters more than the exclusion. It recruits 123 donors at €1,976 each, who give an average of €30,569 — and it accounts for 58% of total income on its own.",
          "Ranking it alongside street fundraising on cost per donor would be meaningless. It is a high-touch relationship programme rather than a mass acquisition channel, and the two answer different questions. Leaving it in the table would have made every other row look better than it is.",
        ],
      },
      {
        heading: "A note on the data",
        body: [
          "All data is synthetically generated from a seeded script. Real fundraising data is GDPR-regulated personal data and does not belong in a public repository, so the generator is committed instead — which is stronger evidence anyway, since it makes the whole dataset reproducible with one command.",
        ],
      },
    ],
    findings: [
      "Face-to-Face is the most expensive channel to recruit through and returns the least per euro spent — €178.49 per donor at 34.1% ROI, against Direct Mail's €119.75 at 120.4%.",
      "Gross income flatters whichever channel recruits the most people. Cost per donor and ROI are the honest measures, and they reverse the ranking entirely.",
      "Major Gifts produces 58% of total income from 123 donors, which is why it has to be read separately rather than ranked against mass acquisition.",
    ],
    repoUrl: `${REPO}/03-donor-retention`,
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
