import { PageHeader } from "@/components/ui-custom/PageHeader";
import { WeeklyFamilyReport } from "@/components/reports/WeeklyFamilyReport";
import { DEMO_WEEKLY_REPORT } from "@/lib/demo-data";

export default function ReportsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Weekly Reports"
        subtitle="Family-wide summaries of work, character growth, and progress"
      />
      <WeeklyFamilyReport report={DEMO_WEEKLY_REPORT} />
    </div>
  );
}
